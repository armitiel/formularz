export interface Translation {
  // Basic interface
  companyName: string;
  contactPerson: string;
  contactRole: string;
  contactEmail: string;
  backToIntro: string;
  interactiveGenerator: string;
  collaborationProgram: string;
  fillSectionsDescription: string;
  offerConfiguration: string;
  sectionsDescription: string;
  sharedVision: string;

  // Section headers
  section1Title: string;
  section1Description: string;
  section2Title: string;
  section2Description: string;
  section3Title: string;
  section3Description: string;
  section4Title: string;
  section4Description: string;
  
  // Step indicators
  section1Of4: string;
  section2Of4: string;
  section3Of4: string;
  section4Of4: string;

  // Areas of cooperation
  areaA: string;
  areaB: string;
  areaC: string;
  areaD: string;
  areaE: string;
  areaF: string;
  areaG: string;
  areaH: string;

  // Area A options
  areaAOptions: string[];
  
  // Area B options
  areaBOptions: string[];
  
  // Area C options
  areaCOptions: string[];
  
  // Area D options
  areaDOptions: string[];
  
  // Area E options
  areaEOptions: string[];
  
  // Area F options
  areaFOptions: string[];
  
  // Area G options
  areaGOptions: string[];
  
  // Area H options
  areaHOptions: string[];

  // Section 2 subsections
  preferredCooperationModel: string;
  cooperationModelOptions: string[];
  
  billingForm: string;
  billingFormOptions: string[];
  
  engagementScope: string;
  engagementScopeOptions: string[];
  
  teamIntegrationLevel: string;
  teamIntegrationOptions: string[];
  
  additionalPreferences: string;
  additionalPreferencesOptions: string[];

  // Scenarios
  scenarios: Array<{
    title: string;
    description: string;
  }>;

  // Final section
  additionalNotes: string;
  additionalNotesPlaceholder: string;
  finalProposalLanguage: string;
  polishLanguage: string;
  polishAndEnglish: string;
  sendByEmail: string;
  additionalEmail: string;
  additionalEmailPlaceholder: string;
  
  // Buttons and actions
  generateFinalHybrid: string;
  generating: string;
  downloadAgain: string;
  close: string;
  
  // Modal
  modalTitle: string;
  modalSubtitle: string;
  downloadConfirmation: string;
  
  // Common
  weAreOpen: string;
}

