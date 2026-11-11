"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ReservationPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  const occasions = ["Brunch casual", "Aniversário", "Encontro com amigos", "Café com as amigas", "Almoço de negócios", "Trabalhar com laptop", "Outro"];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Diga como te chamamos";
    if (!formData.email.trim()) {
      newErrors.email = "Precisamos do e-mail para confirmar";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Faltou o telefone";
    }
    if (!formData.date) newErrors.date = "Escolha o dia";
    if (!formData.time) newErrors.time = "Escolha a hora";

    if (formData.date) {
      const selectedDate = new Date(formData.date + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Não dá pra reservar no passado (ainda)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "reservation_submitted", {
          guests: formData.guests,
          occasion: formData.occasion,
        });
      }
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-xl sm:p-12"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage/15">
              <svg className="h-10 w-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-display text-3xl font-semibold text-espresso sm:text-4xl">
              Mesa reservada, {formData.name.split(" ")[0]}!
            </h1>
            <p className="mt-4 text-lg text-espresso/70">
              {formData.guests} {formData.guests === "1" ? "pessoa" : "pessoas"} em{" "}
              {new Date(formData.date + "T00:00:00").toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}{" "}
              às <strong>{formData.time}</strong>. O pão estará saindo por volta dessa hora.
            </p>
            <div className="mt-8 rounded-3xl bg-alva p-6 text-left">
              <h2 className="mb-3 font-bold text-espresso">Resumo</h2>
              <dl className="space-y-2 text-sm text-espresso/70">
                <div className="flex justify-between">
                  <dt>Nome:</dt>
                  <dd className="font-bold text-espresso">{formData.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>E-mail:</dt>
                  <dd className="font-bold text-espresso">{formData.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Telefone:</dt>
                  <dd className="font-bold text-espresso">{formData.phone}</dd>
                </div>
                {formData.occasion && (
                  <div className="flex justify-between">
                    <dt>Ocasião:</dt>
                    <dd className="font-bold text-espresso">{formData.occasion}</dd>
                  </div>
                )}
                {formData.notes && (
                  <div className="border-t border-espresso/10 pt-2">
                    <dt className="mb-1">Observações:</dt>
                    <dd className="font-bold text-espresso">{formData.notes}</dd>
                  </div>
                )}
              </dl>
            </div>
            <p className="mt-6 text-sm text-espresso/60">
              Enviamos a confirmação para <strong>{formData.email}</strong> (simulado).
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-caramel px-6 py-3 text-base font-bold text-alva transition-smooth hover:bg-caramel/90"
              >
                Voltar ao início
              </a>
              <a
                href="/menu"
                className="inline-flex items-center justify-center rounded-full border-2 border-espresso px-6 py-3 text-base font-bold text-espresso transition-smooth hover:bg-espresso hover:text-alva"
              >
                Escolher do menu
              </a>
            </div>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <Breadcrumbs items={[{ name: "Reservas" }]} />
            </div>
            <h1 className="font-display text-4xl font-semibold text-espresso sm:text-5xl">
              Reserve a mesa do amanhecer
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-espresso/70">
              Fim de semana costuma lotar. O resto, a gente cuida.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-white p-6 shadow-xl sm:p-10"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="mb-2 block text-sm font-bold text-espresso">
                  Seu nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-full border px-4 py-3 transition-smooth focus:outline-none focus:ring-2 focus:ring-caramel ${
                    errors.name ? "border-red-400" : "border-espresso/15"
                  }`}
                  placeholder="Como te chamamos?"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold text-espresso">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-full border px-4 py-3 transition-smooth focus:outline-none focus:ring-2 focus:ring-caramel ${
                    errors.email ? "border-red-400" : "border-espresso/15"
                  }`}
                  placeholder="voce@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-bold text-espresso">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full rounded-full border px-4 py-3 transition-smooth focus:outline-none focus:ring-2 focus:ring-caramel ${
                    errors.phone ? "border-red-400" : "border-espresso/15"
                  }`}
                  placeholder="(00) 00000-0000"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="date" className="mb-2 block text-sm font-bold text-espresso">
                  Data *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={minDate}
                  className={`w-full rounded-full border px-4 py-3 transition-smooth focus:outline-none focus:ring-2 focus:ring-caramel ${
                    errors.date ? "border-red-400" : "border-espresso/15"
                  }`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="time" className="mb-2 block text-sm font-bold text-espresso">
                  Horário *
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full rounded-full border bg-white px-4 py-3 transition-smooth focus:outline-none focus:ring-2 focus:ring-caramel ${
                    errors.time ? "border-red-400" : "border-espresso/15"
                  }`}
                >
                  <option value="">Escolha o horário</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
              </div>

              <div>
                <label htmlFor="guests" className="mb-2 block text-sm font-bold text-espresso">
                  Pessoas *
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full rounded-full border border-espresso/15 bg-white px-4 py-3 transition-smooth focus:outline-none focus:ring-2 focus:ring-caramel"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "pessoa" : "pessoas"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="occasion" className="mb-2 block text-sm font-bold text-espresso">
                  Ocasião
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full rounded-full border border-espresso/15 bg-white px-4 py-3 transition-smooth focus:outline-none focus:ring-2 focus:ring-caramel"
                >
                  <option value="">(opcional)</option>
                  {occasions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className="mb-2 block text-sm font-bold text-espresso">
                  Observações
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none rounded-3xl border border-espresso/15 px-4 py-3 transition-smooth focus:outline-none focus:ring-2 focus:ring-caramel"
                  placeholder="Alergias, cadeirinha, aniversário com vela no bolo..."
                />
              </div>
            </div>

            <div className="mt-8 border-t border-espresso/10 pt-6">
              <p className="mb-6 text-sm text-espresso/60">
                * obrigatórios. Grupos com mais de 12 pessoas? Ligue (00) 00000-0000 que arrumamos a mesa comprida.
              </p>
              <button
                type="submit"
                className="w-full rounded-full bg-caramel px-8 py-4 text-base font-bold text-alva shadow-lg transition-smooth hover:bg-caramel/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel sm:w-auto"
              >
                Confirmar reserva
              </button>
            </div>
          </motion.form>

          <div className="mt-10 text-center text-sm text-espresso/60">
            Paciência zero pra fila? Ligar{" "}
            <a href="tel:+5500000000000" className="font-bold text-caramel hover:underline">
              (00) 00000-0000
            </a>{" "}
            ou{" "}
            <a href="mailto:ola@cafeaurora.com.br" className="font-bold text-caramel hover:underline">
              ola@cafeaurora.com.br
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
