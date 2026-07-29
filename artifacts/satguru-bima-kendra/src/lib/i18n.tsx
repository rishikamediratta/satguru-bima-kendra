import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('satguru-language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('satguru-language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, replacements?: Record<string, string>): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Missing translation for key: ${key}`);
        return key;
      }
      value = value[k];
    }
    
    let str = String(value);
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        str = str.replace(new RegExp(`{${k}}`, 'g'), v);
      });
    }
    return str;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translations dictionary
export const translations: Record<Language, any> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      whyChooseUs: 'Why Choose Us',
      testimonials: 'Testimonials',
      contact: 'Contact',
      callNow: 'Call Now',
    },
    common: {
      businessName: 'Satguru Bima Kendra',
      trustedAdvisor: '10+ Years of Trusted Advisory in Kanpur',
      readMore: 'Learn More',
      viewAll: 'View All Services',
    },
    seo: {
      homeTitle: 'Satguru Bima Kendra | Trusted Insurance Advisor in Kanpur',
      homeDesc: 'Expert guidance on Life, Health, Term, and Vehicle insurance in Kanpur. Contact Rishi Mediratta today.',
      aboutTitle: 'About Rishi Mediratta | Satguru Bima Kendra Kanpur',
      aboutDesc: 'Learn about Rishi Mediratta, founder of Satguru Bima Kendra, with over 10 years of experience in providing honest insurance advisory in Kanpur.',
      servicesTitle: 'Insurance Services | Satguru Bima Kendra Kanpur',
      servicesDesc: 'Comprehensive insurance solutions including Life, Health, Term, Car, and Investment plans. Expert advice tailored for you in Kanpur.',
      whyChooseUsTitle: 'Why Choose Us | Satguru Bima Kendra',
      whyChooseUsDesc: 'Discover why 500+ families in Kanpur trust Satguru Bima Kendra for transparent, reliable, and personalized insurance advice.',
      testimonialsTitle: 'Client Testimonials | Satguru Bima Kendra',
      testimonialsDesc: 'Read what our clients in Kanpur have to say about our transparent insurance advisory, quick claim settlements, and personalized service.',
      contactTitle: 'Contact Us | Satguru Bima Kendra Kanpur',
      contactDesc: 'Book a free consultation with Rishi Mediratta. Visit our office in Govind Nagar, Kanpur, or reach out via phone/WhatsApp.',
    },
    home: {
      heroTitle1: 'Protect Your Future',
      heroTitle2: 'Without The Pressure.',
      heroSubtitle: 'Satguru Bima Kendra helps Kanpur families and businesses choose the right Life, Health, and Vehicle insurance. Honest advice, premium partners, zero sales gimmicks.',
      callNow: 'Call Now : {phone}',
      whatsappUs: 'WhatsApp Us',
      bookConsultation: 'Book Consultation',
      trustedPartners: 'Trusted Insurance Partners',
      comprehensiveCoverage: 'Comprehensive Coverage',
      tailoredSolutions: 'Tailored insurance solutions to protect everything that matters to you.',
      whyKanpurTrustsUs: 'Why Kanpur Trusts Us',
      whyDesc: "Insurance shouldn't be complicated or pressured. At Satguru Bima Kendra, we believe in educating our clients first. You get personalized guidance tailored to your actual needs, not commission targets.",
      yearsExperience: 'Years Experience',
      familiesProtected: 'Families Protected',
      claimSupport: 'Claim Support',
      transparent: 'Transparent',
      readOurStory: 'Read Our Story',
      homeTestimonial: '"Rishi ji didn\'t just sell me a policy; he took the time to understand my family\'s financial position and suggested a health plan that perfectly fit our needs. His post-sale service is unmatched in Kanpur."',
      testimonialName: 'Anil Sharma',
      testimonialRole: 'Business Owner, Govind Nagar',
      faqTitle: 'Frequently Asked Questions',
      faqDesc: 'Clear answers to your common insurance queries.',
      readyTitle: 'Ready to secure your future?',
      readyDesc: 'Visit our office in Govind Nagar, or drop us a message on WhatsApp. No consultation fee, no obligations.',
      getDirections: 'Get Directions',
      chatWhatsapp: 'Chat on WhatsApp',
    },
    about: {
      title: 'Your Trusted Insurance Advisor',
      subtitle: "We don't sell policies; we build lifelong relationships based on trust, transparency, and the right financial protection.",
      founderRole: 'Founder, Satguru Bima Kendra',
      experience: 'Experience',
      p1: "For over a decade, I have been serving the people of Kanpur as a dedicated financial and insurance advisor. My journey started with a simple realization: insurance in India is often sold through fear or complex jargon. I wanted to change that.",
      p2: "At Satguru Bima Kendra, my approach is educational. I believe that an informed client makes the best decisions for their family's future. Whether you are a young professional buying your first term plan, a parent planning for your child's education, or a senior citizen looking for health coverage, I sit with you to understand your specific life context before recommending a single product.",
      bullet1: "Unbiased, transparent advice",
      bullet2: "Customer-first approach",
      bullet3: "Expertise across multiple domains",
      bullet4: "End-to-end claim assistance",
      missionTitle: 'Our Mission',
      missionDesc: "To simplify insurance for the common man by providing clear, honest, and need-based financial advisory. We strive to ensure that every family in Kanpur has the right safety net against life's uncertainties, without feeling burdened by unnecessary premiums.",
      visionTitle: 'Our Vision',
      visionDesc: "To be Kanpur's most trusted, customer-centric insurance advisory firm, recognized not for the volume of policies we sell, but for the number of families whose futures we have successfully secured.",
    },
    servicesPage: {
      title: 'Our Services',
      subtitle: 'Comprehensive financial protection plans from India\'s top insurers, customized entirely around your life stage and goals.',
      keyBenefits: 'Key Benefits',
      idealFor: 'Ideal for:',
      enquireNow: 'Enquire Now',
    },
    services: {
      life: {
        title: "Life Insurance",
        desc: "Secure your family's future with comprehensive life cover tailored to your specific needs.",
        benefits: ["Financial security for dependents", "Tax benefits under Sec 80C", "Flexible premium payments", "Wealth creation options"],
        idealFor: "Families, Primary Breadwinners"
      },
      health: {
        title: "Health Insurance",
        desc: "Quality medical care without the financial burden. Cover hospital bills, surgeries, and treatments.",
        benefits: ["Cashless treatments across network hospitals", "Pre & post hospitalization cover", "Annual health checkups", "No claim bonus"],
        idealFor: "Everyone, especially families & seniors"
      },
      term: {
        title: "Term Insurance",
        desc: "High coverage at low premiums to ensure your family's lifestyle remains unaffected in your absence.",
        benefits: ["High life cover at affordable rates", "Critical illness riders available", "Coverage up to 99 years of age", "Tax benefits"],
        idealFor: "Working Professionals, Young Parents"
      },
      child: {
        title: "Child Plans",
        desc: "Build a corpus for your child's higher education and marriage, ensuring their dreams never wait.",
        benefits: ["Guaranteed payouts at milestones", "Premium waiver on parent's demise", "Dual benefit of investment & insurance", "Partial withdrawals allowed"],
        idealFor: "Parents with young children"
      },
      retirement: {
        title: "Retirement Plans",
        desc: "Plan your golden years with a steady stream of income and financial independence after retirement.",
        benefits: ["Regular pension/annuity", "Lump sum withdrawal on maturity", "Protection against inflation", "Spouse pension continuation"],
        idealFor: "Professionals aged 30-50"
      },
      investment: {
        title: "Investment Plans",
        desc: "Grow your wealth steadily with market-linked or guaranteed return plans customized for your goals.",
        benefits: ["Wealth accumulation", "Guaranteed return options", "Market-linked ULIPs", "Liquidity options"],
        idealFor: "Wealth Creators, Business Owners"
      },
      car: {
        title: "Car Insurance",
        desc: "Comprehensive protection against accidents, theft, natural disasters, and third-party liabilities.",
        benefits: ["Cashless claim settlements", "Zero depreciation cover", "24x7 roadside assistance", "Engine protection riders"],
        idealFor: "Car Owners"
      },
      bike: {
        title: "Bike Insurance",
        desc: "Keep your two-wheeler legally compliant and protected against on-road and off-road risks.",
        benefits: ["Mandatory third-party cover", "Own damage protection", "Personal accident cover", "Quick policy issuance"],
        idealFor: "Two-Wheeler Owners"
      },
      travel: {
        title: "Travel Insurance",
        desc: "Travel the world with peace of mind. Coverage for medical emergencies, flight delays, and lost baggage.",
        benefits: ["Overseas medical expenses", "Trip cancellation/delay cover", "Loss of passport/baggage", "24x7 global assistance"],
        idealFor: "Frequent Travelers, Tourists"
      },
      property: {
        title: "Property Insurance",
        desc: "Protect your residential, commercial, or rental property against fire, theft, natural calamities, and unforeseen damages.",
        benefits: [
          "Coverage against fire & natural disasters",
          "Protection from burglary & theft",
          "Building and contents cover",
          "Quick & hassle-free claim assistance"
        ],
        idealFor: "Homeowners, Landlords, Business Owners"
      },

      event: {
        title: "Event Insurance",
        desc: "Safeguard your special events from unexpected cancellations, liabilities, accidents, and financial losses.",
        benefits: [
          "Event cancellation & postponement cover",
          "Public liability protection",
          "Coverage for equipment & venue damage",
          "Financial protection against unforeseen risks"
        ],
        idealFor: "Wedding Planners, Corporates, Event Organizers"
      }
    },
    whyChooseUsPage: {
      title: 'Why Choose Us',
      subtitle: 'Insurance is a lifelong commitment. Here is why Kanpur trusts us to be their financial safety partner.',
      r1Title: "10+ Years Experience",
      r1Desc: "A decade of deep market knowledge ensures you get advice that stands the test of time, not just current trends.",
      r2Title: "Trusted Partners",
      r2Desc: "We work only with India's most reliable insurers like Tata AIG and Niva Bupa to guarantee secure coverage.",
      r3Title: "Transparent Advice",
      r3Desc: "No hidden clauses. We explain the terms, exclusions, and fine print clearly before you sign anything.",
      r4Title: "Quick Claim Assistance",
      r4Desc: "When emergencies strike, we handle the paperwork. Our end-to-end claim support means you focus on what matters.",
      r5Title: "Affordable Solutions",
      r5Desc: "We analyze multiple plans to find the optimal balance between high coverage and affordable premiums for your budget.",
      r6Title: "Personalized Guidance",
      r6Desc: "No one-size-fits-all pitches. Your family structure, income, and goals dictate the policy we recommend.",
      r7Title: "Easy EMI Available",
      r7Desc: "Get the protection you need today with convenient EMI options that make premium payments easier to manage.",
      r8Title: "Customizable Plans",
      r8Desc: "Choose flexible coverage and benefits that can be tailored to your needs, goals, and budget."
    },
    testimonialsPage: {
      title: 'Client Stories',
      subtitle: "Our biggest achievement is the trust we've built. Here is what families and businesses in Kanpur have to say.",
      note: "* These testimonials represent typical client experiences. Note for admin: Real photos can be added here later.",
      t1Role: "Business Owner",
      t1Quote: "I was confused about which term plan to buy. Rishi guided me through the entire process patiently. He didn't push expensive plans, just what was necessary for my family. Highly recommend his services.",
      t2Role: "School Teacher",
      t2Quote: "During my husband's hospitalization, Satguru Bima Kendra proved their worth. While I was stressed at the hospital, Rishi handled the cashless claim process seamlessly with Niva Bupa. A true lifesaver.",
      t3Role: "IT Professional",
      t3Quote: "Upgraded my health insurance here. The level of transparency is rare to find. All exclusions were explained upfront. I feel much more secure about my family's medical cover now.",
      t4Role: "Retired Bank Manager",
      t4Quote: "Finding good health cover for senior citizens is tough. Rishi ji arranged a solid plan for me and my wife with no hidden clauses. His after-sales service is excellent.",
      t5Role: "Entrepreneur",
      t5Quote: "Bought my first car insurance through them. Not only were the premiums better than what the showroom offered, but they also guided me on zero-dep clauses.",
      t6Role: "Doctor",
      t6Quote: "Have been a client for 5 years. Whether it's renewing a bike policy or planning for my child's future, Satguru Bima Kendra is my single point of contact for all insurance needs."
    },
    faq: {
      q1: "Why do I need insurance?",
      a1: "Insurance provides a financial safety net for you and your family during unexpected life events—be it medical emergencies, accidents, or untoward incidents. It ensures your savings aren't wiped out when you need them most.",
      q2: "Which insurance policy is best for me?",
      a2: "The 'best' policy depends entirely on your life stage, dependents, income, and liabilities. A young professional needs term insurance, a family needs robust health cover, and wealth creators might look at investment plans. We provide custom consultations to figure this out with you.",
      q3: "Will you assist with claim settlements?",
      a3: "Yes. Our job doesn't end with selling a policy. We provide end-to-end assistance during the claim process, guiding you on documentation and liaising with the insurance company to ensure smooth settlement.",
      q4: "Can I compare plans before buying?",
      a4: "Absolutely. Transparency is our core value. We represent multiple premium partners (Tata AIG, Niva Bupa, etc.) and will provide comparative quotes so you can make an informed decision.",
      q5: "How long does policy approval take?",
      a5: "Most standard policies (like auto or basic health) are issued instantly or within 24 hours. Term life insurance involving medical check-ups might take 3-7 working days depending on the provider."
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Ready to secure your future? Drop us a message, give us a call, or visit our office in Govind Nagar.',
      contactInfo: 'Contact Information',
      contactInfoDesc: 'We are here to help you make informed decisions.',
      officeAddress: 'Office Address',
      getDirections: 'Get Directions',
      phoneWhatsapp: 'Phone & WhatsApp',
      callNow: 'Call Now',
      whatsapp: 'WhatsApp',
      emailAddress: 'Email Address',
      officeHours: 'Office Hours',
      hoursEveryday: 'Everyday: {hours}',
      sendMessage: 'Send us a message',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      emailOptional: 'Email Address (Optional)',
      yourMessage: 'Your Message',
      sendBtn: 'Send Message',
      sendingBtn: 'Sending...',
      namePlaceholder: 'John Doe',
      phonePlaceholder: '+91 98765 43210',
      emailPlaceholder: 'john@example.com',
      messagePlaceholder: 'I would like to know more about health insurance options...',
      sentTitle: "Message Sent!",
      sentDesc: "We will get back to you shortly.",
      errorTitle: "Something went wrong.",
      errorDesc: "Please try calling or WhatsApping us directly.",
    },
    footer: {
      desc: 'Trusted insurance advisory in Kanpur offering expert guidance on Life, Health, Term, and Vehicle cover. Zero sales pressure, complete transparency.',
      quickLinks: 'Quick Links',
      aboutRishi: 'About Rishi Mediratta',
      insuranceServices: 'Insurance Services',
      clientTestimonials: 'Client Testimonials',
      contactUs: 'Contact Us',
      topServices: 'Top Services',
      contactInfo: 'Contact Info',
      rights: '© {year} Satguru Bima Kendra. All rights reserved.',
      trustedSince: 'Trusted advisor in Kanpur since {year}',
    },
    notFound: {
      title: '404 Page Not Found',
      desc: 'Did you forget to add the page to the router?',
    },
    whatsapp: {
      defaultMsg: 'Hi Rishi, I would like to know more about your insurance services.',
      consultationMsg: 'Hi Rishi, I would like to book a consultation regarding insurance.',
      enquiryMsg: 'Hi Rishi, I would like to enquire about {service}.',
    }
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      services: 'सेवाएं',
      whyChooseUs: 'हमें क्यों चुनें',
      testimonials: 'ग्राहक अनुभव',
      contact: 'संपर्क करें',
      callNow: 'कॉल करें',
    },
    common: {
      businessName: 'सद्गुरु बीमा केंद्र',
      trustedAdvisor: 'कानपुर में 10+ वर्षों का विश्वसनीय बीमा मार्गदर्शन',
      readMore: 'और जानें',
      viewAll: 'सभी सेवाएं देखें',
    },
    seo: {
      homeTitle: 'सद्गुरु बीमा केंद्र | कानपुर में विश्वसनीय बीमा सलाहकार',
      homeDesc: 'कानपुर में जीवन, स्वास्थ्य, टर्म और वाहन बीमा पर विशेषज्ञ मार्गदर्शन। आज ही ऋषि मेंदीरत्ता से संपर्क करें।',
      aboutTitle: 'ऋषि मेंदीरत्ता के बारे में | सद्गुरु बीमा केंद्र कानपुर',
      aboutDesc: 'सद्गुरु बीमा केंद्र के संस्थापक ऋषि मेंदीरत्ता के बारे में जानें, जिन्हें कानपुर में ईमानदार बीमा सलाहकार के रूप में 10 से अधिक वर्षों का अनुभव है।',
      servicesTitle: 'बीमा सेवाएं | सद्गुरु बीमा केंद्र कानपुर',
      servicesDesc: 'जीवन, स्वास्थ्य, टर्म, कार और निवेश योजनाओं सहित संपूर्ण बीमा समाधान। कानपुर में आपके लिए विशेष विशेषज्ञ सलाह।',
      whyChooseUsTitle: 'हमें क्यों चुनें | सद्गुरु बीमा केंद्र',
      whyChooseUsDesc: 'जानें कि कानपुर में 500+ परिवार पारदर्शी, विश्वसनीय और व्यक्तिगत बीमा सलाह के लिए सद्गुरु बीमा केंद्र पर भरोसा क्यों करते हैं।',
      testimonialsTitle: 'ग्राहक अनुभव | सद्गुरु बीमा केंद्र',
      testimonialsDesc: 'कानपुर में हमारे ग्राहकों से हमारी पारदर्शी बीमा सलाह, त्वरित क्लेम सेटलमेंट और व्यक्तिगत सेवा के बारे में जानें।',
      contactTitle: 'संपर्क करें | सद्गुरु बीमा केंद्र कानपुर',
      contactDesc: 'ऋषि मेंदीरत्ता के साथ मुफ़्त परामर्श बुक करें। कानपुर के गोविंद नगर स्थित हमारे कार्यालय में आएं या फोन/व्हाट्सएप के माध्यम से संपर्क करें।',
    },
    home: {
      heroTitle1: 'अपना भविष्य सुरक्षित करें',
      heroTitle2: 'बिना किसी दबाव के।',
      heroSubtitle: 'सद्गुरु बीमा केंद्र कानपुर के परिवारों और व्यवसायों को सही जीवन, स्वास्थ्य और वाहन बीमा चुनने में मदद करता है। ईमानदार सलाह, प्रीमियम पार्टनर्स, और कोई बिक्री हथकंडे नहीं।',
      callNow: 'अभी कॉल करें : {phone}',
      whatsappUs: 'व्हाट्सएप करें',
      bookConsultation: 'परामर्श बुक करें',
      trustedPartners: 'विश्वसनीय बीमा पार्टनर्स',
      comprehensiveCoverage: 'संपूर्ण कवरेज',
      tailoredSolutions: 'आपके लिए महत्वपूर्ण हर चीज़ की सुरक्षा के लिए विशेष बीमा समाधान।',
      whyKanpurTrustsUs: 'कानपुर हम पर भरोसा क्यों करता है',
      whyDesc: "बीमा जटिल या दबावपूर्ण नहीं होना चाहिए। सद्गुरु बीमा केंद्र में, हम पहले अपने ग्राहकों को शिक्षित करने में विश्वास करते हैं। आपको अपनी वास्तविक ज़रूरतों के अनुसार व्यक्तिगत मार्गदर्शन मिलता है, न कि कमीशन के लक्ष्यों के अनुसार।",
      yearsExperience: 'वर्षों का अनुभव',
      familiesProtected: 'सुरक्षित परिवार',
      claimSupport: 'क्लेम सपोर्ट',
      transparent: 'पारदर्शी सेवा',
      readOurStory: 'हमारी कहानी पढ़ें',
      homeTestimonial: '"ऋषि जी ने मुझे केवल एक पॉलिसी नहीं बेची; उन्होंने मेरे परिवार की वित्तीय स्थिति को समझने के लिए समय निकाला और एक ऐसी स्वास्थ्य योजना का सुझाव दिया जो हमारी ज़रूरतों के लिए बिल्कुल सही थी। बिक्री के बाद उनकी सेवा कानपुर में बेजोड़ है।"',
      testimonialName: 'अनिल शर्मा',
      testimonialRole: 'व्यवसायी, गोविंद नगर',
      faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
      faqDesc: 'आपके सामान्य बीमा प्रश्नों के स्पष्ट उत्तर।',
      readyTitle: 'क्या आप अपना भविष्य सुरक्षित करने के लिए तैयार हैं?',
      readyDesc: 'गोविंद नगर स्थित हमारे कार्यालय आएं, या व्हाट्सएप पर संदेश भेजें। कोई परामर्श शुल्क नहीं, कोई बाध्यता नहीं।',
      getDirections: 'रास्ता देखें',
      chatWhatsapp: 'व्हाट्सएप पर चैट करें',
    },
    about: {
      title: 'आपके विश्वसनीय बीमा सलाहकार',
      subtitle: "हम पॉलिसियां नहीं बेचते; हम विश्वास, पारदर्शिता और सही वित्तीय सुरक्षा के आधार पर जीवन भर के रिश्ते बनाते हैं।",
      founderRole: 'संस्थापक, सद्गुरु बीमा केंद्र',
      experience: 'अनुभव',
      p1: "एक दशक से अधिक समय से, मैं कानपुर के लोगों को एक समर्पित वित्तीय और बीमा सलाहकार के रूप में सेवा दे रहा हूं। मेरी यात्रा एक साधारण अहसास के साथ शुरू हुई: भारत में बीमा अक्सर डर या जटिल शब्दों के माध्यम से बेचा जाता है। मैं इसे बदलना चाहता था।",
      p2: "सद्गुरु बीमा केंद्र में, मेरा दृष्टिकोण शैक्षिक है। मेरा मानना है कि एक सूचित ग्राहक अपने परिवार के भविष्य के लिए सबसे अच्छे निर्णय लेता है। चाहे आप एक युवा पेशेवर हों जो अपना पहला टर्म प्लान खरीद रहे हों, एक माता-पिता हों जो अपने बच्चे की शिक्षा की योजना बना रहे हों, या एक वरिष्ठ नागरिक हों जो स्वास्थ्य कवरेज की तलाश में हों, मैं किसी भी उत्पाद की सिफारिश करने से पहले आपकी विशिष्ट जीवन स्थिति को समझने के लिए आपके साथ बैठता हूं।",
      bullet1: "निष्पक्ष, पारदर्शी सलाह",
      bullet2: "ग्राहक-प्रथम दृष्टिकोण",
      bullet3: "कई डोमेन में विशेषज्ञता",
      bullet4: "शुरू से अंत तक क्लेम सहायता",
      missionTitle: 'हमारा मिशन',
      missionDesc: "स्पष्ट, ईमानदार और आवश्यकता-आधारित वित्तीय सलाह प्रदान करके आम आदमी के लिए बीमा को सरल बनाना। हम यह सुनिश्चित करने का प्रयास करते हैं कि कानपुर के हर परिवार के पास जीवन की अनिश्चितताओं के खिलाफ सही सुरक्षा जाल हो, बिना अनावश्यक प्रीमियम के बोझ के।",
      visionTitle: 'हमारा विज़न',
      visionDesc: "कानपुर की सबसे भरोसेमंद, ग्राहक-केंद्रित बीमा सलाहकार फर्म बनना, जिसे हमारे द्वारा बेची जाने वाली पॉलिसियों की मात्रा के लिए नहीं, बल्कि उन परिवारों की संख्या के लिए पहचाना जाए जिनका भविष्य हमने सफलतापूर्वक सुरक्षित किया है।",
    },
    servicesPage: {
      title: 'हमारी सेवाएं',
      subtitle: 'भारत की शीर्ष बीमा कंपनियों से संपूर्ण वित्तीय सुरक्षा योजनाएं, जो पूरी तरह से आपके जीवन के चरण और लक्ष्यों के अनुसार तैयार की गई हैं।',
      keyBenefits: 'मुख्य लाभ',
      idealFor: 'इनके लिए आदर्श:',
      enquireNow: 'पूछताछ करें',
    },
    services: {
      life: {
        title: "जीवन बीमा (Life Insurance)",
        desc: "अपनी विशिष्ट आवश्यकताओं के अनुसार तैयार किए गए व्यापक जीवन कवर के साथ अपने परिवार का भविष्य सुरक्षित करें।",
        benefits: ["आश्रितों के लिए वित्तीय सुरक्षा", "धारा 80C के तहत टैक्स छूट", "सुविधाजनक प्रीमियम भुगतान", "संपत्ति निर्माण के विकल्प"],
        idealFor: "परिवार, मुख्य कमाने वाले"
      },
      health: {
        title: "स्वास्थ्य बीमा (Health Insurance)",
        desc: "वित्तीय बोझ के बिना गुणवत्तापूर्ण चिकित्सा देखभाल। अस्पताल के बिल, सर्जरी और उपचार कवर करें।",
        benefits: ["नेटवर्क अस्पतालों में कैशलेस इलाज", "अस्पताल में भर्ती होने से पहले और बाद का कवर", "वार्षिक स्वास्थ्य जांच", "नो क्लेम बोनस"],
        idealFor: "सभी, विशेषकर परिवार और वरिष्ठ नागरिक"
      },
      term: {
        title: "टर्म बीमा (Term Insurance)",
        desc: "कम प्रीमियम पर उच्च कवरेज ताकि यह सुनिश्चित हो सके कि आपकी अनुपस्थिति में आपके परिवार की जीवन शैली प्रभावित न हो।",
        benefits: ["सस्ती दरों पर उच्च जीवन कवर", "गंभीर बीमारी राइडर उपलब्ध", "99 वर्ष की आयु तक कवरेज", "टैक्स में छूट"],
        idealFor: "कामकाजी पेशेवर, युवा माता-पिता"
      },
      child: {
        title: "चाइल्ड प्लान (Child Plans)",
        desc: "अपने बच्चे की उच्च शिक्षा और विवाह के लिए एक फंड बनाएं, यह सुनिश्चित करते हुए कि उनके सपने कभी न रुकें।",
        benefits: ["माइलस्टोन पर गारंटीड पेआउट", "माता-पिता के निधन पर प्रीमियम छूट", "निवेश और बीमा का दोहरा लाभ", "आंशिक निकासी की अनुमति"],
        idealFor: "छोटे बच्चों वाले माता-पिता"
      },
      retirement: {
        title: "रिटायरमेंट प्लान (Retirement Plans)",
        desc: "रिटायरमेंट के बाद आय के निरंतर स्रोत और वित्तीय स्वतंत्रता के साथ अपने सुनहरे वर्षों की योजना बनाएं।",
        benefits: ["नियमित पेंशन/एन्युइटी", "मैच्योरिटी पर एकमुश्त निकासी", "महंगाई से सुरक्षा", "जीवनसाथी के लिए पेंशन जारी रखना"],
        idealFor: "30-50 वर्ष के पेशेवर"
      },
      investment: {
        title: "निवेश प्लान (Investment Plans)",
        desc: "अपने लक्ष्यों के लिए अनुकूलित मार्केट-लिंक्ड या गारंटीड रिटर्न प्लान के साथ अपनी संपत्ति को लगातार बढ़ाएं।",
        benefits: ["संपत्ति का संचय", "गारंटीड रिटर्न विकल्प", "मार्केट-लिंक्ड यूलिप (ULIPs)", "तरलता (Liquidity) विकल्प"],
        idealFor: "संपत्ति निर्माता, व्यवसाय के मालिक"
      },
      car: {
        title: "कार बीमा (Car Insurance)",
        desc: "दुर्घटनाओं, चोरी, प्राकृतिक आपदाओं और थर्ड-पार्टी देनदारियों के खिलाफ व्यापक सुरक्षा।",
        benefits: ["कैशलेस क्लेम सेटलमेंट", "जीरो डेप्रिसिएशन कवर", "24x7 रोडसाइड असिस्टेंस", "इंजन प्रोटेक्शन राइडर्स"],
        idealFor: "कार मालिक"
      },
      bike: {
        title: "बाइक बीमा (Bike Insurance)",
        desc: "अपने दोपहिया वाहन को कानूनी रूप से मान्य रखें और सड़क पर और सड़क के बाहर के जोखिमों से बचाएं।",
        benefits: ["अनिवार्य थर्ड-पार्टी कवर", "स्वयं के नुकसान से सुरक्षा", "व्यक्तिगत दुर्घटना कवर", "त्वरित पॉलिसी जारी करना"],
        idealFor: "दोपहिया वाहन मालिक"
      },
      travel: {
        title: "यात्रा बीमा (Travel Insurance)",
        desc: "मन की शांति के साथ दुनिया की यात्रा करें। मेडिकल आपात स्थिति, उड़ान में देरी और सामान खोने के लिए कवरेज।",
        benefits: ["विदेशी चिकित्सा खर्च", "यात्रा रद्द/देरी कवर", "पासपोर्ट/सामान खोने पर कवर", "24x7 वैश्विक सहायता"],
        idealFor: "लगातार यात्रा करने वाले, पर्यटक"
      },
      property: {
        title: "संपत्ति बीमा (Property Insurance)",
        desc: "अपने घर, व्यावसायिक भवन या किराये की संपत्ति को आग, चोरी, प्राकृतिक आपदाओं और अन्य अप्रत्याशित नुकसान से सुरक्षित रखें।",
        benefits: [
          "आग और प्राकृतिक आपदाओं से सुरक्षा",
          "चोरी और सेंधमारी से कवर",
          "भवन एवं उसमें मौजूद सामान का कवर",
          "त्वरित और आसान क्लेम सहायता"
        ],
        idealFor: "घर के मालिक, मकान मालिक, व्यवसाय के मालिक"
      },

      event: {
        title: "इवेंट बीमा (Event Insurance)",
        desc: "अपने विशेष आयोजनों को अप्रत्याशित रद्द होने, कानूनी देनदारियों, दुर्घटनाओं और वित्तीय नुकसान से सुरक्षित रखें।",
        benefits: [
          "इवेंट रद्द होने या स्थगित होने का कवर",
          "पब्लिक लाइबिलिटी सुरक्षा",
          "उपकरण और स्थल की क्षति का कवर",
          "अप्रत्याशित जोखिमों से वित्तीय सुरक्षा"
        ],
        idealFor: "विवाह आयोजक, कॉर्पोरेट संस्थाएँ, इवेंट आयोजक"
      }
    },
    whyChooseUsPage: {
      title: 'हमें क्यों चुनें',
      subtitle: 'बीमा जीवन भर की प्रतिबद्धता है। यहाँ जानें कि कानपुर अपनी वित्तीय सुरक्षा के लिए हम पर भरोसा क्यों करता है।',
      r1Title: "10+ वर्षों का अनुभव",
      r1Desc: "बाजार का गहरा ज्ञान यह सुनिश्चित करता है कि आपको ऐसी सलाह मिले जो समय की कसौटी पर खरी उतरे, केवल वर्तमान रुझानों पर नहीं।",
      r2Title: "विश्वसनीय पार्टनर्स",
      r2Desc: "हम सुरक्षित कवरेज की गारंटी के लिए केवल Tata AIG और Niva Bupa जैसे भारत के सबसे विश्वसनीय बीमाकर्ताओं के साथ काम करते हैं।",
      r3Title: "पारदर्शी सलाह",
      r3Desc: "कोई छिपी हुई शर्तें नहीं। आपके हस्ताक्षर करने से पहले हम नियमों, बहिष्करणों (exclusions) और बारीक बातों को स्पष्ट रूप से समझाते हैं।",
      r4Title: "त्वरित क्लेम सहायता",
      r4Desc: "जब आपात स्थिति आती है, तो कागजी कार्रवाई हम संभालते हैं। हमारे शुरू से अंत तक क्लेम सपोर्ट का मतलब है कि आप महत्वपूर्ण चीजों पर ध्यान केंद्रित करें।",
      r5Title: "किफायती समाधान",
      r5Desc: "हम आपके बजट के लिए उच्च कवरेज और किफायती प्रीमियम के बीच सर्वोत्तम संतुलन खोजने के लिए कई योजनाओं का विश्लेषण करते हैं।",
      r6Title: "व्यक्तिगत मार्गदर्शन",
      r6Desc: "सभी के लिए एक जैसी पिच नहीं। आपके परिवार की संरचना, आय और लक्ष्य ही यह तय करते हैं कि हम किस पॉलिसी की सिफारिश करते हैं।",
      r7Title: "आसान ईएमआई उपलब्ध",
      r7Desc: "सुविधाजनक ईएमआई विकल्पों के साथ आज ही अपनी आवश्यक सुरक्षा प्राप्त करें और प्रीमियम भुगतान को आसान बनाएं।",
      r8Title: "अनुकूलित योजनाएँ",
      r8Desc: "अपनी जरूरतों, लक्ष्यों और बजट के अनुसार लचीले कवरेज और लाभों वाली योजना चुनें।"
    },
    testimonialsPage: {
      title: 'ग्राहक अनुभव',
      subtitle: "हमारी सबसे बड़ी उपलब्धि वह विश्वास है जो हमने बनाया है। यहाँ बताया गया है कि कानपुर के परिवारों और व्यवसायों का क्या कहना है।",
      note: "* ये प्रशंसापत्र सामान्य ग्राहक अनुभवों का प्रतिनिधित्व करते हैं। व्यवस्थापक के लिए नोट: वास्तविक तस्वीरें बाद में यहां जोड़ी जा सकती हैं।",
      t1Role: "व्यवसायी",
      t1Quote: "मैं इस बात को लेकर भ्रमित था कि कौन सा टर्म प्लान खरीदना है। ऋषि ने मुझे पूरी प्रक्रिया के दौरान धैर्यपूर्वक मार्गदर्शन किया। उन्होंने महंगी योजनाओं पर जोर नहीं दिया, बस वही बताया जो मेरे परिवार के लिए आवश्यक था। मैं उनकी सेवाओं की अत्यधिक अनुशंसा करता हूँ।",
      t2Role: "स्कूल शिक्षिका",
      t2Quote: "मेरे पति के अस्पताल में भर्ती होने के दौरान, सद्गुरु बीमा केंद्र ने अपना मूल्य साबित किया। जब मैं अस्पताल में तनाव में थी, ऋषि ने Niva Bupa के साथ कैशलेस क्लेम प्रक्रिया को सुचारू रूप से संभाला। वे एक सच्चे जीवन रक्षक साबित हुए।",
      t3Role: "आईटी पेशेवर",
      t3Quote: "मैंने अपना स्वास्थ्य बीमा यहीं से अपग्रेड कराया। इस स्तर की पारदर्शिता मिलना दुर्लभ है। सभी बहिष्करण पहले ही स्पष्ट कर दिए गए थे। अब मैं अपने परिवार के मेडिकल कवर को लेकर अधिक सुरक्षित महसूस करता हूँ।",
      t4Role: "सेवानिवृत्त बैंक मैनेजर",
      t4Quote: "वरिष्ठ नागरिकों के लिए अच्छा स्वास्थ्य कवर खोजना कठिन है। ऋषि जी ने मेरे और मेरी पत्नी के लिए बिना किसी छिपी हुई शर्तों वाली एक ठोस योजना बनाई। उनकी बिक्री के बाद की सेवा उत्कृष्ट है।",
      t5Role: "उद्यमी",
      t5Quote: "मैंने अपना पहला कार बीमा इनके माध्यम से खरीदा। शोरूम की तुलना में प्रीमियम बेहतर तो था ही, साथ ही उन्होंने मुझे जीरो-डेप (zero-dep) शर्तों पर भी सही मार्गदर्शन दिया।",
      t6Role: "डॉक्टर",
      t6Quote: "मैं 5 साल से ग्राहक हूँ। चाहे बाइक पॉलिसी का नवीनीकरण करना हो या मेरे बच्चे के भविष्य की योजना बनाना, सद्गुरु बीमा केंद्र मेरी सभी बीमा जरूरतों के लिए एकमात्र संपर्क बिंदु है।"
    },
    faq: {
      q1: "मुझे बीमा की आवश्यकता क्यों है?",
      a1: "बीमा जीवन की अप्रत्याशित घटनाओं- चाहे वह मेडिकल आपात स्थिति हो, दुर्घटना हो, या कोई अप्रिय घटना- के दौरान आपको और आपके परिवार को एक वित्तीय सुरक्षा जाल प्रदान करता है। यह सुनिश्चित करता है कि जब आपको सबसे ज्यादा जरूरत हो तो आपकी बचत खत्म न हो।",
      q2: "मेरे लिए कौन सी बीमा पॉलिसी सबसे अच्छी है?",
      a2: "सबसे अच्छी पॉलिसी पूरी तरह से आपके जीवन के चरण, आश्रितों, आय और देनदारियों पर निर्भर करती है। एक युवा पेशेवर को टर्म इंश्योरेंस की जरूरत होती है, एक परिवार को मजबूत हेल्थ कवर की जरूरत होती है, और संपत्ति बनाने वाले निवेश योजनाओं की ओर देख सकते हैं। हम आपके साथ मिलकर इसे समझने के लिए कस्टम परामर्श प्रदान करते हैं।",
      q3: "क्या आप क्लेम सेटलमेंट में मदद करेंगे?",
      a3: "हाँ। हमारा काम पॉलिसी बेचने के साथ खत्म नहीं होता है। हम क्लेम प्रक्रिया के दौरान शुरू से अंत तक सहायता प्रदान करते हैं, आपको दस्तावेज़ीकरण पर मार्गदर्शन देते हैं और सुचारू सेटलमेंट सुनिश्चित करने के लिए बीमा कंपनी के साथ संपर्क करते हैं।",
      q4: "क्या मैं खरीदने से पहले योजनाओं की तुलना कर सकता हूँ?",
      a4: "बिल्कुल। पारदर्शिता हमारा मूल मूल्य है। हम कई प्रीमियम भागीदारों (Tata AIG, Niva Bupa, आदि) का प्रतिनिधित्व करते हैं और तुलनात्मक कोट्स (quotes) प्रदान करेंगे ताकि आप एक सूचित निर्णय ले सकें।",
      q5: "पॉलिसी अप्रूवल में कितना समय लगता है?",
      a5: "अधिकांश मानक पॉलिसियां (जैसे ऑटो या बुनियादी स्वास्थ्य) तुरंत या 24 घंटे के भीतर जारी की जाती हैं। मेडिकल चेक-अप से जुड़े टर्म लाइफ इंश्योरेंस में प्रदाता के आधार पर 3-7 कार्य दिवस लग सकते हैं।"
    },
    contact: {
      title: 'संपर्क करें',
      subtitle: 'क्या आप अपना भविष्य सुरक्षित करने के लिए तैयार हैं? हमें संदेश भेजें, कॉल करें, या गोविंद नगर स्थित हमारे कार्यालय आएं।',
      contactInfo: 'संपर्क जानकारी',
      contactInfoDesc: 'हम आपको सही निर्णय लेने में मदद करने के लिए यहाँ हैं।',
      officeAddress: 'कार्यालय का पता',
      getDirections: 'रास्ता देखें',
      phoneWhatsapp: 'फ़ोन और व्हाट्सएप',
      callNow: 'अभी कॉल करें',
      whatsapp: 'व्हाट्सएप',
      emailAddress: 'ईमेल पता',
      officeHours: 'कार्यालय का समय',
      hoursEveryday: 'हर दिन: {hours}',
      sendMessage: 'हमें एक संदेश भेजें',
      fullName: 'पूरा नाम',
      phoneNumber: 'फ़ोन नंबर',
      emailOptional: 'ईमेल पता (वैकल्पिक)',
      yourMessage: 'आपका संदेश',
      sendBtn: 'संदेश भेजें',
      sendingBtn: 'भेजा जा रहा है...',
      namePlaceholder: 'अपना नाम दर्ज करें',
      phonePlaceholder: '+91 98765 43210',
      emailPlaceholder: 'email@example.com',
      messagePlaceholder: 'मैं स्वास्थ्य बीमा विकल्पों के बारे में अधिक जानना चाहता हूँ...',
      sentTitle: "संदेश भेजा गया!",
      sentDesc: "हम शीघ्र ही आपसे संपर्क करेंगे।",
      errorTitle: "कुछ गलत हो गया।",
      errorDesc: "कृपया हमें सीधे कॉल या व्हाट्सएप करने का प्रयास करें।",
    },
    footer: {
      desc: 'कानपुर में विश्वसनीय बीमा सलाहकार जो जीवन, स्वास्थ्य, टर्म और वाहन कवर पर विशेषज्ञ मार्गदर्शन प्रदान करते हैं। कोई बिक्री दबाव नहीं, पूर्ण पारदर्शिता।',
      quickLinks: 'त्वरित लिंक (Quick Links)',
      aboutRishi: 'ऋषि मेंदीरत्ता के बारे में',
      insuranceServices: 'बीमा सेवाएं',
      clientTestimonials: 'ग्राहक अनुभव',
      contactUs: 'संपर्क करें',
      topServices: 'शीर्ष सेवाएं',
      contactInfo: 'संपर्क जानकारी',
      rights: '© {year} सद्गुरु बीमा केंद्र। सर्वाधिकार सुरक्षित।',
      trustedSince: '{year} से कानपुर में विश्वसनीय सलाहकार',
    },
    notFound: {
      title: '404 पेज नहीं मिला',
      desc: 'क्या आप राउटर में पेज जोड़ना भूल गए?',
    },
    whatsapp: {
      defaultMsg: 'नमस्ते ऋषि जी, मैं आपकी बीमा सेवाओं के बारे में अधिक जानना चाहता हूँ।',
      consultationMsg: 'नमस्ते ऋषि जी, मैं बीमा के संबंध में परामर्श बुक करना चाहता हूँ।',
      enquiryMsg: 'नमस्ते ऋषि जी, मैं {service} के बारे में पूछताछ करना चाहता हूँ।',
    }
  }
};
