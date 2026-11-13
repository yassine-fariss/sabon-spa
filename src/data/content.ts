import { ServiceItem, PackItem, TeamMember, ReviewItem, FAQItem } from '../types';
import { getAssetUrl } from '../utils/assets';

export const BUSINESS_INFO = {
  name: 'Sabon Spa',
  tagline: {
    fr: 'Le Sanctuaire Bleu • Luxury Spa & Hammam',
    en: 'The Blue Sanctuary • Luxury Spa & Hammam'
  },
  location: {
    address: 'Résidence Iris, 1 Route de Malabata / Bd Mohammed VI',
    city: 'Tanger 90000, Maroc',
    landmark: {
      fr: 'Face à la baie de Malabata',
      en: 'Facing Malabata Bay'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Sabon+Spa+Tanger+Malabata'
  },
  hours: {
    fr: '10:00 – 23:00 Tous les jours (7j/7)',
    en: '10:00 – 23:00 Every day (7/7)'
  },
  phones: {
    primary: '+212 539 941 111',
    whatsapp: '+212 600 437 982',
    landline: '+212 539 945 154',
  },
  whatsappLink: 'https://wa.me/212600437982?text=Bonjour%20Sabon%20Spa,%20je%20souhaite%20r%C3%A9server%20une%20exp%C3%A9rience.',
  instagram: 'https://www.instagram.com/sabonspa.tanger/',
  trustPoints: [
    {
      title: { fr: '100% Espaces Séparés', en: '100% Separate Spaces' },
      desc: { fr: 'Aires réservées aux femmes et aux hommes pour une intimité préservée', en: 'Dedicated wings for women and men ensuring absolute privacy' }
    },
    {
      title: { fr: '5.0 ★ Excellence Vérifiée', en: '5.0 ★ Verified Excellence' },
      desc: { fr: 'Noté 5.0 sur Google, Fresha et Tripadvisor', en: 'Rated 5.0 across Google, Fresha and Tripadvisor' }
    },
    {
      title: { fr: 'Rituels Authentiques', en: 'Authentic Rituals' },
      desc: { fr: 'Hammam traditionnel marocain & massages du monde', en: 'Traditional Moroccan hammam & world massages' }
    },
    {
      title: { fr: 'Baie de Malabata', en: 'Malabata Bay' },
      desc: { fr: 'Cadre idyllique à Tanger avec parking facile d\'accès', en: 'Idyllic Tangier seaside location with easy parking' }
    }
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'hammam-royal',
    category: 'hammam',
    title: {
      fr: 'Hammam Royal Marocain',
      en: 'Royal Moroccan Hammam'
    },
    duration: '60 min',
    price: '450 MAD',
    description: {
      fr: 'Sous la voûte céleste aux briques de sel illuminées, vivez l’immersion ultime : gommage traditionnel au savon noir d’eucalyptus, enveloppement purifiant au ghassoul aromatisé aux sept plantes et brumisation d’eau florale d’oranger.',
      en: 'Beneath the starry salt-brick vault, immerse yourself in our quintessential ritual: eucalyptus black soap scrub with kessa glove, purifying 7-herb ghassoul wrap, and delicate orange blossom floral water mist.'
    },
    features: {
      fr: ['Savon noir bio à l’eucalyptus', 'Gommage kessa artisanal', 'Enveloppement ghassoul aux herbes', 'Salle de repos & thé à la menthe'],
      en: ['Organic eucalyptus black soap', 'Artisanal kessa scrub', 'Herbal ghassoul clay mask', 'Relaxation lounge & mint tea']
    },
    image: getAssetUrl('images/hammam-vault.jpg'),
    popular: true
  },
  {
    id: 'massage-merzouga',
    category: 'massages',
    title: {
      fr: 'Massage Signature Merzouga',
      en: 'Merzouga Signature Massage'
    },
    duration: '60 min / 90 min',
    price: '600 MAD',
    description: {
      fr: 'Un rituel enveloppant inspiré des dunes marocaines. Pochons chauds gorgés de sable chaud du désert et huile d’argan pure pressée à froid pour dénouer les tensions musculaires les plus profondes.',
      en: 'A deeply warming massage inspired by Moroccan golden dunes. Heated sand herbal pouches and cold-pressed pure argan oil to melt away deep muscular tension and awaken vital energy.'
    },
    features: {
      fr: ['Huile d’argan pure certifiée', 'Pochons de sable chaud de Merzouga', 'Pression moyenne à appuyée', 'Harmonisation énergétique'],
      en: ['Pure certified argan oil', 'Heated Merzouga sand compresses', 'Medium to deep pressure', 'Energy revitalization']
    },
    image: getAssetUrl('images/detail-massage.jpg'),
    popular: true
  },
  {
    id: 'massage-shiatsu-deep',
    category: 'massages',
    title: {
      fr: 'Shiatsu & Deep Tissue',
      en: 'Shiatsu & Deep Tissue Massage'
    },
    duration: '60 min',
    price: '650 MAD',
    description: {
      fr: 'Combinaison experte d’acupression japonaise et de travail myofascial profond par nos maîtres praticiens. Idéal pour sportifs, tensions posturales ou fatigue chronique.',
      en: 'An expert synthesis of traditional Japanese acupressure and intensive myofascial deep work performed by master therapists. Perfect for releasing chronic stiffness and posture strain.'
    },
    features: {
      fr: ['Pression ciblée sur les méridiens', 'Étirements passifs décontractants', 'Libération des nœuds dorsaux', 'Regain de mobilité immédiat'],
      en: ['Targeted meridian pressure', 'Gentle restorative stretching', 'Deep myofascial knot release', 'Immediate posture relief']
    },
    image: getAssetUrl('images/treatment-candle.jpg')
  },
  {
    id: 'soin-kobido',
    category: 'beauty',
    title: {
      fr: 'Rituel Kobido & Éclat Impérial',
      en: 'Kobido Imperial Face Lift'
    },
    duration: '50 min',
    price: '550 MAD',
    description: {
      fr: 'L’art ancestral du lifting manuel japonais. Mouvements rythmés rapides, pincements délicats et drainage lymphatique qui tonifient les muscles faciaux et illuminent le teint de l’intérieur.',
      en: 'The ancestral Japanese art of non-invasive facial sculpting. Fast rhythmic vibrations, delicate lifting pinches, and lymphatic drainage that awaken collagen and illuminate the complexion.'
    },
    features: {
      fr: ['Stimulation des fibroblastes', 'Drainage lymphatique doux', 'Sérums botaniques précieux', 'Effet tenseur immédiat'],
      en: ['Fibroblast stimulation', 'Gentle lymphatic drainage', 'Precious botanical elixir', 'Immediate natural contour']
    },
    image: getAssetUrl('images/facial-glow.jpg')
  },
  {
    id: 'hydro-jacuzzi-sauna',
    category: 'hydro',
    title: {
      fr: 'Parcours Aquatique & Jacuzzi Privatif',
      en: 'Aquatic Journey & Private Jacuzzi'
    },
    duration: '45 min',
    price: '350 MAD',
    description: {
      fr: 'Bains à remous hydro-massants chauffés sous lumière bleutée sous-marine, sauna finlandais en cèdre naturel et douche sensorielle à affusion.',
      en: 'Submerged hydro-massage whirlpools beneath calming bioluminescent ambient light, Finnish natural cedar sauna, and rainfall sensory showers.'
    },
    features: {
      fr: ['Jets hydro-massants ergonomiques', 'Sauna sec aux effluves de pin', 'Détente musculaire totale', 'Inclus peignoir et serviettes'],
      en: ['Ergonomic hydro-jets', 'Dry sauna infused with cedar essence', 'Total body decompression', 'Plush robes and amenities included']
    },
    image: getAssetUrl('images/sauna.jpg')
  },
  {
    id: 'gommage-soin-corps',
    category: 'hammam',
    title: {
      fr: 'Gommage Cristal & Enveloppement Nourrissant',
      en: 'Crystal Scrub & Nourishing Wrap'
    },
    duration: '45 min',
    price: '400 MAD',
    description: {
      fr: 'Exfoliation douce aux cristaux de sel marin infusés aux huiles essentielles de romarin et d’eucalyptus, suivie d’un enveloppement tiède ultra-nourrissant au beurre de karité.',
      en: 'Gentle sea mineral salt scrub infused with rosemary and eucalyptus essential oils, followed by a warm deeply nourishing organic shea butter cocoon wrap.'
    },
    features: {
      fr: ['Cristaux minéraux naturels', 'Texture peau de soie veloutée', 'Hydratation profonde', 'Senteur délicate'],
      en: ['Natural sea mineral crystals', 'Silky velvety skin texture', 'Intensive deep moisture', 'Subtle natural fragrance']
    },
    image: getAssetUrl('images/scrub-care.jpg')
  }
];

export const PACKS: PackItem[] = [
  {
    id: 'pack-bronze',
    tier: 'bronze',
    title: { fr: 'Pack Bronze Découverte', en: 'Bronze Discovery Pack' },
    subtitle: { fr: 'L’initiation essentielle au bien-être marocain', en: 'The essential introduction to Moroccan wellness' },
    duration: '2h00',
    price: '750 MAD',
    inclusions: {
      fr: [
        'Hammam traditionnel marocain privatif',
        'Gommage authentique au savon noir & gant de kessa',
        'Massage relaxant aromatique aux huiles douces (45 min)',
        'Accès aux espaces de relaxation & salon de thé'
      ],
      en: [
        'Private traditional Moroccan hammam session',
        'Authentic eucalyptus black soap & kessa scrub',
        'Relaxing aromatic body massage (45 min)',
        'Access to tranquility lounge & herbal mint tea'
      ]
    }
  },
  {
    id: 'pack-silver',
    tier: 'silver',
    title: { fr: 'Pack Silver Harmonie', en: 'Silver Harmony Pack' },
    subtitle: { fr: 'Le rituel signature le plus plébiscité', en: 'Our most popular signature sanctuary ritual' },
    duration: '3h00',
    price: '1 200 MAD',
    popular: true,
    badge: { fr: 'Le Choix Signature', en: 'Signature Choice' },
    inclusions: {
      fr: [
        'Hammam Royal sous voûte étoilée',
        'Gommage kessa & enveloppement purifiant au ghassoul',
        'Massage signature Merzouga aux pochons chauds (60 min)',
        'Bain bouillonnant hydromassant & sauna finlandais',
        'Collation bien-être, infusion et pâtisseries fines'
      ],
      en: [
        'Royal Hammam beneath the starry illuminated vault',
        'Kessa body scrub & purifying 7-herb ghassoul wrap',
        'Merzouga signature heated sand massage (60 min)',
        'Hydro-massage whirlpool & Finnish cedar sauna access',
        'Wellness refreshments, infusions and delicate pastries'
      ]
    }
  },
  {
    id: 'pack-gold',
    tier: 'gold',
    title: { fr: 'Pack Gold Prestige Impérial', en: 'Gold Imperial Prestige Pack' },
    subtitle: { fr: 'L’expérience absolue d’une demi-journée d’exception', en: 'The ultimate half-day royal sanctuary immersion' },
    duration: '4h00',
    price: '2 100 MAD',
    badge: { fr: 'Luxe Absolu', en: 'Pure Luxury' },
    inclusions: {
      fr: [
        'Hammam Impérial complet (savon noir, gommage, ghassoul & eau de rose)',
        'Massage grand rituel à 4 mains ou Deep Tissue Signature (75 min)',
        'Soin Kobido régénérant du visage & masque à la gelée royale (45 min)',
        'Séance jacuzzi privatisé avec chromothérapie sous-marine',
        'Plateau prestige dégustation, jus frais détox et mignardises'
      ],
      en: [
        'Imperial full hammam (black soap, scrub, ghassoul & damask rose water)',
        'Grand 4-hand sensory massage or Signature Deep Tissue (75 min)',
        'Rejuvenating Kobido facial lift with royal jelly mask (45 min)',
        'Private jacuzzi session with underwater chromotherapy',
        'Prestige artisanal tasting platter, fresh detox elixir & delicacies'
      ]
    }
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Latifa',
    role: { fr: 'Maîtresse Hammam & Rituels Traditionnels', en: 'Master of Hammam & Heritage Rituals' },
    specialties: {
      fr: ['Hammam Royal', 'Gommage Kessa Traditionnel', 'Enveloppements Ghassoul'],
      en: ['Royal Hammam', 'Traditional Kessa Scrub', 'Herbal Ghassoul Wraps']
    },
    bio: {
      fr: 'Gardienne des gestes ancestraux du hammam marocain, Latifa prodigue un soin d\'une précision et d\'une bienveillance incomparables.',
      en: 'Keeper of ancestral Moroccan hammam techniques, Latifa delivers treatments with unmatched poise, gentle warmth, and dedication.'
    }
  },
  {
    name: 'Anne',
    role: { fr: 'Thérapeute Senior & Soins Holistiques', en: 'Senior Therapist & Holistic Wellness' },
    specialties: {
      fr: ['Massage Merzouga', 'Soin Kobido Impérial', 'Massage Relaxant'],
      en: ['Merzouga Massage', 'Imperial Kobido Lift', 'Relaxation Therapies']
    },
    bio: {
      fr: 'Certifiée en thérapies manuelles asiatiques et soins visage d’exception, Anne réharmonise le corps et l’esprit avec fluidité.',
      en: 'Certified in traditional manual bodywork and advanced facial arts, Anne restores energetic balance with fluid precision.'
    }
  },
  {
    name: 'Jay (Arjay)',
    role: { fr: 'Spécialiste Shiatsu & Deep Tissue', en: 'Shiatsu & Deep Tissue Specialist' },
    specialties: {
      fr: ['Shiatsu', 'Deep Tissue Myofascial', 'Massage Récupération Sportive'],
      en: ['Shiatsu Acupressure', 'Myofascial Deep Tissue', 'Athletic Recovery']
    },
    bio: {
      fr: 'Expert des points de tension et des méridiens, Jay dénoue avec force et subtilité les contractures les plus tenaces.',
      en: 'An expert in trigger point release and meridian lines, Jay eases deep muscular tensions with calibrated power and delicacy.'
    }
  },
  {
    name: 'Jenny & Sam',
    role: { fr: 'Praticiens Hydrothérapie & Massages du Monde', en: 'Hydrotherapy & World Massage Practitioners' },
    specialties: {
      fr: ['Massages 4 Mains', 'Suédois Relaxant', 'Rituels Bains & Sauna'],
      en: ['4-Hand Massages', 'Swedish Relaxation', 'Sauna & Bath Rituals']
    },
    bio: {
      fr: 'Une équipe passionnée qui veille au confort et au bien-être de chaque visiteur du premier pas jusqu’à la salle de repos.',
      en: 'A dedicated team ensuring every guest experiences flawless calm and genuine Moroccan hospitality from arrival to departure.'
    }
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'google-bisma-hussain',
    author: 'Bisma Hussain',
    rating: 5.0,
    date: '1 month ago',
    meta: '5 reviews',
    source: 'Google',
    avatarInitials: 'BH',
    text: 'So happy with the service, the best experience ever. I am speechless with the quality of the place, the services and everything… especially the staff which is absolutely lovely and kind. The place is beyonddd beautiful.'
  },
  {
    id: 'google-ikram-st',
    author: 'Ikram St',
    rating: 5.0,
    date: '2 months ago',
    meta: '1 review · 7 photos',
    source: 'Google',
    avatarInitials: 'IS',
    text: 'I had a wonderful experience at this spa! I tried the hammam and massage, and everything was absolutely perfect. The staff were very kind, welcoming, and professional.\n\nEverything was clean, well prepared, and organized, which made the whole experience even more relaxing.\n\nI truly enjoyed every moment and left feeling refreshed and relaxed. I highly recommend this place and would definitely come back again! ✨'
  },
  {
    id: 'google-ash-fera',
    author: 'Ash Fera',
    rating: 5.0,
    date: '3 weeks ago',
    meta: 'Local Guide',
    isLocalGuide: true,
    source: 'Google',
    avatarInitials: 'AF',
    text: 'An absolutely incredible experience from start to finish. The facilities were spotless and peaceful, and the staff made me feel incredibly pampered. I left feeling completely relaxed and will definitely be back!'
  },
  {
    id: 'google-humayra-kabir',
    author: 'Humayra Kabir',
    rating: 5.0,
    date: '1 month ago',
    meta: '1 month ago',
    source: 'Google',
    avatarInitials: 'HK',
    highlight: true,
    text: 'Wow wow wow. First time doing the hammam experience and mind was blown, grateful for the flexibility to accomodate a sudden walk in appointment.\n\nAnna the manager is wonderful, Soumaya the site supervisor, the hammam lady and Irish the masseusse, were phenomenal.\n\nThis is a spectacular experience and the perfect way to unwind after days of travel. I can’t wait to come back again!!!'
  },
  {
    id: 'google-valeria-spada',
    author: 'Valeria Spada',
    rating: 5.0,
    date: '1 month ago',
    meta: 'Local Guide · 14 reviews · 13 photos',
    isLocalGuide: true,
    source: 'Google',
    avatarInitials: 'VS',
    text: 'Such a lovely atmosphere! I had the pleasure of getting a manicure and pedicure, and it was such a pleasant experience. The staff were also very friendly. I will definitely come back again! 🤍'
  },
  {
    id: 'google-sami-alabed',
    author: 'Sami Alabed, HTS-ELEKTRO',
    rating: 5.0,
    date: '1 month ago',
    meta: '1 review',
    source: 'Google',
    avatarInitials: 'SA',
    highlight: true,
    text: 'An absolutely wonderful experience! Everything was excellent, from the hammam to the massage. The service was professional, relaxing, and of a very high standard.\n\nA special mention goes to the manager, who is an exceptionally kind, elegant, and respectful person. Her warm and friendly attitude made the whole experience even more enjoyable.\n\nI highly recommend this place to anyone looking for a great hammam and massage experience. I will definitely come back again!'
  },
  {
    id: 'google-mohammed-alanazi',
    author: 'Mohammed Alanazi',
    rating: 5.0,
    date: '1 month ago',
    meta: '7 reviews · 2 photos',
    source: 'Google',
    avatarInitials: 'MA',
    text: 'Absolutely exceptional experience! ✨ From the beautiful atmosphere to the professional and attentive service, everything felt luxurious and relaxing. Truly one of the best spas I’ve ever visited!\n\nA special thank you to Anna, Sumyah, and Fedwa for your kindness, professionalism, and all your effort. You made the experience even more special. ❤️\n\nHighly recommended! 💎🌿'
  },
  {
    id: 'google-sabir-fetian',
    author: 'Sabir Fetian',
    rating: 5.0,
    date: '1 month ago',
    meta: '1 review',
    source: 'Google',
    avatarInitials: 'SF',
    text: 'I had an amazing experience at this spa. Everything was new, clean, relaxing, and well organized. The staff were very friendly and professional, and the treatment was absolutely wonderful. I left feeling refreshed and completely relaxed. I would definitely recommend this place and will happily come back again!'
  },
  {
    id: 'google-wissam-dahrouch',
    author: 'Wissam Dahrouch',
    rating: 5.0,
    date: '2 months ago',
    meta: '1 review',
    source: 'Google',
    avatarInitials: 'WD',
    text: 'I had an amazing experience at this spa! The salon is beautiful, clean, and relaxing. The service was excellent, and the staff were very welcoming, professional, and attentive. Everything was perfect from start to finish. I highly recommend this place and will definitely come back! ✨'
  },
  {
    id: 'google-mo-chemlali',
    author: 'Mo Chemlali',
    rating: 5.0,
    date: '4 weeks ago',
    meta: '4 reviews',
    source: 'Google',
    avatarInitials: 'MC',
    text: 'We had a wonderful experience at Spa Sabon! The service was excellent, the staff were very friendly and accommodating, and they really took the time to think along with us. Everything was very clean and beautifully presented. Highly recommended! We would definitely come back again.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: {
      fr: 'Les espaces hommes et femmes sont-ils réellement 100% séparés ?',
      en: 'Are the men’s and women’s areas strictly 100% separate?'
    },
    answer: {
      fr: 'Oui, absolument. Sabon Spa a été conçu avec deux ailes totalement indépendantes et cloisonnées : une aile exclusivement réservée aux femmes et une aile exclusivement réservée aux hommes. Chaque espace dispose de ses propres hammams, vestiaires, douches, saunas et salles de repos pour garantir une intimité totale.',
      en: 'Yes, completely. Sabon Spa is architected with two independent, fully separated wings: one exclusively dedicated to women and one exclusively dedicated to men. Each wing features its own hammams, changing suites, showers, saunas, and relaxation lounges for complete privacy.'
    }
  },
  {
    question: {
      fr: 'Faut-il réserver à l’avance ?',
      en: 'Is advance reservation required?'
    },
    answer: {
      fr: 'La réservation préalable est fortement recommandée, en particulier les après-midis et week-ends, afin de vous garantir un créneau privatisé et la disponibilité de nos maîtres praticiens. Vous pouvez réserver directement par WhatsApp au +212 600 437 982 ou par téléphone au +212 539 941 111.',
      en: 'Advance booking is strongly recommended, especially for afternoon and weekend rituals, to guarantee your preferred therapist and private suite. You can book instantly via WhatsApp at +212 600 437 982 or phone at +212 539 941 111.'
    }
  },
  {
    question: {
      fr: 'Que dois-je apporter pour mon soin ou hammam ?',
      en: 'What should I bring for my treatment or hammam?'
    },
    answer: {
      fr: 'Nous fournissons l\'ensemble du linge de maison luxueux : peignoir moelleux, serviettes en coton égyptien, sous-vêtements jetables et sandales antidérapantes. Pour le hammam, vous pouvez apporter votre maillot de bain habituel si vous le souhaitez.',
      en: 'We provide all luxury linens: plush bathrobes, oversized Egyptian cotton towels, disposable garments, and slippers. For the hammam, you may bring your usual swimwear if you prefer.'
    }
  },
  {
    question: {
      fr: 'Où se situe Sabon Spa et comment y stationner ?',
      en: 'Where is Sabon Spa located and is parking available?'
    },
    answer: {
      fr: 'Sabon Spa est situé à la Résidence Iris, 1 Route de Malabata / Bd Mohammed VI à Tanger, à deux pas du bord de mer et de la baie de Malabata. Des places de stationnement sécurisées sont disponibles aux abords immédiats.',
      en: 'Sabon Spa is situated at Résidence Iris, 1 Route de Malabata / Bd Mohammed VI in Tangier, right along the scenic Malabata Bay. Convenient parking is available directly outside.'
    }
  },
  {
    question: {
      fr: 'Quels sont vos horaires d’ouverture ?',
      en: 'What are your operating hours?'
    },
    answer: {
      fr: 'Nous vous accueillons tous les jours de la semaine (7j/7), de 10h00 à 23h00 sans interruption.',
      en: 'We welcome you seven days a week, continuously from 10:00 AM to 11:00 PM.'
    }
  },
  {
    question: {
      fr: 'Proposez-vous des formules cadeaux ou privatisations ?',
      en: 'Do you offer gift certificates or private events?'
    },
    answer: {
      fr: 'Oui, nous proposons de somptueuses cartes cadeaux personnalisées valables sur l’ensemble de nos soins et packs, ainsi que la privatisation de suites spa pour anniversaires, mariages ou occasions spéciales sur demande.',
      en: 'Yes, we provide personalized luxury gift certificates valid across all treatments and packs, as well as private suite buyouts for anniversaries, bridal parties, and special celebrations.'
    }
  }
];

