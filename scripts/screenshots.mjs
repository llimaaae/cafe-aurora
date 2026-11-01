import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = "http://localhost:3001";
mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch();
const results = [];

async function shot(page, name) {
  await page.waitForTimeout(800);
  await page.screenshot({ path: `screenshots/${name}.png` });
  results.push(`OK ${name}`);
}

// ---------- DESKTOP 1280 ----------
const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await desktop.newPage();

await page.goto(BASE, { waitUntil: "networkidle" });
await shot(page, "desktop-home-1280");

// Busca global
await page.getByRole("button", { name: "Buscar no site" }).click();
await page.getByLabel("Termo de busca").fill("brunch");
await shot(page, "desktop-busca-brunch-1280");
await page.keyboard.press("Escape");

// Menu: busca + filtro
await page.goto(`${BASE}/menu`, { waitUntil: "networkidle" });
await page.getByLabel("Buscar no menu").fill("croissant");
await page.waitForTimeout(500);
await shot(page, "desktop-menu-busca-1280");
await page.getByLabel("Buscar no menu").fill("");
await page.getByRole("button", { name: "Brunch" }).click();
await page.waitForTimeout(500);
await shot(page, "desktop-menu-filtro-brunch-1280");

// Reserva: preencher e enviar
await page.goto(`${BASE}/reservas`, { waitUntil: "networkidle" });
await page.getByLabel("Seu nome *").fill("Ana Beatriz Costa");
await page.getByLabel("E-mail *").fill("ana@example.com");
await page.getByLabel("Telefone *").fill("(41) 98888-1234");
await page.getByLabel("Data *").fill("2026-11-15");
await page.getByLabel("Horário *").selectOption("10:00");
await page.getByLabel("Pessoas *").selectOption("3");
await page.getByLabel("Ocasião").selectOption("Brunch casual");
await page.getByLabel("Observações").fill("Uma mesa perto da janela, por favor.");
await shot(page, "desktop-reserva-preenchida-1280");
await page.getByRole("button", { name: "Confirmar reserva" }).click();
await page.waitForTimeout(1000);
await shot(page, "desktop-reserva-confirmada-1280");

// Chatbot fallback
await page.goto(BASE, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Abrir chat" }).click();
await page.getByLabel("Campo de mensagem").fill("Vocês são pet friendly?");
await page.getByRole("button", { name: "Enviar mensagem" }).click();
await page.waitForTimeout(2500);
await shot(page, "desktop-chatbot-fallback-1280");

// 404
await page.goto(`${BASE}/pagina-inexistente`, { waitUntil: "networkidle" });
await shot(page, "desktop-404-1280");

await desktop.close();

// ---------- MOBILE 360 ----------
const mobile = await browser.newContext({ viewport: { width: 360, height: 800 } });
const mpage = await mobile.newPage();

await mpage.goto(BASE, { waitUntil: "networkidle" });
await shot(mpage, "mobile-home-360");

// Menu hambúrguer
await mpage.getByRole("button", { name: "Menu principal" }).click();
await shot(mpage, "mobile-menu-aberto-360");

await mpage.goto(`${BASE}/menu`, { waitUntil: "networkidle" });
await shot(mpage, "mobile-menu-360");

await mpage.goto(`${BASE}/reservas`, { waitUntil: "networkidle" });
await shot(mpage, "mobile-reservas-360");

await mobile.close();
await browser.close();

console.log(results.join("\n"));
