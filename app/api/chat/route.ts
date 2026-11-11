import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_MAP = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX = 10;

const FALLBACK_RESPONSES: Record<string, string> = {
  horario:
    "Estamos abertos de terça a sábado:\n• Terça a Sexta: 8h - 19h\n• Sábado: 9h - 20h\n• Domingo: 9h - 14h (fé num brunch!) \n• Segunda fechamos para descansar os grãos",
  endereco: "Rua das Paineiras, 77 - Batel, Curitiba - PR, 80240-080",
  telefone: "Telefone: (00) 00000-0000\nE-mail: ola@cafeaurora.com.br",
  reserva:
    "Você pode reservar mesa pelo site (página Reservas) ou ligar (00) 00000-0000. Fim de semana tem fila — reservar vale a pena.",
  menu:
    "Temos cafés especiais (espresso, V60, cold brew), brunch o dia inteiro, confeitaria artesanal e grãos para levar. Veja tudo na página Menu.",
  preco:
    "cafés entre R$ 9 e R$ 17, brunch de R$ 16 a R$ 38, confeitaria de R$ 9 a R$ 15 e grãos a partir de R$ 56.",
  wifi: "Tem wifi liberado (senha no caixa) — workspace não é. Cadeira perto tomada? Chegue de manhã cedo.",
  pet: "Sim, somos pet friendly! Temos água no balcão e um tradicional biscoito canino para o amigo de quatro patas. Venha nos conhecer.",
  vegetariano:
    "Tem várias opções vegetarianas e algumas veganas — granola da casa, tapioca, sucos e panquecas sem leite (opcional)",
  default:
    "Não entendi a pergunta, mas posso ajudar com: horários, endereço, menu, reservas, wifi ou pet friendly.",
};

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  if (/(horário|horario|abre|fecha|aberto|funcionamento|quando)/.test(lower)) return "horario";
  if (/(endereço|endereco|localização|localizacao|onde|fica|como chegar)/.test(lower)) return "endereco";
  if (/(telefone|contato|ligar|falar|whatsapp)/.test(lower)) return "telefone";
  if (/(reserv|mesa|agendar|booking)/.test(lower)) return "reserva";
  if (/(menu|cardápio|cardapio|café|cafe|comida|pratos|latte|brunch)/.test(lower)) return "menu";
  if (/(preço|preco|valor|quanto custa)/.test(lower)) return "preco";
  if (/(wifi|wi-fi|internet|trabalhar)/.test(lower)) return "wifi";
  if (/(pet|cachorro|dog|gato)/.test(lower)) return "pet";
  if (/(vegetariano|vegano|vegan|sem lactose|sem carne|leite vegetal)/.test(lower)) return "vegetariano";
  return "default";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = RATE_LIMIT_MAP.get(ip);
  if (!record || now > record.resetTime) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Muitas perguntas de uma vez. Respira e tenta de novo :)" }, { status: 429 });
    }

    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json({ error: "Mensagem inválida" }, { status: 400 });
    }

    const apiKey = process.env.CHAT_API_KEY;
    const provider = process.env.CHAT_PROVIDER || "anthropic";
    const model = process.env.CHAT_MODEL;

    if (!apiKey) {
      const intent = detectIntent(message);
      return NextResponse.json({
        response: FALLBACK_RESPONSES[intent] || FALLBACK_RESPONSES.default,
        mode: "fallback",
        suggestions: ["Ver menu", "Horários", "Reservar mesa"],
      });
    }

    const systemPrompt = `Você é o assistente virtual do Café Aurora, cafeteria de cafés especiais, brunch e confeitaria artesanal em Curitiba.

DADOS REAIS:
- Endereço: Rua das Paineiras, 77 - Batel, Curitiba - PR
- Telefone: (00) 00000-0000  E-mail: ola@cafeaurora.com.br
- Horários: Ter-Sex 8h-19h, Sáb 9h-20h, Dom 9h-14h (brunch), Seg fechado
- Menu: cafés especiais (espresso R$9, cappuccino R$13, latte art R$14, filtrado V60 R$12, cold brew R$15, mocha R$17)
- Brunch: Aurora placa R$34, panquecas R$26, torrada caprese R$22, ovos bénédict R$38, granola R$19, tapioca R$16
- Confeitaria: croissant R$12, kouign-amann R$15, bolo de cenoura R$11, torta R$14, cookie R$10, pão de mel R$9
- Bebidas: sucos R$13, chá R$10, chai R$15, quentão R$12
- Grãos 250g: R$56 — caneca artesanal R$68
- Pet friendly, wifi liberado

REGRAS:
- Responda em português do Brasil, tom amigável e leve, no máximo 3 frases
- Nunca invente itens, preços ou horários fora da lista acima
- Para reservas, direcione à página /reservas ou telefone
- Se não souber, diga com sinceridade e sugerir contato

Responda a pergunta do cliente agora.`;

    let aiResponse: string;

    try {
      if (provider === "anthropic") {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: model || "claude-3-5-sonnet-20241022",
            max_tokens: 300,
            messages: [
              ...history.slice(-6).map((msg: any) => ({ role: msg.role, content: msg.content })),
              { role: "user", content: message },
            ],
            system: systemPrompt,
          }),
          signal: AbortSignal.timeout(10000),
        });
        if (!response.ok) throw new Error(`Anthropic API error: ${response.status}`);
        const data = await response.json();
        aiResponse = data.content[0].text;
      } else if (provider === "openai") {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: model || "gpt-4-turbo-preview",
            messages: [{ role: "system", content: systemPrompt }, ...history.slice(-6), { role: "user", content: message }],
            max_tokens: 300,
            temperature: 0.7,
          }),
          signal: AbortSignal.timeout(10000),
        });
        if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`);
        const data = await response.json();
        aiResponse = data.choices[0].message.content;
      } else if (provider === "gemini") {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model || "gemini-1.5-flash"}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: systemPrompt },
                    ...history.slice(-6).flatMap((msg: any) => [{ text: msg.content }]),
                    { text: message },
                  ],
                },
              ],
              generationConfig: { maxOutputTokens: 300 },
            }),
            signal: AbortSignal.timeout(10000),
          }
        );
        if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
        const data = await response.json();
        aiResponse = data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Provider inválido");
      }

      return NextResponse.json({ response: aiResponse, mode: "ai" });
    } catch (error) {
      console.error("AI API error, falling back:", error);
      const intent = detectIntent(message);
      return NextResponse.json({
        response: FALLBACK_RESPONSES[intent] || FALLBACK_RESPONSES.default,
        mode: "fallback",
        suggestions: ["Ver menu", "Horários", "Reservar mesa"],
      });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Erro ao processar mensagem" }, { status: 500 });
  }
}
