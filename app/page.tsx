'use client';

import { useState } from 'react';

interface FormData {
  // Basic company info
  companyName: string;
  contactPerson: string;
  contactRole: string;
  contactEmail: string;
  
  // SEKCJA 1: Obszary współpracy (A-H)
  areasOfCooperation: string[];
  
  // SEKCJA 2: Model współpracy i zaangażowania
  cooperationModel: string[];
  billingForm: string[];
  engagementScope: string[];
  teamIntegrationLevel: string[];
  additionalPreferences: string[];
  
  // SEKCJA 3: Scenariusze współpracy (1-8)
  selectedScenarios: string[];
  
  // Additional options
  languageMode: string;
  sendEmail: boolean;
  emailToSend: string;
  additionalNotes: string;
}

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState<FormData>({
    // Basic company info
    companyName: '',
    contactPerson: '',
    contactRole: '',
    contactEmail: '',
    
    // SEKCJA 1: Obszary współpracy
    areasOfCooperation: [],
    
    // SEKCJA 2: Model współpracy i zaangażowania
    cooperationModel: [],
    billingForm: [],
    engagementScope: [],
    teamIntegrationLevel: [],
    additionalPreferences: [],
    
    // SEKCJA 3: Scenariusze współpracy
    selectedScenarios: [],
    
    // Additional options
    languageMode: 'pl',
    sendEmail: false,
    emailToSend: '',
    additionalNotes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      setShowModal(true);
      downloadFile(summary);
    } catch (err) {
      setResponse('Wystąpił błąd połączenia z backendem.');
      setShowResponse(true);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Modal for displaying proposal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl shadow-black/60 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="border-b border-white/20 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">Finalna Hybryda - Propozycja Współpracy</h3>
                <p className="text-xs text-zinc-300 mt-1">Wygenerowana propozycja została automatycznie pobrana jako plik .txt</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-zinc-100 transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-auto max-h-[calc(90vh-140px)]">
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4">
                <div className="text-xs md:text-sm leading-relaxed text-zinc-100 whitespace-pre-wrap font-mono">
                  {response}
                </div>
              </div>
              
              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10">
                <div className="text-xs text-zinc-400 flex items-center gap-2">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/30">
                    ✓
                  </span>
                  <span>Propozycja została automatycznie pobrana jako plik tekstowy</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => downloadFile(response)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-zinc-100 text-sm rounded-xl transition-colors border border-white/20"
                  >
                    Pobierz ponownie
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-gradient-to-tr from-amber-500 to-yellow-300 text-black font-semibold rounded-xl hover:from-amber-600 hover:to-yellow-400 transition-all duration-200 text-sm"
                  >
                    Zamknij
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    {showForm ? (
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

          <form onSubmit={handleSubmit} className="px-5 md:px-8 py-6 md:py-8 space-y-8 text-sm">
            {/* Basic Company Info */}
            <section className="space-y-4 pb-6 border-b border-white/10">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="companyName" className="block text-xs font-semibold text-zinc-200">
                    Nazwa firmy / marki *
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="np. Diasen Polska"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contactPerson" className="block text-xs font-semibold text-zinc-200">
                    Osoba kontaktowa *
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="np. Anna Kowalska"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contactRole" className="block text-xs font-semibold text-zinc-200">
                    Stanowisko
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

                <div className="space-y-1.5">
                  <label htmlFor="contactEmail" className="block text-xs font-semibold text-zinc-200">
                    E-mail *
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="np. kontakt@diasen.pl"
                    required
                  />
                </div>
              </div>
            </section>

            {/* SEKCJA 1 – Obszary współpracy (A-H) */}
            <section className="space-y-6 border-t border-white/20 pt-6">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-100">SEKCJA 1 — Wybór obszarów współpracy</h2>
                  <p className="text-xs text-zinc-300 mt-1">
                    Proszę zaznaczyć obszary współpracy, które są dla Państwa interesujące.
                  </p>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                  Sekcja 1/4
                </span>
              </div>

              {/* A. Wizualna prezentacja marki */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-100 bg-zinc-800/30 px-3 py-2 rounded-lg">
                  A. Wizualna prezentacja marki Diasen Polska
                </h3>
                <div className="space-y-2">
                  {[
                    'materialy_marketingowe_ekskluzywne',
                    'dokumentacja_projektow_editorial',
                    'kampanie_wizerunkowe_social_media',
                    'materialy_dla_diasen',
                    'prezentacje_produktow_polskie_projekty',
                    'otwarci_wizualna_prezentacja'
                  ].map((area, index) => {
                    const labels = [
                      'Ekskluzywne materiały marketingowe z realizacji (foto / wideo)',
                      'Dokumentacja projektów w stylu editorial',
                      'Kreacja kampanii wizerunkowych i treści do social media',
                      'Tworzenie materiałów dla Diasen Polska',
                      'Prezentacje produktów w realnych polskich projektach',
                      'Jesteśmy otwarci na współpracę w tym obszarze'
                    ];
                    return (
                      <label key={area} className="inline-flex items-start gap-2 text-xs text-zinc-200 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/30 transition-colors w-full">
                        <input
                          type="checkbox"
                          name="areasOfCooperation"
                          value={area}
                          checked={formData.areasOfCooperation.includes(area)}
                          onChange={handleCheckboxChange}
                          className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400 mt-0.5"
                        />
                        <span className="text-xs leading-tight">{labels[index]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* B. Ambasadorskie działania kreatywne */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-100 bg-zinc-800/30 px-3 py-2 rounded-lg">
                  B. Ambasadorskie działania kreatywne
                </h3>
                <div className="space-y-2">
                  {[
                    'rola_ambasadora_marki',
                    'niezalezna_kreacja_materialow',
                    'wspolpraca_dzial_marketing',
                    'budowanie_narracji_wizualnej',
                    'kampanie_technologia_projekty',
                    'otwarci_ambasadorskie'
                  ].map((area, index) => {
                    const labels = [
                      'Rola Ambasadora Marki Diasen Polska',
                      'Niezależna kreacja materiałów marketingowych',
                      'Współpraca z działem marketingu Diasen Polska',
                      'Budowanie narracji wizualnej (brand storytelling)',
                      'Kampanie łączące technologię Diasen z moimi projektami',
                      'Jesteśmy otwarci'
                    ];
                    return (
                      <label key={area} className="inline-flex items-start gap-2 text-xs text-zinc-200 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/30 transition-colors w-full">
                        <input
                          type="checkbox"
                          name="areasOfCooperation"
                          value={area}
                          checked={formData.areasOfCooperation.includes(area)}
                          onChange={handleCheckboxChange}
                          className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400 mt-0.5"
                        />
                        <span className="text-xs leading-tight">{labels[index]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* C. Murale i realizacje artystyczne */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-100 bg-zinc-800/30 px-3 py-2 rounded-lg">
                  C. Murale i realizacje artystyczne
                </h3>
                <div className="space-y-2">
                  {[
                    'murale_wewnetrzne_ekskluzywne',
                    'murale_elewacyjne_ekskluzywne',
                    'murale_expo_targi_wydarzenia',
                    'ekspozycje_przestrzen_publiczna',
                    'otwarci_murale'
                  ].map((area, index) => {
                    const labels = [
                      'Ekskluzywne murale wewnętrzne',
                      'Ekskluzywne murale elewacyjne',
                      'Murale na expo, targach i wydarzeniach',
                      'Unikalne ekspozycje w przestrzeni publicznej',
                      'Jesteśmy otwarci'
                    ];
                    return (
                      <label key={area} className="inline-flex items-start gap-2 text-xs text-zinc-200 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/30 transition-colors w-full">
                        <input
                          type="checkbox"
                          name="areasOfCooperation"
                          value={area}
                          checked={formData.areasOfCooperation.includes(area)}
                          onChange={handleCheckboxChange}
                          className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400 mt-0.5"
                        />
                        <span className="text-xs leading-tight">{labels[index]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* D. Działania ekspozycyjne, eventowe i edukacyjne */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-100 bg-zinc-800/30 px-3 py-2 rounded-lg">
                  D. Działania ekspozycyjne, eventowe i edukacyjne
                </h3>
                <div className="space-y-2">
                  {[
                    'targi_expo_showroomy_polska',
                    'instalacje_wizualne_wydarzenia',
                    'szkolenia_architekci_wykonawcy',
                    'webinary_live_polska',
                    'eventy_tematyczne_tworcy',
                    'otwarci_ekspozycyjne'
                  ].map((area, index) => {
                    const labels = [
                      'Udział w polskich targach, expo i showroomach',
                      'Instalacje wizualne na wydarzenia branżowe',
                      'Szkolenia dla architektów, wykonawców i deweloperów',
                      'Webinary / live\'y dla odbiorców w Polsce',
                      'Eventy tematyczne z udziałem twórców',
                      'Jesteśmy otwarci'
                    ];
                    return (
                      <label key={area} className="inline-flex items-start gap-2 text-xs text-zinc-200 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/30 transition-colors w-full">
                        <input
                          type="checkbox"
                          name="areasOfCooperation"
                          value={area}
                          checked={formData.areasOfCooperation.includes(area)}
                          onChange={handleCheckboxChange}
                          className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400 mt-0.5"
                        />
                        <span className="text-xs leading-tight">{labels[index]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* E. Rozszerzona współpraca biznesowa */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-100 bg-zinc-800/30 px-3 py-2 rounded-lg">
                  E. Rozszerzona współpraca biznesowa
                </h3>
                <div className="space-y-2">
                  {[
                    'wspolpraca_niezalezny_partner',
                    'stala_wspolpraca_konsultant',
                    'kampanie_kwartalne_polroczne',
                    'prezentacje_deweloperzy',
                    'doradztwo_kreatywne_klienci',
                    'otwarci_biznesowa'
                  ].map((area, index) => {
                    const labels = [
                      'Współpraca jako niezależny partner',
                      'Stała współpraca jako konsultant kreatywny',
                      'Kampanie kwartalne / półroczne',
                      'Prezentacje produktów Diasen u deweloperów',
                      'Doradztwo kreatywne dla klientów',
                      'Jesteśmy otwarci'
                    ];
                    return (
                      <label key={area} className="inline-flex items-start gap-2 text-xs text-zinc-200 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/30 transition-colors w-full">
                        <input
                          type="checkbox"
                          name="areasOfCooperation"
                          value={area}
                          checked={formData.areasOfCooperation.includes(area)}
                          onChange={handleCheckboxChange}
                          className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400 mt-0.5"
                        />
                        <span className="text-xs leading-tight">{labels[index]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* F. Materiały edukacyjne i świadomościowe */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-100 bg-zinc-800/30 px-3 py-2 rounded-lg">
                  F. Materiały edukacyjne i świadomościowe (dla szerokiej publiczności w Polsce)
                </h3>
                <div className="space-y-2">
                  {[
                    'kampanie_akustyka_mieszkan',
                    'materialy_zdrowe_wnetrza',
                    'tresci_storytelling_odbiorcy',
                    'serie_edukacyjne_reelsy',
                    'porownania_produktow_typowe',
                    'kampanie_nowe_mieszkania',
                    'akcja_ulotkowa_probka_farby',
                    'ulotki_edukacyjne_korek',
                    'dystrybucja_osiedla_sklepy',
                    'ulotki_qr_kody',
                    'ogolnokrajowa_kampania',
                    'otwarci_edukacyjne'
                  ].map((area, index) => {
                    const labels = [
                      'Kampanie o akustyce mieszkań',
                      'Materiały o zdrowych wnętrzach i mikroklimacie',
                      'Treści storytellingowe dla zwykłych odbiorców',
                      'Serie edukacyjne: reelsy, grafiki, krótkie filmy',
                      'Porównania produktów Diasen z typowymi materiałami',
                      'Kampanie dla nowych mieszkań i rodzin',
                      'Ogólnokrajowa akcja ulotkowa z próbką farby',
                      'Ulotki edukacyjne o korku (zdrowie, akustyka, mikroklimat)',
                      'Dystrybucja na osiedlach, showroomach, w sklepach',
                      'Ulotki z QR kodami (filmy, poradniki, galerie)',
                      'Ogólnokrajowa kampania informacyjna',
                      'Jesteśmy otwarci'
                    ];
                    return (
                      <label key={area} className="inline-flex items-start gap-2 text-xs text-zinc-200 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/30 transition-colors w-full">
                        <input
                          type="checkbox"
                          name="areasOfCooperation"
                          value={area}
                          checked={formData.areasOfCooperation.includes(area)}
                          onChange={handleCheckboxChange}
                          className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400 mt-0.5"
                        />
                        <span className="text-xs leading-tight">{labels[index]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* G. Social Media — Kreacja, Strategia i Prowadzenie */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-100 bg-zinc-800/30 px-3 py-2 rounded-lg">
                  G. Social Media — Kreacja, Strategia i Prowadzenie (Diasen Polska)
                </h3>
                <div className="space-y-2">
                  {[
                    'prowadzenie_oficjalne_profile',
                    'wspolprowadzenie_sm_marketing',
                    'produkcja_tresci_premium',
                    'budowa_spojnej_estetyki',
                    'serie_edukacyjne_sm',
                    'strategia_komunikacji_polska',
                    'wsparcie_eventy_targi',
                    'otwarci_social_media'
                  ].map((area, index) => {
                    const labels = [
                      'Prowadzenie oficjalnych profili Diasen Polska',
                      'Współprowadzenie SM z działem marketingu',
                      'Produkcja treści premium: foto, wideo, reels',
                      'Budowa spójnej estetyki SM',
                      'Serie edukacyjne pod social media',
                      'Strategia komunikacji na polski rynek',
                      'Wsparcie podczas eventów i targów',
                      'Jesteśmy otwarci'
                    ];
                    return (
                      <label key={area} className="inline-flex items-start gap-2 text-xs text-zinc-200 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/30 transition-colors w-full">
                        <input
                          type="checkbox"
                          name="areasOfCooperation"
                          value={area}
                          checked={formData.areasOfCooperation.includes(area)}
                          onChange={handleCheckboxChange}
                          className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400 mt-0.5"
                        />
                        <span className="text-xs leading-tight">{labels[index]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* H. Utworzenie lub współtworzenie działu marketingowego */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-100 bg-zinc-800/30 px-3 py-2 rounded-lg">
                  H. Utworzenie lub współtworzenie działu marketingowego Diasen Polska
                </h3>
                <div className="space-y-2">
                  {[
                    'stworzenie_dzial_od_podstaw',
                    'wspoltworzenie_lider_kreatywny',
                    'udzial_konsultant_wspolprowadzacy',
                    'strategia_wizerunek_rynek_pl',
                    'wsparcie_kampanie_marketingowe',
                    'budowa_brand_book_polski',
                    'rekrutacja_selekcja_wspolpracownicy',
                    'otwarci_dzial_marketingu'
                  ].map((area, index) => {
                    const labels = [
                      'Stworzenie od podstaw działu marketingu Diasen Polska',
                      'Współtworzenie działu jako lider kreatywny',
                      'Udział jako konsultant lub współprowadzący',
                      'Opracowanie pełnej strategii wizerunku na rynek PL',
                      'Wsparcie przy kampaniach i działaniach marketingowych',
                      'Budowa polskiego brand booka Diasen',
                      'Rekrutacja lub selekcja współpracowników',
                      'Jesteśmy otwarci'
                    ];
                    return (
                      <label key={area} className="inline-flex items-start gap-2 text-xs text-zinc-200 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/30 transition-colors w-full">
                        <input
                          type="checkbox"
                          name="areasOfCooperation"
                          value={area}
                          checked={formData.areasOfCooperation.includes(area)}
                          onChange={handleCheckboxChange}
                          className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400 mt-0.5"
                        />
                        <span className="text-xs leading-tight">{labels[index]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SEKCJA 2 – Model współpracy i zaangażowania */}
            <section className="space-y-6 border-t border-white/20 pt-6">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-100">SEKCJA 2 — Model współpracy i zaangażowania</h2>
                  <p className="text-xs text-zinc-300 mt-1">
                    Proszę wybrać preferowany sposób współpracy i formę rozliczeń.
                  </p>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                  Sekcja 2/4
                </span>
              </div>

              {/* 1. Preferowany model współpracy */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-200">1. Preferowany model współpracy</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'projektowy', label: 'Projektowy (per projekt)' },
                    { value: 'staly', label: 'Stały (miesięczny / retainer)' },
                    { value: 'okresowy', label: 'Okresowy (kwartał / pół roku)' },
                    { value: 'mieszany', label: 'Mieszany (stała część + projekty)' },
                    { value: 'otwarci_model', label: 'Jesteśmy otwarci' }
                  ].map((option) => (
                    <label key={option.value} className="inline-flex items-center gap-2 text-xs text-zinc-200 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/40">
                      <input
                        type="checkbox"
                        name="cooperationModel"
                        value={option.value}
                        checked={formData.cooperationModel.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. Forma rozliczeń */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-200">2. Forma rozliczeń</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'miesieczna', label: 'Miesięczna' },
                    { value: 'kwartalna', label: 'Kwartalna' },
                    { value: 'polroczna', label: 'Półroczna' },
                    { value: 'jednorazowa', label: 'Jednorazowa (per kampania)' },
                    { value: 'otwarci_rozliczenia', label: 'Jesteśmy otwarci' }
                  ].map((option) => (
                    <label key={option.value} className="inline-flex items-center gap-2 text-xs text-zinc-200 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/40">
                      <input
                        type="checkbox"
                        name="billingForm"
                        value={option.value}
                        checked={formData.billingForm.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Zakres zaangażowania */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-200">3. Zakres zaangażowania</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'dostepnosc_projektowa', label: 'Dostępność projektowa (ad-hoc)' },
                    { value: 'stala_dostepnosc', label: 'Stała dostępność (określony wymiar godzin)' },
                    { value: 'intensywna_kampania', label: 'Intensywna praca w czasie kampanii' },
                    { value: 'doradztwo_kreatywne', label: 'Doradztwo kreatywne' },
                    { value: 'otwarci_zaangażowanie', label: 'Jesteśmy otwarci' }
                  ].map((option) => (
                    <label key={option.value} className="inline-flex items-center gap-2 text-xs text-zinc-200 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/40">
                      <input
                        type="checkbox"
                        name="engagementScope"
                        value={option.value}
                        checked={formData.engagementScope.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. Poziom integracji z zespołem */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-200">4. Poziom integracji z zespołem</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'praca_niezalezna', label: 'Praca niezależna' },
                    { value: 'wspolpraca_dzial_marketingu', label: 'Praca we współpracy z działem marketingu' },
                    { value: 'wspolne_dzialania_projekty', label: 'Wspólne działania przy projektach' },
                    { value: 'otwarci_integracja', label: 'Jesteśmy otwarci' }
                  ].map((option) => (
                    <label key={option.value} className="inline-flex items-center gap-2 text-xs text-zinc-200 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/40">
                      <input
                        type="checkbox"
                        name="teamIntegrationLevel"
                        value={option.value}
                        checked={formData.teamIntegrationLevel.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 5. Preferencje dodatkowe */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-200">5. Preferencje dodatkowe</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'raporty_dzialan', label: 'Raporty z działań' },
                    { value: 'spojana_linia_kreatywna', label: 'Spójna linia kreatywna' },
                    { value: 'budowanie_spolecznosci', label: 'Budowanie społeczności (architekci, wykonawcy)' },
                    { value: 'otwarci_preferencje', label: 'Jesteśmy otwarci' }
                  ].map((option) => (
                    <label key={option.value} className="inline-flex items-center gap-2 text-xs text-zinc-200 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 cursor-pointer hover:bg-black/40">
                      <input
                        type="checkbox"
                        name="additionalPreferences"
                        value={option.value}
                        checked={formData.additionalPreferences.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* SEKCJA 3 – Scenariusze współpracy */}
            <section className="space-y-6 border-t border-white/20 pt-6">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-100">SEKCJA 3 — Proponowane scenariusze współpracy</h2>
                  <p className="text-xs text-zinc-300 mt-1">
                    Można wybrać jedną lub kilka opcji. Finalna oferta będzie hybrydą wybranych elementów.
                  </p>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                  Sekcja 3/4
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    value: 'scenariusz_1',
                    title: 'SCENARIUSZ 1 — Marketingowo-Ambasadorski',
                    description: 'Stała produkcja treści foto/wideo • Kampanie wizerunkowe • Rola ambasadora • Dokumentacja projektów • Storytelling marki'
                  },
                  {
                    value: 'scenariusz_2',
                    title: 'SCENARIUSZ 2 — Artystyczno-Eventowy',
                    description: 'Murale wewnętrzne i fasadowe • Murale na wydarzeniach • Instalacje • Rozliczenia projektowe'
                  },
                  {
                    value: 'scenariusz_3',
                    title: 'SCENARIUSZ 3 — Hybryda Kreatywno-Marketingowa',
                    description: 'Art + marketing • Prowadzenie social media • Treści premium • Storytelling • Elastyczne rozliczenia'
                  },
                  {
                    value: 'scenariusz_4',
                    title: 'SCENARIUSZ 4 — Rozwój Regionalny i Edukacja',
                    description: 'Szkolenia dla architektów • Budowanie społeczności • Prezentacje dla deweloperów'
                  },
                  {
                    value: 'scenariusz_5',
                    title: 'SCENARIUSZ 5 — Minimalny Start (Light)',
                    description: 'Pojedyncze projekty/kampanie • Możliwość rozszerzenia współpracy'
                  },
                  {
                    value: 'scenariusz_6',
                    title: 'SCENARIUSZ 6 — Ogólnokrajowa Kampania Edukacyjna',
                    description: 'Akcja ulotkowa z próbkami farb • Edukacja o akustyce • Dystrybucja • Materiały edukacyjne'
                  },
                  {
                    value: 'scenariusz_7',
                    title: 'SCENARIUSZ 7 — Kampanie Świadomościowe',
                    description: 'Serie edukacyjne • Analiza problemów mieszkań • Edukacja dla odbiorców'
                  },
                  {
                    value: 'scenariusz_8',
                    title: 'SCENARIUSZ 8 — Utworzenie Działu Marketingu',
                    description: 'Stworzenie działu od zera • Kierunek kreatywny • Brand book PL • Rekrutacja'
                  }
                ].map((scenario) => (
                  <div key={scenario.value} className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-black/40 transition-colors">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="selectedScenarios"
                        value={scenario.value}
                        checked={formData.selectedScenarios.includes(scenario.value)}
                        onChange={handleCheckboxChange}
                        className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400 mt-1"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-100 mb-1">{scenario.title}</h4>
                        <p className="text-xs text-zinc-300 leading-relaxed">{scenario.description}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </section>

            {/* SEKCJA 4 – Options and submission */}
            <section className="space-y-6 border-t border-white/20 pt-6">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-100">SEKCJA 4 — Finalna hybryda</h2>
                  <p className="text-xs text-zinc-300 mt-1">
                    Opcje dodatkowe i generowanie finalnej propozycji współpracy.
                  </p>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                  Sekcja 4/4
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="additionalNotes" className="block text-xs font-semibold text-zinc-200">
                    Dodatkowe uwagi lub komentarze
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80 min-h-[70px]"
                    placeholder="np. preferencje dotyczące terminów, specjalne wymagania, dodatkowy kontekst"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-zinc-200">Język finalne propozycji</p>
                  <div className="flex flex-wrap gap-3">
                    <label className="inline-flex items-center gap-2 text-xs text-zinc-200">
                      <input
                        type="radio"
                        name="languageMode"
                        value="pl"
                        checked={formData.languageMode === 'pl'}
                        onChange={handleRadioChange}
                        className="border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                      />
                      <span>Polski</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs text-zinc-200">
                      <input
                        type="radio"
                        name="languageMode"
                        value="both"
                        checked={formData.languageMode === 'both'}
                        onChange={handleRadioChange}
                        className="border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                      />
                      <span>Polski + angielski</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="inline-flex items-center gap-2 text-xs text-zinc-200">
                    <input
                      type="checkbox"
                      name="sendEmail"
                      checked={formData.sendEmail}
                      onChange={handleInputChange}
                      className="rounded border-white/20 bg-black/30 text-amber-400 focus:ring-amber-400"
                    />
                    <span>Wyślij propozycję emailem</span>
                  </label>
                </div>

                {formData.sendEmail && (
                  <div className="space-y-1.5">
                    <label htmlFor="emailToSend" className="block text-xs font-semibold text-zinc-200">
                      Dodatkowy adres email (opcjonalnie)
                    </label>
                    <input
                      className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-300/80"
                      type="email"
                      id="emailToSend"
                      name="emailToSend"
                      value={formData.emailToSend}
                      onChange={handleInputChange}
                      placeholder="np. dyrektor@diasen.pl"
                    />
                  </div>
                )}
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
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 px-5 py-2.5 text-xs md:text-sm font-semibold text-black shadow-lg shadow-amber-500/40 hover:shadow-amber-500/60 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 focus:ring-offset-transparent disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generuję finalną hybrydę...</span>
                  </>
                ) : (
                  <>
                    <span className="mr-1.5">Wygeneruj finalną hybrydę</span>
                    <span className="text-lg leading-none">↗</span>
                  </>
                )}
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
        <div className="w-full max-w-[1920px] min-h-screen relative mx-auto">
          {/* Main Content - Mobile Responsive */}
          <div className="absolute left-4 md:left-[254px] top-[120px] md:top-[136px] w-[calc(100%-2rem)] md:w-[620px] inline-flex flex-col justify-start items-start gap-6 md:gap-8 px-4 md:px-0">
            <div className="self-stretch justify-start">
              <span className="text-black text-2xl md:text-4xl font-bold font-['Arial'] leading-8 md:leading-[48px]">
                {language === 'pl' ? 'Propozycja: ' : 'Proposal: '}
              </span>
              <span className="text-black text-2xl md:text-4xl font-normal font-['Arial'] leading-8 md:leading-[48px]">
                {language === 'pl'
                  ? 'Ambasador Kreatywny i Partner ds. Storytelling Marki dla Diasen'
                  : 'Creative Ambassador & Brand Storytelling Partner for Diasen'}
              </span>
            </div>
            <div className="self-stretch justify-start text-gray-800 text-base md:text-lg font-normal font-['Inter'] leading-6 md:leading-7">
              {language === 'pl'
                ? 'Jako ambasador kreatywny Diasen, moja rola skupia się na wizualnym wzbogaceniu, storytelling marki i aplikacjach artystycznych. Cel: dodanie prestiżu, widoczności i głębi narracyjnej do obecności Diasen w kontekstach zorientowanych na design, od architektury do sztuki, od mediów społecznościowych po instalacje w rzeczywistości.'
                : 'As a creative ambassador for Diasen, my role focuses on visual elevation, brand storytelling, and artistic application. The goal: to add prestige, visibility, and narrative depth to Diasen\'s presence in design-forward contexts, from architecture to art, from social media to real-life installations.'}
            </div>

            {/* CTA Button with Language Selector - Mobile Responsive */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-8 w-full">
              <button
                onClick={() => setShowForm(true)}
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-tr from-amber-500 to-yellow-300 text-black font-semibold rounded-xl hover:from-amber-600 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base w-full md:w-auto text-center"
              >
                {language === 'pl'
                  ? 'Rozpocznij Formularz Współpracy'
                  : 'Start Collaboration Form'}
              </button>

              {/* Language Selector - Mobile Responsive */}
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-3 border border-black/20 w-full md:w-auto justify-center md:justify-start">
                <div className="flex -space-x-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-tr from-customStone to-zinc-400 border border-black/30 flex items-center justify-center text-[9px] md:text-[10px] font-semibold text-white">
                    D
                  </div>
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border border-black/30 flex items-center justify-center text-[9px] md:text-[10px] font-semibold text-black">
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
    )}
    </>
  );
}