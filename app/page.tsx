'use client';

import { useState } from 'react';

interface FormData {
  // Section 1: Company Data
  companyName: string;
  contactPerson: string;
  contactRole: string;
  contactEmail: string;
  
  // Section 2: Modules of collaboration
  modules: string[];
  
  // Section 3: Goals
  goals: string[];
  goalsDetails: string;
  
  // Section 4: Intensity & Budget
  intensity: number;
  budgetMin: string;
  budgetMax: string;
  
  // Section 5: Markets
  markets: string[];
  marketsDetails: string;
  
  // Section 6: Language & Email
  languageMode: string;
  sendEmail: boolean;
  emailToSend: string;
}

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState<FormData>({
    // Section 1: Company Data
    companyName: '',
    contactPerson: '',
    contactRole: '',
    contactEmail: '',
    
    // Section 2: Modules
    modules: [],
    
    // Section 3: Goals
    goals: [],
    goalsDetails: '',
    
    // Section 4: Intensity & Budget
    intensity: 50,
    budgetMin: '',
    budgetMax: '',
    
    // Section 5: Markets
    markets: ['Polska'],
    marketsDetails: '',
    
    // Section 6: Language & Email
    languageMode: 'pl',
    sendEmail: false,
    emailToSend: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      if (name === 'sendEmail') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === 'range' || name === 'intensity') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
                  <label htmlFor="contactPerson" className="block text-xs font-semibold text-zinc-200">
                    Osoba kontaktowa
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="np. Jan Kowalski"
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
                  <label htmlFor="contactRole" className="block text-xs font-semibold text-zinc-200">
                    Rola / stanowisko (opcjonalnie)
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="text"
                    id="contactRole"
                    name="contactRole"
                    value={formData.contactRole}
                    onChange={handleInputChange}
                    placeholder="np. Kierownik Marketingu"
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
                        name="modules"
                        value={activity.value}
                        checked={formData.modules.includes(activity.value)}
                        onChange={handleCheckboxChange}
                        className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{activity.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="intensity" className="block text-xs font-semibold text-zinc-200">
                  Intensywność współpracy
                </label>
                <div className="flex items-center gap-3">
                  <input
                    className="w-full accent-amber-400"
                    type="range"
                    id="intensity"
                    name="intensity"
                    min="0"
                    max="100"
                    step="10"
                    value={formData.intensity}
                    onChange={handleInputChange}
                  />
                  <span className="text-xs font-semibold text-amber-300 w-10 text-right">
                    {formData.intensity}%
                  </span>
                </div>
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
                  <label htmlFor="budgetMin" className="block text-xs font-semibold text-zinc-200">
                    Minimalny budżet miesięczny (€)
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="number"
                    id="budgetMin"
                    name="budgetMin"
                    value={formData.budgetMin}
                    onChange={handleInputChange}
                    placeholder="np. 5000"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="budgetMax" className="block text-xs font-semibold text-zinc-200">
                    Maksymalny budżet miesięczny (€)
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="number"
                    id="budgetMax"
                    name="budgetMax"
                    value={formData.budgetMax}
                    onChange={handleInputChange}
                    placeholder="np. 8000"
                  />
                </div>
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
                <label htmlFor="goalsDetails" className="block text-xs font-semibold text-zinc-200">
                  Główne cele współpracy (szczegóły)
                </label>
                <textarea
                  id="goalsDetails"
                  name="goalsDetails"
                  value={formData.goalsDetails}
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
                <label htmlFor="marketsDetails" className="block text-xs font-semibold text-zinc-200">
                  Dodatkowe uwagi o rynkach
                </label>
                <textarea
                  id="marketsDetails"
                  name="marketsDetails"
                  value={formData.marketsDetails}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80 min-h-[70px]"
                  placeholder="np. skupienie na segmencie premium, luksusowe projekty mieszkaniowe"
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
        className="min-h-screen overflow-hidden"
        style={{
          backgroundImage: 'url(/living5.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="w-full max-w-[1920px] h-screen relative mx-auto">
          {/* Main Content - Left Column Only */}
          <div className="absolute left-[254px] top-[136px] w-[620px] inline-flex flex-col justify-start items-start gap-8">
            <div className="self-stretch justify-start">
              <span className="text-black text-4xl font-bold font-['Arial'] leading-[48px]">
                {language === 'pl' ? 'Propozycja: ' : 'Proposal: '}
              </span>
              <span className="text-black text-4xl font-normal font-['Arial'] leading-[48px]">
                {language === 'pl'
                  ? 'Ambasador Kreatywny i Partner ds. Storytelling Marki dla Diasen'
                  : 'Creative Ambassador & Brand Storytelling Partner for Diasen'}
              </span>
            </div>
            <div className="self-stretch justify-start text-gray-800 text-lg font-normal font-['Inter'] leading-7">
              {language === 'pl'
                ? 'Jako ambasador kreatywny Diasen, moja rola skupia się na wizualnym wzbogaceniu, storytelling marki i aplikacjach artystycznych. Cel: dodanie prestiżu, widoczności i głębi narracyjnej do obecności Diasen w kontekstach zorientowanych na design, od architektury do sztuki, od mediów społecznościowych po instalacje w rzeczywistości.'
                : 'As a creative ambassador for Diasen, my role focuses on visual elevation, brand storytelling, and artistic application. The goal: to add prestige, visibility, and narrative depth to Diasen\'s presence in design-forward contexts, from architecture to art, from social media to real-life installations.'}
            </div>
            
            {/* CTA Button with Language Selector */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-4 bg-gradient-to-tr from-amber-500 to-yellow-300 text-black font-semibold rounded-xl hover:from-amber-600 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {language === 'pl'
                  ? 'Rozpocznij Formularz Współpracy'
                  : 'Start Collaboration Form'}
              </button>
              
              {/* Language Selector next to CTA */}
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-black/20">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-customStone to-zinc-400 border border-black/30 flex items-center justify-center text-[10px] font-semibold text-white">
                    D
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border border-black/30 flex items-center justify-center text-[10px] font-semibold text-black">
                    A
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-black text-sm font-medium focus:outline-none cursor-pointer"
                >
                  <option value="en" className="bg-white text-black">English</option>
                  <option value="pl" className="bg-white text-black">Polski</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}