export const translations: Record<'pl' | 'en', Translation> = {
  pl: {
    // Basic interface
    companyName: "Nazwa firmy / marki *",
    contactPerson: "Osoba kontaktowa *",
    contactRole: "Stanowisko",
    contactEmail: "E-mail *",
    backToIntro: "← Powrót do wprowadzenia",
    interactiveGenerator: "Interaktywny generator propozycji współpracy",
    collaborationProgram: "Program współpracy – kreatywno-strategiczny partner",
    fillSectionsDescription: "Wypełnij kilka sekcji, a system automatycznie wygeneruje gotowy tekst oferty oraz pobierze plik PDF, który możesz od razu dołączyć do maila lub prezentacji – bez ręcznego kopiowania.",
    offerConfiguration: "Konfiguracja oferty",
    sectionsDescription: "Sekcje formularza odpowiadają elementom planu współpracy z Diasen.",
    sharedVision: "Ty + Diasen / wspólna wizja",

    // Section headers
    section1Title: "SEKCJA 1 — Wybór obszarów współpracy",
    section1Description: "Proszę zaznaczyć obszary współpracy, które są dla Państwa interesujące.",
    section2Title: "SEKCJA 2 — Model współpracy i zaangażowania",
    section2Description: "Proszę wybrać preferowany sposób współpracy i formę rozliczeń.",
    section3Title: "SEKCJA 3 — Proponowane scenariusze współpracy",
    section3Description: "Można wybrać jedną lub kilka opcji. Finalna oferta będzie hybrydą wybranych elementów.",
    section4Title: "SEKCJA 4 — Podsumowanie",
    section4Description: "Opcje dodatkowe i generowanie finalnej propozycji współpracy.",
    
    // Step indicators
    section1Of4: "Sekcja 1/4",
    section2Of4: "Sekcja 2/4",
    section3Of4: "Sekcja 3/4",
    section4Of4: "Sekcja 4/4",

    // Areas of cooperation
    areaA: "A. Wizualna prezentacja marki Diasen Polska",
    areaB: "B. Ambasadorskie działania kreatywne",
    areaC: "C. Murale i realizacje artystyczne",
    areaD: "D. Działania ekspozycyjne, eventowe i edukacyjne",
    areaE: "E. Rozszerzona współpraca biznesowa",
    areaF: "F. Materiały edukacyjne i świadomościowe (dla szerokiej publiczności w Polsce)",
    areaG: "G. Social Media — Kreacja, Strategia i Prowadzenie (Diasen Polska)",
    areaH: "H. Utworzenie lub współtworzenie działu marketingowego Diasen Polska",

    // Area A options
    areaAOptions: [
      "Ekskluzywne materiały marketingowe z realizacji (foto / wideo)",
      "Dokumentacja projektów w stylu editorial",
      "Kreacja kampanii wizerunkowych i treści do social media",
      "Tworzenie materiałów dla Diasen Polska",
      "Prezentacje produktów w realnych polskich projektach",
      "Jesteśmy otwarci na współpracę w tym obszarze"
    ],
    
    // Area B options  
    areaBOptions: [
      "Rola Ambasadora Marki Diasen Polska",
      "Niezależna kreacja materiałów marketingowych",
      "Współpraca z działem marketingu Diasen Polska",
      "Budowanie narracji wizualnej (brand storytelling)",
      "Kampanie łączące technologię Diasen z moimi projektami",
      "Jesteśmy otwarci"
    ],
    
    // Area C options
    areaCOptions: [
      "Ekskluzywne murale wewnętrzne",
      "Ekskluzywne murale elewacyjne",
      "Murale na expo, targach i wydarzeniach",
      "Unikalne ekspozycje w przestrzeni publicznej",
      "Jesteśmy otwarci"
    ],
    
    // Area D options
    areaDOptions: [
      "Udział w polskich targach, expo i showroomach",
      "Instalacje wizualne na wydarzenia branżowe",
      "Szkolenia dla architektów, wykonawców i deweloperów",
      "Webinary / live'y dla odbiorców w Polsce",
      "Eventy tematyczne z udziałem twórców",
      "Jesteśmy otwarci"
    ],
    
    // Area E options
    areaEOptions: [
      "Współpraca jako niezależny partner",
      "Stała współpraca jako konsultant kreatywny",
      "Kampanie kwartalne / półroczne",
      "Prezentacje produktów Diasen u deweloperów",
      "Doradztwo kreatywne dla klientów",
      "Jesteśmy otwarci"
    ],
    
    // Area F options
    areaFOptions: [
      "Kampanie o akustyce mieszkań",
      "Materiały o zdrowych wnętrzach i mikroklimacie",
      "Treści storytellingowe dla zwykłych odbiorców",
      "Serie edukacyjne: reelsy, grafiki, krótkie filmy",
      "Porównania produktów Diasen z typowymi materiałami",
      "Kampanie dla nowych mieszkań i rodzin",
      "Ogólnokrajowa akcja ulotkowa z próbką farby",
      "Ulotki edukacyjne o korku (zdrowie, akustyka, mikroklimat)",
      "Dystrybucja na osiedlach, showroomach, w sklepach",
      "Ulotki z QR kodami (filmy, poradniki, galerie)",
      "Ogólnokrajowa kampania informacyjna",
      "Jesteśmy otwarci"
    ],
    
    // Area G options
    areaGOptions: [
      "Prowadzenie oficjalnych profili Diasen Polska",
      "Współprowadzenie SM z działem marketingu",
      "Produkcja treści premium: foto, wideo, reels",
      "Budowa spójnej estetyki SM",
      "Serie edukacyjne pod social media",
      "Strategia komunikacji na polski rynek",
      "Wsparcie podczas eventów i targów",
      "Jesteśmy otwarci"
    ],
    
    // Area H options
    areaHOptions: [
      "Stworzenie od podstaw działu marketingu Diasen Polska",
      "Współtworzenie działu jako lider kreatywny",
      "Udział jako konsultant lub współprowadzący",
      "Opracowanie pełnej strategii wizerunku na rynek PL",
      "Wsparcie przy kampaniach i działaniach marketingowych",
      "Budowa polskiego brand booka Diasen",
      "Rekrutacja lub selekcja współpracowników",
      "Jesteśmy otwarci"
    ],

    // Section 2 subsections
    preferredCooperationModel: "1. Preferowany model współpracy",
    cooperationModelOptions: [
      "Projektowy (per projekt)",
      "Stały (miesięczny / retainer)",
      "Okresowy (kwartał / pół roku)",
      "Mieszany (stała część + projekty)",
      "Jesteśmy otwarci"
    ],
    
    billingForm: "2. Forma rozliczeń",
    billingFormOptions: [
      "Miesięczna",
      "Kwartalna", 
      "Półroczna",
      "Jednorazowa (per kampania)",
      "Jesteśmy otwarci"
    ],
    
    engagementScope: "3. Zakres zaangażowania",
    engagementScopeOptions: [
      "Dostępność projektowa (ad-hoc)",
      "Stała dostępność (określony wymiar godzin)",
      "Intensywna praca w czasie kampanii",
      "Doradztwo kreatywne",
      "Jesteśmy otwarci"
    ],
    
    teamIntegrationLevel: "4. Poziom integracji z zespołem",
    teamIntegrationOptions: [
      "Praca niezależna",
      "Praca we współpracy z działem marketingu",
      "Wspólne działania przy projektach",
      "Jesteśmy otwarci"
    ],
    
    additionalPreferences: "5. Preferencje dodatkowe",
    additionalPreferencesOptions: [
      "Raporty z działań",
      "Spójna linia kreatywna",
      "Budowanie społeczności (architekci, wykonawcy)",
      "Jesteśmy otwarci"
    ],

    // Scenarios
    scenarios: [
      {
        title: "SCENARIUSZ 1 — Marketingowo-Ambasadorski",
        description: "Stała produkcja treści foto/wideo • Kampanie wizerunkowe • Rola ambasadora • Dokumentacja projektów • Storytelling marki"
      },
      {
        title: "SCENARIUSZ 2 — Artystyczno-Eventowy", 
        description: "Murale wewnętrzne i fasadowe • Murale na wydarzeniach • Instalacje • Rozliczenia projektowe"
      },
      {
        title: "SCENARIUSZ 3 — Hybryda Kreatywno-Marketingowa",
        description: "Art + marketing • Prowadzenie social media • Treści premium • Storytelling • Elastyczne rozliczenia"
      },
      {
        title: "SCENARIUSZ 4 — Rozwój Regionalny i Edukacja",
        description: "Szkolenia dla architektów • Budowanie społeczności • Prezentacje dla deweloperów"
      },
      {
        title: "SCENARIUSZ 5 — Minimalny Start (Light)",
        description: "Pojedyncze projekty/kampanie • Możliwość rozszerzenia współpracy"
      },
      {
        title: "SCENARIUSZ 6 — Ogólnokrajowa Kampania Edukacyjna",
        description: "Akcja ulotkowa z próbkami farb • Edukacja o akustyce • Dystrybucja • Materiały edukacyjne"
      },
      {
        title: "SCENARIUSZ 7 — Kampanie Świadomościowe",
        description: "Serie edukacyjne • Analiza problemów mieszkań • Edukacja dla odbiorców"
      },
      {
        title: "SCENARIUSZ 8 — Utworzenie Działu Marketingu",
        description: "Stworzenie działu od zera • Kierunek kreatywny • Brand book PL • Rekrutacja"
      }
    ],

    // Final section
    additionalNotes: "Dodatkowe uwagi lub komentarze",
    additionalNotesPlaceholder: "np. preferencje dotyczące terminów, specjalne wymagania, dodatkowy kontekst",
    finalProposalLanguage: "Język finalnej propozycji",
    polishLanguage: "Polski",
    polishAndEnglish: "Polski + angielski",
    sendByEmail: "Wyślij propozycję emailem",
    additionalEmail: "Dodatkowy adres email (opcjonalnie)",
    additionalEmailPlaceholder: "np. dyrektor@diasen.pl",
    
    // Buttons and actions
    generateFinalHybrid: "Wygeneruj ofertę",
    generating: "Generuję ofertę...",
    downloadAgain: "Pobierz ponownie",
    close: "Zamknij",
    
    // Modal
    modalTitle: "Propozycja Współpracy",
    modalSubtitle: "Wygenerowana propozycja została automatycznie pobrana jako plik PDF",
    downloadConfirmation: "Propozycja została automatycznie pobrana jako plik tekstowy",
    
    // Common
    weAreOpen: "Jesteśmy otwarci"
  },
  
  en: {
    // Basic interface
    companyName: "Company / Brand name *",
    contactPerson: "Contact person *", 
    contactRole: "Position / Role",
    contactEmail: "Email *",
    backToIntro: "← Back to Introduction",
    interactiveGenerator: "Interactive collaboration proposal generator",
    collaborationProgram: "Collaboration Program – Creative-Strategic Partner",
    fillSectionsDescription: "Fill out a few sections and the system will automatically generate a ready proposal text and download a PDF file that you can immediately attach to an email or presentation.",
    offerConfiguration: "Offer Configuration",
    sectionsDescription: "Form sections correspond to collaboration plan elements with Diasen.",
    sharedVision: "You + Diasen / shared vision",

    // Section headers
    section1Title: "SECTION 1 — Areas of Cooperation Selection",
    section1Description: "Please select areas of cooperation that are interesting to you.",
    section2Title: "SECTION 2 — Cooperation Model and Engagement",
    section2Description: "Please select your preferred cooperation method and billing form.",
    section3Title: "SECTION 3 — Proposed Cooperation Scenarios",
    section3Description: "You can select one or several options. The final offer will be a hybrid of selected elements.",
    section4Title: "SECTION 4 — Summary of the offer",
    section4Description: "Additional options and generation of final cooperation proposal.",
    
    // Step indicators
    section1Of4: "Section 1/4",
    section2Of4: "Section 2/4", 
    section3Of4: "Section 3/4",
    section4Of4: "Section 4/4",

    // Areas of cooperation
    areaA: "A. Visual Brand Presentation - Diasen Poland",
    areaB: "B. Creative Ambassador Activities",
    areaC: "C. Murals and Artistic Realizations",
    areaD: "D. Exhibition, Event and Educational Activities",
    areaE: "E. Extended Business Cooperation",
    areaF: "F. Educational and Awareness Materials (for general public in Poland)",
    areaG: "G. Social Media — Creation, Strategy and Management (Diasen Poland)",
    areaH: "H. Creation or Co-creation of Diasen Poland Marketing Department",

    // Area A options
    areaAOptions: [
      "Exclusive marketing materials from realizations (photo / video)",
      "Project documentation in editorial style",
      "Creation of brand campaigns and social media content",
      "Creating materials for Diasen Poland",
      "Product presentations in real Polish projects",
      "We are open to cooperation in this area"
    ],
    
    // Area B options
    areaBOptions: [
      "Role of Diasen Poland Brand Ambassador",
      "Independent creation of marketing materials",
      "Cooperation with Diasen Poland marketing department",
      "Building visual narrative (brand storytelling)",
      "Campaigns connecting Diasen technology with my projects",
      "We are open"
    ],
    
    // Area C options
    areaCOptions: [
      "Exclusive interior murals",
      "Exclusive facade murals", 
      "Murals at expo, fairs and events",
      "Unique exhibitions in public space",
      "We are open"
    ],
    
    // Area D options
    areaDOptions: [
      "Participation in Polish fairs, expo and showrooms",
      "Visual installations for industry events",
      "Training for architects, contractors and developers",
      "Webinars / lives for recipients in Poland",
      "Thematic events with creators participation",
      "We are open"
    ],
    
    // Area E options
    areaEOptions: [
      "Cooperation as independent partner",
      "Permanent cooperation as creative consultant",
      "Quarterly / semi-annual campaigns",
      "Diasen product presentations to developers",
      "Creative consulting for clients",
      "We are open"
    ],
    
    // Area F options
    areaFOptions: [
      "Campaigns about apartment acoustics",
      "Materials about healthy interiors and microclimate",
      "Storytelling content for ordinary recipients",
      "Educational series: reels, graphics, short films",
      "Comparisons of Diasen products with typical materials",
      "Campaigns for new apartments and families",
      "Nationwide leaflet campaign with paint sample",
      "Educational leaflets about cork (health, acoustics, microclimate)",
      "Distribution in housing estates, showrooms, stores",
      "Leaflets with QR codes (videos, guides, galleries)",
      "Nationwide information campaign",
      "We are open"
    ],
    
    // Area G options
    areaGOptions: [
      "Managing official Diasen Poland profiles",
      "Co-managing SM with marketing department",
      "Premium content production: photo, video, reels",
      "Building coherent SM aesthetics",
      "Educational series for social media",
      "Communication strategy for Polish market",
      "Support during events and fairs",
      "We are open"
    ],
    
    // Area H options
    areaHOptions: [
      "Creating Diasen Poland marketing department from scratch",
      "Co-creating department as creative leader",
      "Participation as consultant or co-manager",
      "Developing full brand strategy for PL market",
      "Support with campaigns and marketing activities",
      "Building Polish Diasen brand book",
      "Recruitment or selection of collaborators",
      "We are open"
    ],

    // Section 2 subsections
    preferredCooperationModel: "1. Preferred cooperation model",
    cooperationModelOptions: [
      "Project-based (per project)",
      "Permanent (monthly / retainer)",
      "Periodic (quarter / half year)",
      "Mixed (fixed part + projects)",
      "We are open"
    ],
    
    billingForm: "2. Billing form",  
    billingFormOptions: [
      "Monthly",
      "Quarterly",
      "Semi-annual",
      "One-time (per campaign)",
      "We are open"
    ],
    
    engagementScope: "3. Engagement scope",
    engagementScopeOptions: [
      "Project availability (ad-hoc)",
      "Permanent availability (specified hours)",
      "Intensive work during campaigns",
      "Creative consulting",
      "We are open"
    ],
    
    teamIntegrationLevel: "4. Team integration level",
    teamIntegrationOptions: [
      "Independent work",
      "Work in cooperation with marketing department", 
      "Joint activities on projects",
      "We are open"
    ],
    
    additionalPreferences: "5. Additional preferences",
    additionalPreferencesOptions: [
      "Activity reports",
      "Consistent creative line",
      "Community building (architects, contractors)",
      "We are open"
    ],

    // Scenarios
    scenarios: [
      {
        title: "SCENARIO 1 — Marketing-Ambassador",
        description: "Continuous photo/video content production • Brand campaigns • Ambassador role • Project documentation • Brand storytelling"
      },
      {
        title: "SCENARIO 2 — Artistic-Event",
        description: "Interior and facade murals • Event murals • Installations • Project-based billing"
      },
      {
        title: "SCENARIO 3 — Creative-Marketing Hybrid",
        description: "Art + marketing • Social media management • Premium content • Storytelling • Flexible billing"
      },
      {
        title: "SCENARIO 4 — Regional Development and Education",
        description: "Architect training • Community building • Developer presentations"
      },
      {
        title: "SCENARIO 5 — Minimal Start (Light)",
        description: "Single projects/campaigns • Possibility to expand cooperation"
      },
      {
        title: "SCENARIO 6 — Nationwide Educational Campaign",
        description: "Leaflet campaign with paint samples • Acoustics education • Distribution • Educational materials"
      },
      {
        title: "SCENARIO 7 — Awareness Campaigns", 
        description: "Educational series • Apartment problem analysis • Recipient education"
      },
      {
        title: "SCENARIO 8 — Marketing Department Creation",
        description: "Creating department from zero • Creative direction • PL brand book • Recruitment"
      }
    ],

    // Final section
    additionalNotes: "Additional comments or notes",
    additionalNotesPlaceholder: "e.g. timing preferences, special requirements, additional context",
    finalProposalLanguage: "Final proposal language",
    polishLanguage: "Polish",
    polishAndEnglish: "Polish + English",
    sendByEmail: "Send proposal by email",
    additionalEmail: "Additional email address (optional)",
    additionalEmailPlaceholder: "e.g. director@diasen.pl",
    
    // Buttons and actions
    generateFinalHybrid: "Generate Offer",
    generating: "Generating offer...",
    downloadAgain: "Download again",
    close: "Close",
    
    // Modal
    modalTitle: "Cooperation Proposal",
    modalSubtitle: "Generated proposal has been automatically downloaded as a PDF file",
    downloadConfirmation: "Proposal has been automatically downloaded as a text file",
    
    // Common
    weAreOpen: "We are open"
  }
};