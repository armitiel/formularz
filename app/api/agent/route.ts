import { NextRequest, NextResponse } from 'next/server';

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

async function generateCooperationProposal(data: FormData): Promise<string> {
  // Determine collaboration variant based on modules count and intensity
  const getCollaborationVariant = () => {
    const moduleCount = data.modules.length;
    if (moduleCount <= 2 || data.intensity <= 30) return 'BASIC';
    if (moduleCount <= 5 || data.intensity <= 70) return 'PLUS';
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
You are an expert consultant generating a premium B2B collaboration proposal. Based on the following client data, generate a structured, professional collaboration proposal.

CLIENT DATA:
- Company: ${data.companyName}
- Contact: ${data.contactPerson}${data.contactRole ? ` (${data.contactRole})` : ''}
- Email: ${data.contactEmail}

SELECTED MODULES:
${data.modules.map(m => `• ${moduleLabels[m]?.[data.languageMode === 'en' ? 'en' : 'pl'] || m}`).join('\n')}

SELECTED GOALS:
${data.goals.map(g => `• ${goalLabels[g]?.[data.languageMode === 'en' ? 'en' : 'pl'] || g}`).join('\n')}

ADDITIONAL GOALS DETAILS:
${data.goalsDetails || 'Not specified'}

COLLABORATION INTENSITY: ${data.intensity}% (${variant} variant)
BUDGET RANGE: ${data.budgetMin || 'Not specified'} - ${data.budgetMax || 'Not specified'} EUR monthly

TARGET MARKETS: ${data.markets.join(', ')}
MARKETS DETAILS: ${data.marketsDetails || 'Not specified'}

LANGUAGE: ${data.languageMode === 'en' ? 'English only' : data.languageMode === 'pl' ? 'Polish only' : 'Both Polish and English'}

Generate a comprehensive, structured proposal that includes:
1. Executive summary with recommended variant (${variant})
2. Module descriptions grouped by category
3. Expected outcomes based on selected goals
4. Collaboration model and budget structure
5. Next steps

${data.languageMode === 'en' ? 'Write entirely in English.' : data.languageMode === 'pl' ? 'Write entirely in Polish.' : 'Write in Polish first, then add English translation separated by divider.'}

Make it professional, detailed, and compelling for a B2B client.
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
  const variant = data.modules.length <= 2 || data.intensity <= 30 ? 'BASIC' :
                 data.modules.length <= 5 || data.intensity <= 70 ? 'PLUS' : 'PRO';

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

${lang === 'en' ? 'Key assumptions' : 'Kluczowe założenia'}:
• ${lang === 'en' ? 'Collaboration intensity' : 'Intensywność współpracy'}: ${data.intensity}%
• ${lang === 'en' ? 'Selected modules' : 'Wybrane moduły'}: ${data.modules.length} ${lang === 'en' ? 'areas' : 'obszarów'}
• ${lang === 'en' ? 'Target markets' : 'Rynki docelowe'}: ${data.markets.join(', ')}
• ${lang === 'en' ? 'Monthly budget' : 'Budżet miesięczny'}: ${data.budgetMin ? `${data.budgetMin}-` : ''}${data.budgetMax ? `${data.budgetMax}` : (lang === 'en' ? 'to be agreed' : 'do uzgodnienia')} EUR

📋 ${lang === 'en' ? 'SELECTED COLLABORATION MODULES' : 'WYBRANE MODUŁY WSPÓŁPRACY'}
───────────────────────────────────────────────────────────────────────────────

${data.modules.length > 0
  ? data.modules.map(module => `• ${module.replace(/_/g, ' ')}`).join('\n')
  : (lang === 'en' ? '• No modules selected yet' : '• Brak wybranych modułów')
}

🎯 ${lang === 'en' ? 'STRATEGIC GOALS' : 'CELE STRATEGICZNE'}
───────────────────────────────────────────────────────────────────────────────

${lang === 'en' ? 'Main objectives' : 'Główne cele'}:
${data.goals.length > 0
  ? data.goals.map(goal => `• ${goal.replace(/_/g, ' ')}`).join('\n')
  : (lang === 'en' ? '• To be defined during strategic workshop' : '• Do ustalenia podczas warsztatu strategicznego')
}

${data.goalsDetails ? `
${lang === 'en' ? 'Priority details' : 'Szczegóły priorytetów'}:
${data.goalsDetails}
` : ''}

💰 ${lang === 'en' ? 'COLLABORATION MODEL & BUDGET' : 'MODEL WSPÓŁPRACY I BUDŻET'}
───────────────────────────────────────────────────────────────────────────────

${lang === 'en' ? 'Intensity level' : 'Poziom intensywności'}: ${data.intensity}%
${data.intensity <= 30
  ? (lang === 'en' ? '→ Single project / pilot approach' : '→ Pojedynczy projekt / podejście pilotażowe')
  : data.intensity <= 70
  ? (lang === 'en' ? '→ Regular collaboration (several modules)' : '→ Regularna współpraca (kilka modułów)')
  : (lang === 'en' ? '→ Full partnership program' : '→ Pełny program partnerski')
}

${(data.budgetMin || data.budgetMax) ? `
${lang === 'en' ? 'Budget structure' : 'Struktura budżetowa'}:
${data.budgetMin && data.budgetMax
  ? `• ${lang === 'en' ? 'Monthly budget range' : 'Miesięczny zakres budżetowy'}: ${data.budgetMin}-${data.budgetMax} EUR`
  : data.budgetMin
    ? `• ${lang === 'en' ? 'Minimum monthly budget' : 'Minimalny budżet miesięczny'}: ${data.budgetMin} EUR`
    : data.budgetMax
      ? `• ${lang === 'en' ? 'Maximum monthly budget' : 'Maksymalny budżet miesięczny'}: ${data.budgetMax} EUR`
      : ''
}
` : ''}

🌍 ${lang === 'en' ? 'TARGET MARKETS' : 'RYNKI DOCELOWE'}
───────────────────────────────────────────────────────────────────────────────

${data.markets.map(market => `• ${market}`).join('\n')}

${data.marketsDetails ? `
${lang === 'en' ? 'Market focus' : 'Fokus rynkowy'}:
${data.marketsDetails}
` : ''}

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
  ? `This document serves as a discussion basis. All parameters can be adjusted to meet ${data.companyName}'s specific needs and expectations.`
  : `Ten dokument stanowi bazę do dyskusji. Wszystkie parametry można dostosować do specyficznych potrzeb i oczekiwań ${data.companyName}.`
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
  try {
    const data: FormData = await request.json();
    
    // Basic validation
    if (!data.companyName) {
      return NextResponse.json(
        { error: data.languageMode === 'en' ? 'Company name is required' : 'Nazwa firmy jest wymagana' },
        { status: 400 }
      );
    }

    if (!data.contactPerson) {
      return NextResponse.json(
        { error: data.languageMode === 'en' ? 'Contact person is required' : 'Osoba kontaktowa jest wymagana' },
        { status: 400 }
      );
    }

    if (!data.contactEmail) {
      return NextResponse.json(
        { error: data.languageMode === 'en' ? 'Contact email is required' : 'Email kontaktowy jest wymagany' },
        { status: 400 }
      );
    }

    const summary = await generateCooperationProposal(data);
    
    // Handle email sending if requested
    let emailSent = false;
    let emailMessage = 'Email not sent - feature not configured';

    if (data.sendEmail) {
      // Implement email sending here (Resend API integration)
      const targetEmail = data.emailToSend || data.contactEmail;
      emailMessage = data.languageMode === 'en'
        ? `Email sending to ${targetEmail} - feature to be implemented`
        : `Wysyłanie emaila na ${targetEmail} - funkcja do zaimplementowania`;
    }
    
    return NextResponse.json({
      summary,
      emailSent,
      emailMessage: data.sendEmail ? emailMessage : undefined
    });
  } catch (error) {
    console.error('Error generating proposal:', error);
    return NextResponse.json(
      { error: data?.languageMode === 'en' ? 'Error generating proposal' : 'Błąd podczas generowania propozycji' },
      { status: 500 }
    );
  }
}