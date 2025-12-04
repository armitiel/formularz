'use client';

import { useState } from 'react';

interface FormData {
  yourName: string;
  companyName: string;
  contactEmail: string;
  roleTitle: string;
  activities: string[];
  diasenTime: string;
  presenceForm: string;
  monthlyMin: string;
  monthlyMax: string;
  refundMechanism: string;
  refundType: string;
  metrics: string;
  goals: string;
  markets: string[];
  extraNotes: string;
}

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    yourName: '',
    companyName: 'Diasen',
    contactEmail: '',
    roleTitle: '',
    activities: ['realizacje_wlasne', 'promocja_diasen'],
    diasenTime: '40',
    presenceForm: '',
    monthlyMin: '',
    monthlyMax: '',
    refundMechanism: 'tak',
    refundType: 'dodatkowa_praca',
    metrics: '',
    goals: '',
    markets: ['Polska'],
    extraNotes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked 
        ? [...prev[name as keyof FormData] as string[], value]
        : (prev[name as keyof FormData] as string[]).filter(item => item !== value)
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const downloadFile = (text: string, filename = 'propozycja-wspolpracy-diasen.txt') => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      const summary = data.summary || 'Brak odpowiedzi z backendu.';

      setResponse(summary);
      setShowResponse(true);
      downloadFile(summary);
    } catch (err) {
      setResponse('Wystąpił błąd połączenia z backendem.');
      setShowResponse(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    showForm ? (
      // Form Page with tlo background
      <div
        className="min-h-screen bg-customStone/25 text-zinc-100 overflow-hidden"
        style={{
          backgroundImage: 'url(/tlo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-14 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => setShowForm(false)}
          className="mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-zinc-100 rounded-lg hover:bg-white/30 transition-colors"
        >
          ← Back to Introduction
        </button>

        {/* Form Header */}
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs text-zinc-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Interaktywny generator propozycji współpracy
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">
            Program współpracy – kreatywno-strategiczny partner <span className="text-brandAccent">Diasen</span>
          </h1>
          <p className="mt-2 text-sm md:text-[15px] text-zinc-200 max-w-2xl">
            Wypełnij kilka sekcji, a system automatycznie wygeneruje gotowy tekst oferty
            oraz pobierze plik <span className="font-semibold">.txt</span>, który możesz od razu
            dołączyć do maila lub prezentacji – bez ręcznego kopiowania.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="rounded-3xl bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl shadow-black/40">
          <div className="border-b border-white/20 px-5 md:px-8 py-4 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-300">Konfiguracja oferty</p>
              <p className="text-sm text-zinc-200 mt-1">
                Sekcje formularza odpowiadają elementom planu współpracy z Diasen.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-customStone to-zinc-400 border border-black flex items-center justify-center text-[10px] font-semibold">
                  D
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border border-black flex items-center justify-center text-[10px] font-semibold text-black">
                  A
                </div>
              </div>
              <span>Ty + Diasen / wspólna wizja</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-5 md:px-8 py-6 md:py-8 space-y-8 text-sm md:text-[15px]">
            {/* SEKCJA 1 – Podstawowe informacje */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-zinc-100">1. Podstawowe informacje</h2>
                  <p className="text-xs text-zinc-300 mt-1">
                    Dane, które pojawią się w nagłówku propozycji współpracy.
                  </p>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-black/30 text-zinc-200 border border-white/20">
                  krok 1/4
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="yourName" className="block text-xs font-semibold text-zinc-200">
                    Twoje imię / marka
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="text"
                    id="yourName"
                    name="yourName"
                    value={formData.yourName}
                    onChange={handleInputChange}
                    placeholder="np. Amitiel Angelisme / Raster"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="companyName" className="block text-xs font-semibold text-zinc-200">
                    Firma / klient
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contactEmail" className="block text-xs font-semibold text-zinc-200">
                    E-mail kontaktowy
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="np. kontakt@twojadomena.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="roleTitle" className="block text-xs font-semibold text-zinc-200">
                    Nazwa roli (opcjonalnie)
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="text"
                    id="roleTitle"
                    name="roleTitle"
                    value={formData.roleTitle}
                    onChange={handleInputChange}
                    placeholder="np. Strategic Creative Partner"
                  />
                </div>
              </div>
            </section>

            {/* SEKCJA 2 – Model „dwóch nóg" */}
            <section className="space-y-4 border-t border-slate-800 pt-6">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-zinc-100">2. Model pracy – dwie nogi</h2>
                  <p className="text-xs text-zinc-300 mt-1">
                    Jak dzielisz się między własne realizacje a działania dla Diasen.
                  </p>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-black/30 text-zinc-200 border border-white/20">
                  krok 2/4
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-zinc-200">Twoja główna aktywność</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'realizacje_wlasne', label: 'własne realizacje / projekty' },
                    { value: 'promocja_diasen', label: 'promocja i rozwój marki Diasen' },
                    { value: 'murale', label: 'murale / projekty fizyczne' },
                    { value: 'strategia', label: 'strategia & doradztwo' }
                  ].map((activity) => (
                    <label key={activity.value} className="inline-flex items-center gap-2 text-xs text-zinc-200 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 cursor-pointer">
                      <input
                        type="checkbox"
                        name="activities"
                        value={activity.value}
                        checked={formData.activities.includes(activity.value)}
                        onChange={handleCheckboxChange}
                        className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{activity.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="diasenTime" className="block text-xs font-semibold text-zinc-200">
                  Szacunkowy udział czasu dedykowany Diasen
                </label>
                <div className="flex items-center gap-3">
                  <input
                    className="w-full accent-amber-400"
                    type="range"
                    id="diasenTime"
                    name="diasenTime"
                    min="10"
                    max="100"
                    step="5"
                    value={formData.diasenTime}
                    onChange={handleInputChange}
                  />
                  <span className="text-xs font-semibold text-amber-300 w-10 text-right">
                    {formData.diasenTime}%
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="presenceForm" className="block text-xs font-semibold text-zinc-200">
                  W jakiej formie możesz być „na ich podwórku"? (krótki opis)
                </label>
                <textarea
                  id="presenceForm"
                  name="presenceForm"
                  value={formData.presenceForm}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80 min-h-[80px]"
                  placeholder="np. hybrydowo: praca zdalna + okresowe wyjazdy do Polski na kluczowe realizacje, sesje materiałowe i spotkania z zespołem."
                />
              </div>
            </section>

            {/* SEKCJA 3 – Finanse & bezpieczeństwo */}
            <section className="space-y-4 border-t border-white/20 pt-6">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-zinc-100">3. Model finansowy i bezpieczeństwo</h2>
                  <p className="text-xs text-zinc-300 mt-1">
                    Jak wyglądają widełki, rozliczenie i „bezpieczna" konstrukcja dla Diasen.
                  </p>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-black/30 text-zinc-200 border border-white/20">
                  krok 3/4
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="monthlyMin" className="block text-xs font-semibold text-zinc-200">
                    Szacowany budżet miesięczny – minimum (€)
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="number"
                    id="monthlyMin"
                    name="monthlyMin"
                    value={formData.monthlyMin}
                    onChange={handleInputChange}
                    placeholder="np. 5000"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="monthlyMax" className="block text-xs font-semibold text-zinc-200">
                    Szacowany budżet miesięczny – maksimum (€)
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="number"
                    id="monthlyMax"
                    name="monthlyMax"
                    value={formData.monthlyMax}
                    onChange={handleInputChange}
                    placeholder="np. 8000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-zinc-200">
                  Czy chcesz zaproponować mechanizm bezpieczeństwa / zwrotu?
                </p>
                <div className="flex flex-wrap gap-3">
                  <label className="inline-flex items-center gap-2 text-xs text-zinc-200">
                    <input
                      type="radio"
                      name="refundMechanism"
                      value="tak"
                      checked={formData.refundMechanism === 'tak'}
                      onChange={handleRadioChange}
                      className="border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                    />
                    <span>Tak – chcę to podkreślić</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs text-zinc-300">
                    <input
                      type="radio"
                      name="refundMechanism"
                      value="nie"
                      checked={formData.refundMechanism === 'nie'}
                      onChange={handleRadioChange}
                      className="border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                    />
                    <span>Nie – standardowe rozliczenie etapami</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="refundType" className="block text-xs font-semibold text-zinc-200">
                  Forma „bezpieczeństwa" dla klienta
                </label>
                <select
                  id="refundType"
                  name="refundType"
                  value={formData.refundType}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                >
                  <option value="dodatkowa_praca">
                    Dodatkowa praca / poprawki bez dodatkowych kosztów
                  </option>
                  <option value="czesciowy_zwrot">
                    Częściowy zwrot vs ustalone KPI / przesunięcie budżetu
                  </option>
                  <option value="kamienie_milowe">
                    Rozliczanie kamieniami milowymi (płatność po akceptacji)
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="metrics" className="block text-xs font-semibold text-zinc-200">
                  Jakie wskaźniki chcesz zaproponować jako mierniki efektu?
                </label>
                <textarea
                  id="metrics"
                  name="metrics"
                  value={formData.metrics}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80 min-h-[80px]"
                  placeholder="np. ilość zapytań od architektów, zaangażowanie w social media, liczba referencyjnych realizacji z użyciem Diasen, liczba publikacji PR itp."
                />
              </div>
            </section>

            {/* SEKCJA 4 – Cele i kontekst */}
            <section className="space-y-4 border-t border-white/20 pt-6">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-zinc-100">4. Cele współpracy i kontekst</h2>
                  <p className="text-xs text-zinc-300 mt-1">
                    Co chcesz im komunikować jako sens całego modelu.
                  </p>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-black/30 text-zinc-200 border border-white/20">
                  krok 4/4
                </span>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="goals" className="block text-xs font-semibold text-zinc-200">
                  Główne cele twojej współpracy z Diasen
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80 min-h-[90px]"
                  placeholder="np. podniesienie postrzegania marki Diasen wśród architektów jako partnera premium, stworzenie biblioteki materiałów editorial, zbudowanie narracji łączącej technologię, zdrowy mikroklimat i design."
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-zinc-200">Główne rynki / obszary działania</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'Polska', label: 'Polska' },
                    { value: 'Europa', label: 'Europa' },
                    { value: 'Bliski Wschód', label: 'Bliski Wschód' },
                    { value: 'Inne', label: 'Inne (do doprecyzowania)' }
                  ].map((market) => (
                    <label key={market.value} className="inline-flex items-center gap-2 text-xs text-zinc-200 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 cursor-pointer">
                      <input
                        type="checkbox"
                        name="markets"
                        value={market.value}
                        checked={formData.markets.includes(market.value)}
                        onChange={handleCheckboxChange}
                        className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{market.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="extraNotes" className="block text-xs font-semibold text-zinc-200">
                  Dodatkowe uwagi / kontekst
                </label>
                <textarea
                  id="extraNotes"
                  name="extraNotes"
                  value={formData.extraNotes}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80 min-h-[70px]"
                  placeholder="np. odniesienie do prezentacji, którą już widzieli; pomysł na pilotażową kampanię lub mural referencyjny; sposób włączenia twoich dotychczasowych realizacji."
                />
              </div>
            </section>

            {/* Actions */}
            <div className="border-t border-white/20 pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-[11px] text-zinc-300 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/30 border border-white/20 text-[10px] text-zinc-200">
                  i
                </span>
                <span>
                  Po kliknięciu wygeneruję tekst oferty, pokażę podgląd i automatycznie pobiorę plik <span className="text-zinc-100 font-medium">.txt</span>.
                </span>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 px-5 py-2.5 text-xs md:text-sm font-semibold text-black shadow-lg shadow-amber-500/40 hover:shadow-amber-500/60 hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 focus:ring-offset-transparent disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <span className="mr-1.5">
                  {isLoading ? 'Generuję podsumowanie...' : 'Wygeneruj podsumowanie oferty'}
                </span>
                <span className="text-lg leading-none">↗</span>
              </button>
            </div>
          </form>

          {/* Response box */}
          {showResponse && (
            <div className="border-t border-white/20 px-5 md:px-8 py-4 md:py-5">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-300 mb-2">Podgląd wygenerowanego tekstu</p>
              <div className="rounded-2xl bg-black/60 backdrop-blur-sm border border-white/20 px-4 py-3 max-h-[320px] overflow-auto text-xs md:text-[13px] leading-relaxed text-zinc-100 whitespace-pre-wrap font-mono">
                {response}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    ) : (
      // Intro Page with living5 background
      <div
        className="min-h-screen bg-customStone/25 overflow-hidden"
        style={{
          backgroundImage: 'url(/living5.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="w-full max-w-[1920px] h-screen relative mx-auto">
          {/* Main Content */}
          <div className="absolute left-[254px] top-[136px] w-[620px] inline-flex flex-col justify-start items-start gap-8">
            <div className="self-stretch justify-start">
              <span className="text-zinc-100 text-4xl font-bold font-['Arial'] leading-[48px]">Proposal: </span>
              <span className="text-zinc-100 text-4xl font-normal font-['Arial'] leading-[48px]">Creative Ambassador & Brand Storytelling Partner for Diasen</span>
            </div>
            <div className="self-stretch justify-start text-zinc-100 text-lg font-normal font-['Inter'] leading-7">
              As a creative ambassador for Diasen, my role focuses on visual elevation, brand storytelling, and artistic application.<br/>
              The goal: to add prestige, visibility, and narrative depth to Diasen's presence in design-forward contexts, from architecture to art,
              from social media to real-life installations.
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="mt-8 px-8 py-4 bg-brandAccent text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
            >
              Start Collaboration Form
            </button>
          </div>

          {/* Right Column Content */}
          <div className="absolute left-[1008px] top-[191px] justify-start">
            <span className="text-zinc-100 text-3xl font-normal font-['Inter'] leading-10">Key Pillars of the Collaboration<br/></span>
            <span className="text-zinc-100 text-lg font-extrabold font-['Inter'] leading-7">1. Creative Agency Role<br/></span>
            <span className="text-zinc-100 text-lg font-normal font-['Inter'] leading-7">I act as a creative agency and visual strategist, bringing:<br/></span>
            <span className="text-zinc-100 text-lg font-normal font-['Inter'] leading-7">Unique art direction and campaign concepts<br/>Tailored content for use in digital and print promotions<br/>Immersive stories that highlight both aesthetic and material value<br/></span>
            <span className="text-zinc-100 text-lg font-normal font-['Inter'] leading-7">This includes:<br/></span>
            <span className="text-zinc-100 text-lg font-normal font-['Inter'] leading-7">Designing visual worlds around Diasen products<br/>Providing content for advertising, PR, and social media<br/>Connecting materials to architectural and emotional narratives</span>
          </div>

          <div className="w-[599px] absolute left-[1008px] top-[598px] justify-start">
            <span className="text-zinc-100 text-lg font-extrabold font-['Inter'] leading-7">2. Artistic Integration & Applications</span>
            <span className="text-zinc-100 text-lg font-normal font-['Inter'] leading-7"><br/>I propose to integrate products like Decork Mediterraneo into:<br/></span>
            <span className="text-zinc-100 text-lg font-normal font-['Inter'] leading-7">Signature facades for villas and public spaces<br/>Artistic wall compositions for high-end interiors<br/></span>
            <span className="text-zinc-100 text-lg font-normal font-['Inter'] leading-7">This approach turns buildings into living canvases, where Diasen's material technology meets storytelling-driven design.</span>
          </div>
        </div>
      </div>
    )
  );
}