export const GALLERY_IMAGES = [
  {
    src: getAssetUrl('images/hammam-vault.jpg'),
    title: { fr: 'Voûte Céleste en Briques de Sel', en: 'Starry Salt-Brick Hammam Vault' },
    category: { fr: 'Hammam & Eau', en: 'Hammam & Water' }
  },
  {
    src: getAssetUrl('images/lounge.jpg'),
    title: { fr: 'Salon de Réception & Arbre Fleuri', en: 'Lounge & Blossom Sanctuary' },
    category: { fr: 'Architecture & Accueil', en: 'Architecture & Lounge' }
  },
  {
    src: getAssetUrl('images/hammam-blue.jpg'),
    title: { fr: 'Sanctuaire Bleu & Niches Lumineuses', en: 'Blue Sanctuary & Light Niches' },
    category: { fr: 'Hammam & Eau', en: 'Hammam & Water' }
  },
  {
    src: getAssetUrl('images/sauna.jpg'),
    title: { fr: 'Sauna Finlandais en Cèdre & Ambre', en: 'Finnish Cedar Sauna & Warm Glow' },
    category: { fr: 'Hydrothérapie', en: 'Hydrotherapy' }
  },
  {
    src: getAssetUrl('images/detail-massage.jpg'),
    title: { fr: 'Soins Signatures & Huiles Précieuses', en: 'Signature Care & Precious Oils' },
    category: { fr: 'Massages & Rituels', en: 'Massages & Rituals' }
  },
  {
    src: getAssetUrl('images/facial-glow.jpg'),
    title: { fr: 'Lifting Kobido & Soins du Visage', en: 'Kobido Facial Lift & Botanicals' },
    category: { fr: 'Beauté & Éclat', en: 'Beauty & Glow' }
  },
  {
    src: getAssetUrl('images/ritual-soak.jpg'),
    title: { fr: 'Immersion & Rituels Hydro-relaxants', en: 'Immersion & Hydro-relaxing Rituals' },
    category: { fr: 'Hydrothérapie', en: 'Hydrotherapy' }
  },
  {
    src: getAssetUrl('images/treatment-candle.jpg'),
    title: { fr: 'Ambiance Feutrée aux Bougies', en: 'Candlelit Serenity Suites' },
    category: { fr: 'Massages & Rituels', en: 'Massages & Rituals' }
  }
];
