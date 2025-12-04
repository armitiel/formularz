import { NextRequest, NextResponse } from 'next/server';

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

function generateCooperationProposal(data: FormData): string {
  const activityLabels: { [key: string]: string } = {
    'realizacje_wlasne': 'własne realizacje / projekty',
    'promocja_diasen': 'promocja i rozwój marki Diasen',
    'murale': 'murale / projekty fizyczne',
    'strategia': 'strategia & doradztwo'
  };

  const refundTypeLabels: { [key: string]: string } = {
    'dodatkowa_praca': 'Dodatkowa praca / poprawki bez dodatkowych kosztów',
    'czesciowy_zwrot': 'Częściowy zwrot vs ustalone KPI / przesunięcie budżetu',
    'kamienie_milowe': 'Rozliczanie kamieniami milowymi (płatność po akceptacji)'
  };

  const header = `
═══════════════════════════════════════════════════════════════════════════════
PROPOZYCJA WSPÓŁPRACY STRATEGICZNO-KREATYWNEJ
${data.yourName} × ${data.companyName}
═══════════════════════════════════════════════════════════════════════════════

Przygotował: ${data.yourName}${data.roleTitle ? ` (${data.roleTitle})` : ''}
${data.contactEmail ? `Kontakt: ${data.contactEmail}` : ''}
Data: ${new Date().toLocaleDateString('pl-PL')}
`;

  const summary = `
🎯 STRESZCZENIE WYKONAWCZE
───────────────────────────────────────────────────────────────────────────────

Proponuję nawiązanie strategicznego partnerstwa z ${data.companyName}, opartego na modelu 
"dwóch nóg" - łączącego rozwój własnych projektów z dedykowanymi działaniami 
na rzecz marki Diasen.

Kluczowe założenia:
• Dedykacja czasowa: ${data.diasenTime}% mojej aktywności na rzecz ${data.companyName}
• Zakres działań: ${data.activities.map(a => activityLabels[a] || a).join(', ')}
• Rynki docelowe: ${data.markets.join(', ')}
• Budżet miesięczny: ${data.monthlyMin ? `${data.monthlyMin}-` : ''}${data.monthlyMax ? `${data.monthlyMax}` : 'do uzgodnienia'} EUR
`;

  const workModel = `
🏗️ MODEL PRACY "DWIE NOGI"
───────────────────────────────────────────────────────────────────────────────

STRUKTURA DZIAŁAŃ:
${data.activities.map(activity => `• ${activityLabels[activity] || activity}`).join('\n')}

FORMA WSPÓŁPRACY:
${data.presenceForm || 'Forma współpracy do ustalenia podczas rozmów.'}

PODZIAŁ CZASU:
• ${data.diasenTime}% - działania dedykowane ${data.companyName}
• ${100 - parseInt(data.diasenTime)}% - własne projekty i realizacje

Ta struktura zapewnia:
✓ Ciągłość i konsekwencję działań dla Diasen
✓ Utrzymanie kreatywności przez realizację własnych projektów  
✓ Synergię między obiema "nogami" działalności
`;

  const financial = `
💰 MODEL FINANSOWY I BEZPIECZEŃSTWO
───────────────────────────────────────────────────────────────────────────────

STRUKTURA BUDŻETOWA:
${data.monthlyMin && data.monthlyMax 
  ? `• Miesięczny budżet: ${data.monthlyMin}-${data.monthlyMax} EUR`
  : data.monthlyMin 
    ? `• Miesięczny budżet minimum: ${data.monthlyMin} EUR`
    : data.monthlyMax 
      ? `• Miesięczny budżet maksimum: ${data.monthlyMax} EUR`
      : '• Budżet miesięczny: do uzgodnienia'}

MECHANIZM BEZPIECZEŃSTWA:
${data.refundMechanism === 'tak' 
  ? `✓ Proponuję wdrożenie mechanizmu zabezpieczającego inwestycję:
${refundTypeLabels[data.refundType] || data.refundType}

MIERNIKI EFEKTYWNOŚCI:
${data.metrics || 'Wskaźniki do ustalenia podczas warsztatów strategicznych.'}

Ten model zapewnia ${data.companyName} pełną transparentność i kontrolę nad ROI.`
  : `• Standardowe rozliczenie etapami zgodnie z harmonogramem działań
• Płatności zgodne z kamieniami milowymi projektu`}
`;

  const goals = `
🎯 CELE STRATEGICZNE WSPÓŁPRACY
───────────────────────────────────────────────────────────────────────────────

GŁÓWNE CELE:
${data.goals || 'Cele strategiczne do doprecyzowania podczas spotkania warsztatowego.'}

RYNKI DOCELOWE:
${data.markets.map(market => `• ${market}`).join('\n')}

WARTOŚĆ DODANA:
• Budowanie długoterminowej pozycji marki Diasen
• Kreowanie narracji premium w segmencie architektury
• Rozwój kanałów komunikacji z grupami docelowymi
• Tworzenie referencyjnych realizacji i case studies
`;

  const nextSteps = `
🚀 NASTĘPNE KROKI
───────────────────────────────────────────────────────────────────────────────

PROPONOWANY PROCES WDROŻENIA:

1. SPOTKANIE WARSZTATOWE (1-2h)
   • Doprecyzowanie celów biznesowych Diasen
   • Ustalenie kluczowych wskaźników sukcesu
   • Zdefiniowanie pilotażowych projektów

2. PILOT (30-60 dni)
   • Realizacja wybranej inicjatywy testowej
   • Zebranie pierwszych danych i feedbacku
   • Optymalizacja procesów współpracy

3. PEŁNE WDROŻENIE
   • Implementacja kompletnego modelu współpracy
   • Regularne sesje strategiczne i optymalizacja
   • Skalowanie działań zgodnie z wynikami

${data.extraNotes ? `
DODATKOWY KONTEKST:
${data.extraNotes}
` : ''}

═══════════════════════════════════════════════════════════════════════════════
Ten dokument stanowi bazę do dyskusji. Wszystkie parametry można dostosować 
do specyficznych potrzeb i oczekiwań ${data.companyName}.

Jestem otwarty na rozmowę o szczegółach i modyfikacjach tej propozycji.
═══════════════════════════════════════════════════════════════════════════════
`;

  return header + summary + workModel + financial + goals + nextSteps;
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();
    
    // Basic validation
    if (!data.yourName) {
      return NextResponse.json(
        { error: 'Pole "Twoje imię / marka" jest wymagane' },
        { status: 400 }
      );
    }

    const summary = generateCooperationProposal(data);
    
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating proposal:', error);
    return NextResponse.json(
      { error: 'Błąd podczas generowania propozycji' },
      { status: 500 }
    );
  }
}