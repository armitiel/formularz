import { NextRequest, NextResponse } from 'next/server';

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

async function generateCooperationProposal(data: FormData): Promise<string> {
  // Determine collaboration variant based on modules count and intensity
  const getCollaborationVariant = () => {
    const totalSelections = data.areasOfCooperation.length + data.selectedScenarios.length;
    if (totalSelections <= 3) return 'BASIC';
    if (totalSelections <= 6) return 'PLUS';
    return 'PRO';
  };

  const variant = getCollaborationVariant();
  
  const moduleLabels: { [key: string]: { pl: string, en: string } } = {
    'strategie_marki': { pl: 'Uporządkowanie strategii marki i komunikacji', en: 'Brand strategy organization' },
    'pozycjonowanie_premium': { pl: 'Wizerunek premium / pozycjonowanie marki', en: 'Premium image / brand positioning' },
    'wejscie_na_rynki': { pl: 'Strategia wejścia na nowe rynki', en: 'New market entry strategy' },
    'konsultacje_kreatywne': { pl: 'Konsultacje kreatywne + kierunek wizualny', en: 'Creative consultations + visual direction' },
    'materialy_editorial': { pl: 'Editorialowe zdjęcia projektów', en: 'Editorial project photography' },
    'video_krotkie_formy': { pl: 'Krótkie formy wideo / reels', en: 'Short video formats / reels' },
    'wizualizacje_3d': { pl: 'Wizualizacje 3D produktów', en: '3D product visualizations' },
    'dokumentacja_realizacji': { pl: 'Dokumentacja realizacji', en: 'Project documentation' },
    'biblioteka_zdjec': { pl: 'Biblioteka zdjęć produktów', en: 'Product photo library' },
    'kampania_pilotazowa': { pl: 'Kampania pilotażowa', en: 'Pilot campaign' },
    'content_dla_architektow': { pl: 'Content dla architektów', en: 'Content for architects' },
    'kampanie_edukacyjne': { pl: 'Kampanie edukacyjne', en: 'Educational campaigns' },
    'pr_publikacje': { pl: 'PR i publikacje branżowe', en: 'PR and industry publications' }
  };

  const goalLabels: { [key: string]: { pl: string, en: string } } = {
    'rozpoznawalnosc': { pl: 'Zwiększenie rozpoznawalności marki', en: 'Increase brand recognition' },
    'dotarcie_architekci': { pl: 'Dotarcie do biur architektonicznych', en: 'Reach architectural offices' },
    'prestiz_marki': { pl: 'Podniesienie prestiżu marki', en: 'Increase brand prestige' },
    'wyróżnienie_technologia': { pl: 'Wyróżnienie się technologią', en: 'Stand out with technology' },
    'wzrost_popytu': { pl: 'Zwiększenie popytu na produkty', en: 'Increase product demand' },
    'portfolio_realizacji': { pl: 'Portfolio realizacji', en: 'Portfolio of projects' },
    'wejscie_rynek_polska': { pl: 'Pozycja na rynku polskim', en: 'Position in Polish market' },
    'wejscie_rynek_eu': { pl: 'Rozwój europejski', en: 'European development' }
  };

  // Build prompt for AI
    const prompt = `
  You are an expert assistant that builds and synthesizes B2B collaboration offers based on a structured questionnaire for Diasen Polska.
  
  CONTEXT:
  The client is ${data.companyName} and they filled in a form with their collaboration preferences.
  
  CLIENT DATA:
  - Company: ${data.companyName}
  - Contact: ${data.contactPerson}${data.contactRole ? ` (${data.contactRole})` : ''}
  - Email: ${data.contactEmail}
  
  SEKCJA 1 - SELECTED AREAS OF COOPERATION:
  ${data.areasOfCooperation.length > 0
    ? data.areasOfCooperation.map(area => `• ${area.replace(/_/g, ' ')}`).join('\n')
    : '• No areas selected'}
  
  SEKCJA 2 - COOPERATION MODEL PREFERENCES:
  Cooperation Model: ${data.cooperationModel.join(', ') || 'Not specified'}
  Billing Form: ${data.billingForm.join(', ') || 'Not specified'}
  Engagement Scope: ${data.engagementScope.join(', ') || 'Not specified'}
  Team Integration: ${data.teamIntegrationLevel.join(', ') || 'Not specified'}
  Additional Preferences: ${data.additionalPreferences.join(', ') || 'Not specified'}
  
  SEKCJA 3 - SELECTED COOPERATION SCENARIOS:
  ${data.selectedScenarios.length > 0
    ? data.selectedScenarios.map(scenario => `• ${scenario.replace(/_/g, ' ')}`).join('\n')
    : '• No scenarios selected'}
  
  ADDITIONAL NOTES:
  ${data.additionalNotes || 'No additional notes provided'}
  
  LANGUAGE: ${data.languageMode === 'en' ? 'English only' : data.languageMode === 'pl' ? 'Polish only' : 'Both Polish and English'}
  
  YOUR TASK:
  Create a clear, structured, premium-looking collaboration proposal ("FINALNA HYBRYDA") based on the selections above.
  
  The output should include:
  1. Wprowadzenie / kontekst współpracy
  2. Wybrane obszary współpracy (podsumowanie wyborów klienta)
  3. Proponowany model współpracy (odniesienie do SEKCJA 2 + scenariuszy)
  4. Moduły / filary współpracy (opis hybrydy na bazie SEKCJA 1 i wybranych scenariuszy z SEKCJA 3)
  5. Model rozliczeń i zaangażowania
  6. Proponowany harmonogram / etapy
  7. Wstępna wycena lub opis doprecyzowania wyceny
  8. Podsumowanie i zaproszenie do rozmowy
  
  Use premium, calm, partnership tone with clear B2B language. If multiple areas are selected, combine them into a logical PROGRAM with modules.
  
  ${data.languageMode === 'en' ? 'Write entirely in English.' : data.languageMode === 'pl' ? 'Write entirely in Polish.' : 'Write in Polish first, then add English translation separated by divider.'}
  `;

  try {
    // Try to use OpenRouter API if available
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const openRouterModel = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct';

    if (openRouterKey) {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openRouterKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: openRouterModel,
          messages: [
            {
              role: 'system',
              content: 'You are an expert assistant who generates premium-quality B2B collaboration proposals. You output structured, clear, professional text.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (response.ok) {
        const aiData = await response.json();
        return aiData.choices[0]?.message?.content || generateFallbackProposal(data);
      }
    }
  } catch (error) {
    console.error('OpenRouter API error:', error);
  }

  // Fallback to template-based generation
  return generateFallbackProposal(data);
}

function generateFallbackProposal(data: FormData): string {
  // Determine complexity based on selected areas and scenarios
  const totalSelections = data.areasOfCooperation.length + data.selectedScenarios.length;
  const variant = totalSelections <= 3 ? 'BASIC' :
                 totalSelections <= 6 ? 'PLUS' : 'PRO';

  const isEnglish = data.languageMode === 'en';
  const isBoth = data.languageMode === 'both';

  const generateProposalContent = (lang: 'en' | 'pl') => {
    return `
═══════════════════════════════════════════════════════════════════════════════
${lang === 'en' ? 'STRATEGIC-CREATIVE COLLABORATION PROPOSAL' : 'PROPOZYCJA WSPÓŁPRACY STRATEGICZNO-KREATYWNEJ'}
${data.companyName} ${lang === 'en' ? 'Partnership Program' : 'Program Partnerski'}
═══════════════════════════════════════════════════════════════════════════════

${lang === 'en' ? 'Prepared for' : 'Przygotowano dla'}: ${data.companyName}
${lang === 'en' ? 'Contact' : 'Kontakt'}: ${data.contactPerson}${data.contactRole ? ` (${data.contactRole})` : ''}
Email: ${data.contactEmail}
${lang === 'en' ? 'Date' : 'Data'}: ${new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'pl-PL')}

🎯 ${lang === 'en' ? 'EXECUTIVE SUMMARY' : 'STRESZCZENIE WYKONAWCZE'}
───────────────────────────────────────────────────────────────────────────────

${lang === 'en'
  ? `We propose establishing a strategic creative partnership with ${data.companyName}, focused on brand elevation and market presence enhancement.`
  : `Proponuję nawiązanie strategicznego partnerstwa kreatywnego z ${data.companyName}, skupionego na wzmocnieniu marki i obecności rynkowej.`}

${lang === 'en' ? 'RECOMMENDED VARIANT' : 'REKOMENDOWANY WARIANT'}: ${variant}

${lang === 'en' ? 'RECOMMENDED VARIANT' : 'REKOMENDOWANY WARIANT'}: ${variant}

📋 ${lang === 'en' ? 'SELECTED AREAS OF COOPERATION' : 'WYBRANE OBSZARY WSPÓŁPRACY'}
───────────────────────────────────────────────────────────────────────────────

${data.areasOfCooperation.length > 0
  ? data.areasOfCooperation.map(area => `• ${area.replace(/_/g, ' ')}`).join('\n')
  : (lang === 'en' ? '• No areas selected yet' : '• Nie wybrano jeszcze obszarów')
}

🎯 ${lang === 'en' ? 'SELECTED COOPERATION SCENARIOS' : 'WYBRANE SCENARIUSZE WSPÓŁPRACY'}
───────────────────────────────────────────────────────────────────────────────

${data.selectedScenarios.length > 0
  ? data.selectedScenarios.map(scenario => `• ${scenario.replace(/_/g, ' ')}`).join('\n')
  : (lang === 'en' ? '• No scenarios selected yet' : '• Nie wybrano jeszcze scenariuszy')
}

⚙️ ${lang === 'en' ? 'COOPERATION MODEL PREFERENCES' : 'PREFERENCJE MODELU WSPÓŁPRACY'}
───────────────────────────────────────────────────────────────────────────────

${lang === 'en' ? 'Cooperation Model' : 'Model współpracy'}: ${data.cooperationModel.join(', ') || (lang === 'en' ? 'Not specified' : 'Nie określono')}
${lang === 'en' ? 'Billing Form' : 'Forma rozliczeń'}: ${data.billingForm.join(', ') || (lang === 'en' ? 'Not specified' : 'Nie określono')}
${lang === 'en' ? 'Engagement Scope' : 'Zakres zaangażowania'}: ${data.engagementScope.join(', ') || (lang === 'en' ? 'Not specified' : 'Nie określono')}
${lang === 'en' ? 'Team Integration' : 'Integracja z zespołem'}: ${data.teamIntegrationLevel.join(', ') || (lang === 'en' ? 'Not specified' : 'Nie określono')}
${lang === 'en' ? 'Additional Preferences' : 'Dodatkowe preferencje'}: ${data.additionalPreferences.join(', ') || (lang === 'en' ? 'Not specified' : 'Nie określono')}

${data.additionalNotes ? `
💬 ${lang === 'en' ? 'ADDITIONAL NOTES' : 'DODATKOWE UWAGI'}
───────────────────────────────────────────────────────────────────────────────
${data.additionalNotes}
` : ''}

🔄 ${lang === 'en' ? 'FINAL HYBRID PROPOSAL' : 'FINALNA HYBRYDA'}
───────────────────────────────────────────────────────────────────────────────

${lang === 'en'
  ? `Based on your selected areas of cooperation and scenarios, we propose a ${variant} collaboration program that combines:`
  : `Na podstawie wybranych obszarów współpracy i scenariuszy proponujemy program współpracy ${variant}, który łączy:`
}

${lang === 'en' ? 'SCOPE OF ACTIVITIES' : 'ZAKRES DZIAŁAŃ'}:
${data.areasOfCooperation.length > 0
  ? data.areasOfCooperation.slice(0, 5).map(area => `• ${area.replace(/_/g, ' ')}`).join('\n')
  : (lang === 'en' ? '• To be defined based on discussion' : '• Do ustalenia na podstawie rozmowy')
}

${lang === 'en' ? 'BILLING MODEL' : 'MODEL ROZLICZEŃ'}:
${data.billingForm.length > 0
  ? data.billingForm.map(billing => `• ${billing.replace(/_/g, ' ')}`).join('\n')
  : (lang === 'en' ? '• Flexible billing model based on preferences' : '• Elastyczny model rozliczeń według preferencji')
}

${lang === 'en' ? 'ENGAGEMENT LEVEL' : 'POZIOM ZAANGAŻOWANIA'}:
${data.engagementScope.length > 0
  ? data.engagementScope.map(scope => `• ${scope.replace(/_/g, ' ')}`).join('\n')
  : (lang === 'en' ? '• To be agreed during consultation' : '• Do uzgodnienia podczas konsultacji')
}

🚀 ${lang === 'en' ? 'NEXT STEPS' : 'NASTĘPNE KROKI'}
───────────────────────────────────────────────────────────────────────────────

${lang === 'en' ? 'PROPOSED IMPLEMENTATION PROCESS' : 'PROPONOWANY PROCES WDROŻENIA'}:

1. ${lang === 'en' ? 'STRATEGIC WORKSHOP (1-2h)' : 'WARSZTAT STRATEGICZNY (1-2h)'}
   • ${lang === 'en' ? 'Define business objectives' : 'Doprecyzowanie celów biznesowych'}
   • ${lang === 'en' ? 'Set success metrics' : 'Ustalenie wskaźników sukcesu'}
   • ${lang === 'en' ? 'Choose pilot projects' : 'Wybór projektów pilotażowych'}

2. ${lang === 'en' ? 'PILOT PHASE (30-60 days)' : 'FAZA PILOTAŻOWA (30-60 dni)'}
   • ${lang === 'en' ? 'Execute selected initiative' : 'Realizacja wybranej inicjatywy'}
   • ${lang === 'en' ? 'Gather feedback and data' : 'Zebranie feedbacku i danych'}
   • ${lang === 'en' ? 'Optimize processes' : 'Optymalizacja procesów'}

3. ${lang === 'en' ? 'FULL IMPLEMENTATION' : 'PEŁNE WDROŻENIE'}
   • ${lang === 'en' ? 'Complete collaboration model' : 'Kompletny model współpracy'}
   • ${lang === 'en' ? 'Regular strategic sessions' : 'Regularne sesje strategiczne'}
   • ${lang === 'en' ? 'Scale activities based on results' : 'Skalowanie działań na podstawie wyników'}

═══════════════════════════════════════════════════════════════════════════════
${lang === 'en'
  ? `This document serves as a discussion basis. All parameters can be adjusted to meet ${data.companyName}'s specific needs and expectations.\n\nI am open to discussion of details and modifications to this proposal.\n\n— Amitiel Angelisme`
  : `Ten dokument stanowi bazę do dyskusji. Wszystkie parametry można dostosować do specyficznych potrzeb i oczekiwań ${data.companyName}.\n\nJestem otwarty na rozmowę o szczegółach i modyfikacjach tej propozycji.\n\n— Amitiel Angelisme`
}
═══════════════════════════════════════════════════════════════════════════════
`;
  };

  if (isBoth) {
    return generateProposalContent('pl') + '\n\n' + '═'.repeat(80) + '\n' + generateProposalContent('en');
  }
  
  return generateProposalContent(isEnglish ? 'en' : 'pl');
}

export async function POST(request: NextRequest) {
  let data: FormData | null = null;
  
  try {
    data = await request.json();
    console.log('Received form data:', JSON.stringify(data, null, 2));
    
    // Ensure data exists and has basic structure
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Invalid form data received' },
        { status: 400 }
      );
    }

    // Set defaults for missing fields to prevent errors
    const processedData: FormData = {
      // Basic company info
      companyName: data.companyName || 'Company Name Not Provided',
      contactPerson: data.contactPerson || 'Contact Person Not Provided',
      contactRole: data.contactRole || '',
      contactEmail: data.contactEmail || 'email@example.com',
      
      // SEKCJA 1: Obszary współpracy
      areasOfCooperation: Array.isArray(data.areasOfCooperation) ? data.areasOfCooperation : [],
      
      // SEKCJA 2: Model współpracy i zaangażowania
      cooperationModel: Array.isArray(data.cooperationModel) ? data.cooperationModel : [],
      billingForm: Array.isArray(data.billingForm) ? data.billingForm : [],
      engagementScope: Array.isArray(data.engagementScope) ? data.engagementScope : [],
      teamIntegrationLevel: Array.isArray(data.teamIntegrationLevel) ? data.teamIntegrationLevel : [],
      additionalPreferences: Array.isArray(data.additionalPreferences) ? data.additionalPreferences : [],
      
      // SEKCJA 3: Scenariusze współpracy
      selectedScenarios: Array.isArray(data.selectedScenarios) ? data.selectedScenarios : [],
      
      // Additional options
      languageMode: data.languageMode || 'pl',
      sendEmail: Boolean(data.sendEmail),
      emailToSend: data.emailToSend || '',
      additionalNotes: data.additionalNotes || ''
    };

    // Only validate if we have some actual user input
    if (!processedData.companyName || processedData.companyName === 'Company Name Not Provided') {
      return NextResponse.json(
        { error: 'Nazwa firmy jest wymagana / Company name is required' },
        { status: 400 }
      );
    }

    const summary = await generateCooperationProposal(processedData);
    
    // Handle email sending if requested
    let emailSent = false;
    let emailMessage = undefined;

    if (processedData.sendEmail && processedData.contactEmail !== 'email@example.com') {
      const targetEmail = processedData.emailToSend || processedData.contactEmail;
      emailMessage = processedData.languageMode === 'en'
        ? `Email feature ready for ${targetEmail} - configure RESEND_API_KEY to enable`
        : `Funkcja email gotowa dla ${targetEmail} - skonfiguruj RESEND_API_KEY aby włączyć`;
    }
    
    return NextResponse.json({
      summary,
      emailSent,
      emailMessage
    });
  } catch (error) {
    console.error('API Error details:', error);
    const errorMessage = data?.languageMode === 'en'
      ? 'Error generating proposal - please check your input'
      : 'Błąd podczas generowania propozycji - sprawdź wprowadzone dane';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}