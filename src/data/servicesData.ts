import { getAssetUrl } from '../utils/assets';

export interface TreatmentService {
  id: string;
  name: { fr: string; en: string };
  duration: string;
  price: string;
  priceNum?: number;
  category: string;
  subCategory?: string;
  description?: { fr: string; en: string };
  image?: string;
  badge?: { fr: string; en: string };
  isFeatured?: boolean;
  isPopular?: boolean;
  priceNote?: { fr: string; en: string };
}

export interface ServiceCategory {
  id: string;
  name: { fr: string; en: string };
  tagline: { fr: string; en: string };
  icon: string;
}

export const TREATMENT_CATEGORIES: ServiceCategory[] = [
  {
    id: 'spa-packages',
    name: { fr: 'Spa Packages', en: 'Spa Packages' },
    tagline: { fr: 'Rituels signatures & immersions complètes d’exception', en: 'Signature rituals & complete luxury immersions' },
    icon: 'Crown'
  },
  {
    id: 'kids-packages',
    name: { fr: 'Kids Packages', en: 'Kids Packages' },
    tagline: { fr: 'Rituels doux et bienveillants pour les plus jeunes', en: 'Gentle, comforting wellness rituals tailored for children' },
    icon: 'Heart'
  },
  {
    id: 'hammam-body',
    name: { fr: 'Hammam & Body', en: 'Hammam & Body' },
    tagline: { fr: 'Bains de vapeur traditionnels, gommages & jacuzzi privatif', en: 'Traditional steam baths, artisanal scrubs & private jacuzzi' },
    icon: 'Waves'
  },
  {
    id: 'massage',
    name: { fr: 'Massage', en: 'Massage' },
    tagline: { fr: 'Thérapies manuelles relaxantes, ciblées & énergétiques', en: 'Relaxing, therapeutic & restorative manual bodywork' },
    icon: 'Sparkles'
  },
  {
    id: 'facial',
    name: { fr: 'Facial', en: 'Facial' },
    tagline: { fr: 'Soins visage purifiants et régénérants', en: 'Purifying and revitalizing targeted facial treatments' },
    icon: 'Smile'
  },
  {
    id: 'manicure-pedicure',
    name: { fr: 'Manicure & Pedicure', en: 'Manicure & Pedicure' },
    tagline: { fr: 'Beauté des mains et des pieds, BIAB, extensions & soins spa', en: 'Nail beauty, BIAB, extensions, spa manicure & pedicure' },
    icon: 'Hand'
  },
  {
    id: 'lashes-brows',
    name: { fr: 'Lashes & Brows', en: 'Lashes & Brows' },
    tagline: { fr: 'Sublimation du regard, rehaussement, brow lift & henné', en: 'Lash lifts, extensions, brow lifts & artisanal henna styling' },
    icon: 'Eye'
  },
  {
    id: 'hair-services',
    name: { fr: 'Hair Services', en: 'Hair Services' },
    tagline: { fr: 'Coiffure, coupes, brushing & coloration d’exception', en: 'Styling, haircuts, customized blowouts & hair coloring' },
    icon: 'Scissors'
  },
  {
    id: 'hair-treatments',
    name: { fr: 'Hair Treatments', en: 'Hair Treatments' },
    tagline: { fr: 'Soins profonds à la kératine & botox capillaire', en: 'Intensive restorative pro-keratin & nourishing treatments' },
    icon: 'ShieldCheck'
  },
  {
    id: 'organic-products',
    name: { fr: 'Organic Products', en: 'Organic Products' },
    tagline: { fr: 'Gamme de soins capillaires biologiques & sérums précieux', en: 'Curated organic botanicals, shampoos, conditioners & serums' },
    icon: 'Leaf'
  },
  {
    id: 'extras',
    name: { fr: 'Extras', en: 'Extras' },
    tagline: { fr: 'Touches finales & compléments de soins sur mesure', en: 'Finishing touches & supplementary private experiences' },
    icon: 'Plus'
  }
];

export const ALL_TREATMENTS: TreatmentService[] = [
  // ==========================================
  // 1. SPA PACKAGES
  // ==========================================
  {
    id: 'pkg-royal',
    name: { fr: 'Royal Package', en: 'Royal Package' },
    duration: '5h',
    price: '2 500 MAD',
    priceNum: 2500,
    category: 'spa-packages',
    badge: { fr: 'Luxe Absolu', en: 'Pure Royal Luxury' },
    isFeatured: true,
    isPopular: true,
    image: getAssetUrl('images/hammam-vault.jpg'),
    description: {
      fr: 'Une demi-journée d’immersion totale : Hammam impérial sous voûte étoilée de briques de sel, gommage kessa, massage d’exception, soin visage régénérant et jacuzzi privatif.',
      en: 'A half-day royal sanctuary immersion: Imperial Hammam beneath illuminated salt vaults, bespoke bodywork, revitalizing facial, and private hydro-jacuzzi.'
    }
  },
  {
    id: 'pkg-mariee',
    name: { fr: 'Forfait Mariée', en: 'Bridal Luxury Package' },
    duration: '4h',
    price: '5 000 MAD',
    priceNum: 5000,
    category: 'spa-packages',
    badge: { fr: 'Prestige Mariée', en: 'Bridal Grand Prestige' },
    isFeatured: true,
    image: getAssetUrl('images/lounge.jpg'),
    description: {
      fr: 'La cérémonie nuptiale par excellence : Grand hammam rituel aux pétales de roses, gommage d’or et ghassoul royal, massage à 4 mains, beauté complète des mains & pieds et mise en beauté féerique.',
      en: 'The definitive bridal ritual: Rose petal hammam, royal herbal scrub, synchronized 4-hand massage, complete spa manicure & pedicure, and ethereal bridal care.'
    }
  },
  {
    id: 'pkg-silver',
    name: { fr: 'Silver Package', en: 'Silver Package' },
    duration: '2h30',
    price: '1 500 MAD',
    priceNum: 1500,
    category: 'spa-packages',
    badge: { fr: 'Choix Signature', en: 'Signature Choice' },
    isPopular: true,
    image: getAssetUrl('images/detail-massage.jpg'),
    description: {
      fr: 'L’équilibre parfait entre tradition et relaxation : Hammam royal au savon noir d’eucalyptus, enveloppement purifiant et massage signature Merzouga aux pochons chauds.',
      en: 'Harmonious signature experience: Royal eucalyptus hammam, purifying ghassoul cocoon, and Merzouga heated sand herbal pouch massage.'
    }
  },
  {
    id: 'pkg-resort',
    name: { fr: 'Resort Pack', en: 'Resort Pack' },
    duration: '2h',
    price: '800 MAD',
    priceNum: 800,
    category: 'spa-packages',
    image: getAssetUrl('images/sauna.jpg'),
    description: {
      fr: 'Évasion bien-être côtière : Hammam traditionnel marocain complet, exfoliation kessa vivifiante et massage décontractant aux huiles précieuses.',
      en: 'Seaside wellness escape: Complete traditional Moroccan hammam, invigorating kessa body scrub, and relaxing aromatic body massage.'
    }
  },
  {
    id: 'pkg-bronze',
    name: { fr: 'Bronze Package', en: 'Bronze Package' },
    duration: '2h',
    price: '800 MAD',
    priceNum: 800,
    category: 'spa-packages',
    image: getAssetUrl('images/scrub-care.jpg'),
    description: {
      fr: 'L’initiation authentique au sanctuaire : Hammam traditionnel marocain privatif, gommage artisanal au savon noir et massage relaxant 45 min.',
      en: 'Authentic sanctuary initiation: Private traditional hammam, eucalyptus black soap kessa scrub, and relaxing 45 min aromatic massage.'
    }
  },
  {
    id: 'pkg-cafe-deluxe',
    name: { fr: 'Rituel Café Deluxe - Soin du Dos', en: 'Deluxe Coffee Ritual - Back Treatment' },
    duration: '1h',
    price: '800 MAD',
    priceNum: 800,
    category: 'spa-packages',
    image: getAssetUrl('images/treatment-candle.jpg'),
    description: {
      fr: 'Exfoliation tonifiante aux grains de café torréfiés et huiles végétales, gommage dorsal intensif, enveloppement chaud défatigant et massage ciblé de la colonne.',
      en: 'Invigorating roasted coffee bean exfoliation, targeted deep back scrub, warming therapeutic wrap, and intensive spinal muscle massage.'
    }
  },

  // ==========================================
  // 2. KIDS PACKAGES
  // ==========================================
  {
    id: 'kids-royal',
    name: { fr: 'Royal Pack Enfant', en: 'Kids Royal Pack' },
    duration: '3h',
    price: '1 250 MAD',
    priceNum: 1250,
    category: 'kids-packages',
    badge: { fr: 'Pour Petits Princes & Princesses', en: 'Royal Kids Experience' },
    isFeatured: true,
    image: getAssetUrl('images/hammam-blue.jpg'),
    description: {
      fr: 'Immersion féerique adaptée : Hammam vapeur douce à température modérée, bain moussant délicat, massage relaxant doux et soin fraîcheur.',
      en: 'Gentle royal journey: Mild temperature steam hammam, fun cloud bubble bath, restorative soft massage, and soothing junior care.'
    }
  },
  {
    id: 'kids-golden',
    name: { fr: 'Golden Pack Enfant', en: 'Kids Golden Pack' },
    duration: '2h30',
    price: '1 000 MAD',
    priceNum: 1000,
    category: 'kids-packages',
    image: getAssetUrl('images/ritual-soak.jpg'),
    description: {
      fr: 'Rituel bien-être complet pour enfant : Hammam tiède, gommage doux sans irritation et massage apaisant aux huiles hypoallergéniques.',
      en: 'Full children’s wellness ritual: Gentle warm hammam, irritation-free soft scrub, and calming hypoallergenic massage.'
    }
  },
  {
    id: 'kids-silver',
    name: { fr: 'Silver Pack Enfant', en: 'Kids Silver Pack' },
    duration: '2h',
    price: '750 MAD',
    priceNum: 750,
    category: 'kids-packages',
    image: getAssetUrl('images/hammam-vault.jpg'),
    description: {
      fr: 'Moment de détente et d’apaisement : Bain sensoriel doux, enveloppement nourrissant et effleurages décontractants.',
      en: 'Peaceful decompression: Mild sensory bath, gentle nourishing wrap, and relaxing light body effleurage.'
    }
  },
  {
    id: 'kids-bronze',
    name: { fr: 'Bronze Pack Enfant', en: 'Kids Bronze Pack' },
    duration: '1h',
    price: '400 MAD',
    priceNum: 400,
    category: 'kids-packages',
    image: getAssetUrl('images/scrub-care.jpg'),
    description: {
      fr: 'Initiation douce et amusante aux bienfaits du hammam marocain avec savon doux et rinçage à l’eau parfumée.',
      en: 'Fun and gentle introduction to Moroccan hammam traditions with gentle natural soap and floral rinse.'
    }
  },

  // ==========================================
  // 3. HAMMAM & BODY
  // ==========================================
  {
    id: 'hammam-sahraoui',
    name: { fr: 'Hammam Sahraoui', en: 'Sahrawi Hammam' },
    duration: '1h',
    price: '500 MAD',
    priceNum: 500,
    category: 'hammam-body',
    subCategory: 'adults',
    image: getAssetUrl('images/hammam-blue.jpg'),
    description: {
      fr: 'Inspiré des rituels du désert du Sud marocain : poudres aromatiques sahariennes, savon noir purifiant et enveloppement aux argiles solaires.',
      en: 'Inspired by Southern Moroccan desert traditions: Saharan botanical powders, natural black soap, and solar clay wrap.'
    }
  },
  {
    id: 'hammam-turc',
    name: { fr: 'Hammam Turc', en: 'Turkish Foam Hammam' },
    duration: '1h',
    price: '600 MAD',
    priceNum: 600,
    category: 'hammam-body',
    subCategory: 'adults',
    image: getAssetUrl('images/hammam-vault.jpg'),
    description: {
      fr: 'Immersion sous nuage de mousse soyeuse à la savonnette d’Alep, gommage kessa traditionnel et hydro-rinçage tiède revitalisant.',
      en: 'Enveloping cloud of silky Aleppian olive foam, traditional kessa body exfoliation, and soothing thermal rinse.'
    }
  },
  {
    id: 'hammam-marocain-royal',
    name: { fr: 'Hammam Marocain Royal', en: 'Royal Moroccan Hammam' },
    duration: '1h',
    price: '450 MAD',
    priceNum: 450,
    category: 'hammam-body',
    subCategory: 'adults',
    isPopular: true,
    image: getAssetUrl('images/hammam-vault.jpg'),
    description: {
      fr: 'Notre cérémonie signature sous la voûte céleste aux briques de sel : savon noir d’eucalyptus, gommage kessa artisanal et ghassoul aromatisé aux 7 plantes.',
      en: 'Our quintessential ceremony under the starry salt-brick vault: eucalyptus black soap, artisanal kessa scrub, and 7-herb herbal ghassoul.'
    }
  },
  {
    id: 'hammam-turc-enfant',
    name: { fr: 'Hammam Turc Enfant', en: 'Kids Turkish Foam Hammam' },
    duration: '1h',
    price: '300 MAD',
    priceNum: 300,
    category: 'hammam-body',
    subCategory: 'kids',
    image: getAssetUrl('images/hammam-blue.jpg'),
    description: {
      fr: 'Bain de mousse abondant doux et amusant dans un espace tiédi, adapté à la sensibilité de la peau des enfants.',
      en: 'Delicate and playful cloud foam bath in gently heated room, specially formulated for delicate young skin.'
    }
  },
  {
    id: 'hammam-sahraoui-enfant',
    name: { fr: 'Hammam Sahraoui Enfant', en: 'Kids Sahrawi Hammam' },
    duration: '1h',
    price: '250 MAD',
    priceNum: 250,
    category: 'hammam-body',
    subCategory: 'kids',
    image: getAssetUrl('images/scrub-care.jpg'),
    description: {
      fr: 'Gommage ultra-doux aux poudres minérales naturelles et rinçage à l’eau de fleur d’oranger.',
      en: 'Ultra-gentle natural mineral scrub and fragrant orange blossom floral water rinse.'
    }
  },
  {
    id: 'hammam-marocain-royal-enfant',
    name: { fr: 'Hammam Marocain Royal Enfant', en: 'Kids Royal Moroccan Hammam' },
    duration: '1h',
    price: '200 MAD',
    priceNum: 200,
    category: 'hammam-body',
    subCategory: 'kids',
    image: getAssetUrl('images/hammam-vault.jpg'),
    description: {
      fr: 'Découverte bienveillante du hammam marocain : vapeur légère, savon doux et enveloppement ghassoul tiède.',
      en: 'Gentle introduction to Moroccan hammam traditions: gentle steam, mild soap, and warm soothing ghassoul clay.'
    }
  },
  {
    id: 'body-jacuzzi',
    name: { fr: 'Jacuzzi Privatif', en: 'Private Hydro-Jacuzzi Experience' },
    duration: '1h',
    price: '300 MAD',
    priceNum: 300,
    category: 'hammam-body',
    subCategory: 'jacuzzi',
    badge: { fr: 'Hydrothérapie', en: 'Hydrotherapy' },
    image: getAssetUrl('images/ritual-soak.jpg'),
    description: {
      fr: 'Bain à remous privatisé sous lumière bleutée sous-marine, jets hydro-massants ergonomiques et chromothérapie apaisante.',
      en: 'Private bubbling whirlpool under bioluminescent ambient blue light, ergonomic hydro-jets, and restorative chromotherapy.'
    }
  },

  // ==========================================
  // 4. MASSAGE
  // ==========================================
  // Group A: Relaxation & Traditional Massage
  {
    id: 'msg-sur-mesure',
    name: { fr: 'Massage sur mesure', en: 'Bespoke Customized Massage' },
    duration: '30m',
    price: '300 MAD',
    priceNum: 300,
    category: 'massage',
    subCategory: 'relaxation',
    description: {
      fr: 'Pression, rythme et zones de tension calibrés selon vos envies immédiates.',
      en: 'Customized pressure, tempo and focus areas tailored specifically to your needs.'
    }
  },
  {
    id: 'msg-back-neck',
    name: { fr: 'Back, Head, Neck and Shoulder', en: 'Back, Head, Neck & Shoulder' },
    duration: '30m',
    price: '350 MAD',
    priceNum: 350,
    category: 'massage',
    subCategory: 'relaxation',
    description: {
      fr: 'Libération express des nœuds du haut du dos, de la nuque, des trapèzes et du cuir chevelu.',
      en: 'Express tension relief targeting the upper back, cervical spine, trapezius and scalp.'
    }
  },
  {
    id: 'msg-swedish',
    name: { fr: 'Massage Swedish', en: 'Swedish Massage' },
    duration: '1h',
    price: '500 MAD',
    priceNum: 500,
    category: 'massage',
    subCategory: 'relaxation',
    description: {
      fr: 'Grand classique européen : longs effleurages fluides, pétrissages légers et réoxygénation des muscles.',
      en: 'European classic: long flowing strokes, gentle kneading, and muscular revitalization.'
    }
  },
  {
    id: 'msg-head-spa',
    name: { fr: 'Head Spa', en: 'Japanese Head Spa' },
    duration: '1h',
    price: '500 MAD',
    priceNum: 500,
    category: 'massage',
    subCategory: 'relaxation',
    description: {
      fr: 'Cérémonie immersive du cuir chevelu : acupression crânienne, bain tiède sensoriel et déconnexion mentale.',
      en: 'Immersive cranial scalp therapy: acupressure, warm sensory rainfall cascade, and mental tranquility.'
    }
  },
  {
    id: 'msg-amasismo',
    name: { fr: 'Massage Amasismo', en: 'Amasismo Deep Body Massage' },
    duration: '1h',
    price: '600 MAD',
    priceNum: 600,
    category: 'massage',
    subCategory: 'relaxation',
    description: {
      fr: 'Pétrissages dynamiques et manœuvres enveloppantes pour dénouer les tensions musculaires profondes.',
      en: 'Dynamic kneading and rhythmic sculpting to ease persistent deep muscular stress.'
    }
  },
  {
    id: 'msg-pregnancy',
    name: { fr: 'Massage Pregnancy', en: 'Prenatal Pregnancy Massage' },
    duration: '1h',
    price: '600 MAD',
    priceNum: 600,
    category: 'massage',
    subCategory: 'relaxation',
    description: {
      fr: 'Protocole doux et sécurisant pour future maman, soulageant les lombaires, le bassin et les jambes lourdes.',
      en: 'Gentle, certified prenatal bodywork relieving lower back stiffness, pelvis strain, and tired legs.'
    }
  },

  // Group B: Therapeutic & Specialized Massage
  {
    id: 'msg-shiatsu',
    name: { fr: 'Massage Shiatsu', en: 'Shiatsu Acupressure Massage' },
    duration: '1h',
    price: '500 MAD',
    priceNum: 500,
    category: 'massage',
    subCategory: 'therapeutic',
    description: {
      fr: 'Acupression japonaise le long des méridiens pour rétablir la libre circulation de l’énergie vitale.',
      en: 'Ancestral Japanese finger-pressure along meridian channels to restore energetic equilibrium.'
    }
  },
  {
    id: 'msg-maderotherapy',
    name: { fr: 'Massage Maderotherapy', en: 'Maderotherapy Body Contouring' },
    duration: '30m',
    price: '300 MAD',
    priceNum: 300,
    category: 'massage',
    subCategory: 'therapeutic',
    description: {
      fr: 'Technique colombienne aux instruments en bois naturel pour stimuler le drainage et raffermir la silhouette.',
      en: 'Colombian natural wooden tool technique stimulating lymphatic drainage and body toning.'
    }
  },
  {
    id: 'msg-reflexologie',
    name: { fr: 'Massage Reflexologie plantaire', en: 'Foot Reflexology Massage' },
    duration: '30m',
    price: '350 MAD',
    priceNum: 350,
    category: 'massage',
    subCategory: 'therapeutic',
    description: {
      fr: 'Stimulation méthodique des zones réflexes plantaires connectées à l’ensemble des systèmes du corps.',
      en: 'Methodical acupressure on plantar reflex zones connected to corresponding body organs.'
    }
  },
  {
    id: 'msg-drainage',
    name: { fr: 'Drainage Lymphatique', en: 'Lymphatic Drainage' },
    duration: '1h',
    price: '650 MAD',
    priceNum: 650,
    category: 'massage',
    subCategory: 'therapeutic',
    description: {
      fr: 'Manœuvres douces rythmées favorisant l’élimination des toxines et réduisant la rétention d’eau.',
      en: 'Gentle rhythmic strokes stimulating lymph circulation to clear metabolic waste and fluids.'
    }
  },
  {
    id: 'msg-deep-tissue',
    name: { fr: 'Massage Deep Tissue', en: 'Deep Tissue Massage' },
    duration: '1h',
    price: '650 MAD',
    priceNum: 650,
    category: 'massage',
    subCategory: 'therapeutic',
    isPopular: true,
    description: {
      fr: 'Pression profonde et étirements myofascaux pour défaire les adhérences et libérer les contractures tenaces.',
      en: 'Intensive slow pressure and myofascial release targeting deep muscular knots and chronic rigidity.'
    }
  },
  {
    id: 'msg-cupping',
    name: { fr: 'Cupping Therapy', en: 'Cupping Therapy' },
    duration: '1h',
    price: 'Sur consultation',
    category: 'massage',
    subCategory: 'therapeutic',
    badge: { fr: 'Sur Consultation', en: 'Upon Consultation' },
    description: {
      fr: 'Application thérapeutique de ventouses pour stimuler la microcirculation et décongestionner les fascias.',
      en: 'Therapeutic suction cup therapy to boost microcirculation and relieve deep fascia congestion.'
    }
  },

  // Group C: Premium Massage Experiences
  {
    id: 'msg-hot-stone',
    name: { fr: 'Massage Hot Stone', en: 'Volcanic Hot Stone Massage' },
    duration: '1h',
    price: '650 MAD',
    priceNum: 650,
    category: 'massage',
    subCategory: 'premium',
    description: {
      fr: 'Galets de basalte volcanique polis chauffés et huiles essentielles pour une profonde décontraction thermique.',
      en: 'Smooth heated volcanic basalt stones and precious oils offering profound thermic decompression.'
    }
  },
  {
    id: 'msg-thailandais',
    name: { fr: 'Massage Thailandais', en: 'Traditional Thai Massage' },
    duration: '1h',
    price: '600 MAD',
    priceNum: 600,
    category: 'massage',
    subCategory: 'premium',
    description: {
      fr: 'Étirements passifs inspirés du yoga et pressions calquées sur les lignes d’énergie Sen.',
      en: 'Yoga-inspired passive stretching and rhythmic acupressure along energetic Sen pathways.'
    }
  },
  {
    id: 'msg-mixed-thai-1h',
    name: { fr: 'Mixed Thai Massage (1h)', en: 'Mixed Thai Massage (1h)' },
    duration: '1h',
    price: '700 MAD',
    priceNum: 700,
    category: 'massage',
    subCategory: 'premium',
    description: {
      fr: 'Combinaison équilibrée de travail énergétique thaïlandais et d’effleurages relaxants aux huiles tièdes.',
      en: 'Harmonious fusion of energizing Thai bodywork and soothing warm oil Swedish strokes.'
    }
  },
  {
    id: 'msg-mixed-thai-1h30',
    name: { fr: 'Mixed Thai Massage (1h30)', en: 'Mixed Thai Massage (1h30)' },
    duration: '1h30',
    price: '1 050 MAD',
    priceNum: 1050,
    category: 'massage',
    subCategory: 'premium',
    badge: { fr: 'Session Prolongée', en: 'Extended Ritual' },
    description: {
      fr: 'Séance prolongée d’1h30 associant la précision des étirements thaï au lâcher-prise d’un grand massage aux huiles.',
      en: 'Extended 90-minute session blending rigorous Thai stretching with sublime oil relaxation.'
    }
  },
  {
    id: 'msg-merzouga',
    name: { fr: 'Massage Merzouga', en: 'Merzouga Signature Desert Massage' },
    duration: '1h',
    price: '800 MAD',
    priceNum: 800,
    category: 'massage',
    subCategory: 'premium',
    isPopular: true,
    badge: { fr: 'Signature Sabon', en: 'Sabon Signature' },
    description: {
      fr: 'Pochons chauds gorgés de sable pur du désert de Merzouga et huile d’argan pressée à froid pour dissiper le stress.',
      en: 'Heated Merzouga desert sand herbal compresses and pure cold-pressed argan oil to melt stress.'
    }
  },
  {
    id: 'msg-4-hand',
    name: { fr: 'Massage 4 Hand', en: 'Royal 4-Hand Synchronized Massage' },
    duration: '1h',
    price: '1 000 MAD',
    priceNum: 1000,
    category: 'massage',
    subCategory: 'premium',
    badge: { fr: 'Prestige Duo', en: 'Grand Duo' },
    description: {
      fr: 'Chorégraphie simultanée exécutée en parfaite harmonie par deux maîtres praticiens pour une évasion totale.',
      en: 'Two master practitioners moving in synchronized sensory choreography for ultimate surrender.'
    }
  },

  // Group D: Kids Massage
  {
    id: 'msg-kids',
    name: { fr: 'Kids Massage', en: 'Kids Relaxing Massage' },
    duration: '45m',
    price: '300 MAD',
    priceNum: 300,
    category: 'massage',
    subCategory: 'kids',
    badge: { fr: 'Junior Care', en: 'Junior Care' },
    description: {
      fr: 'Soin bienveillant et apaisant aux huiles végétales pures hypoallergéniques, idéal après le hammam.',
      en: 'Gentle, comforting bodywork with pure hypoallergenic botanical oils designed for young guests.'
    }
  },

  // ==========================================
  // 5. FACIAL
  // ==========================================
  {
    id: 'facial-mens',
    name: { fr: 'Mens Facial', en: 'Mens Purifying Facial' },
    duration: '30m',
    price: '300 MAD',
    priceNum: 300,
    category: 'facial',
    image: getAssetUrl('images/facial-glow.jpg'),
    description: {
      fr: 'Soin haute performance conçu spécifiquement pour la peau masculine : nettoyage désincrustant, exfoliation enzymatique, serviette chaude relaxante et hydratation protectrice.',
      en: 'High-performance treatment engineered for men’s skin: deep pore cleansing, enzymatic scrub, warm steam compress, and protective botanical hydration.'
    }
  },

  // ==========================================
  // 6. MANICURE & PEDICURE
  // ==========================================
  // SubCategory: Manicure
  {
    id: 'mani-spa-women',
    name: { fr: 'Manicure Spa Women', en: 'Spa Manicure Women' },
    duration: '1h',
    price: '200 MAD',
    priceNum: 200,
    category: 'manicure-pedicure',
    subCategory: 'manicure',
    description: {
      fr: 'Soin complet des ongles, cuticules, gommage exfoliant doux, modelage hydratant et pose protectrice.',
      en: 'Comprehensive nail and cuticle care, gentle exfoliating scrub, moisturizing massage, and protective finish.'
    }
  },
  {
    id: 'mani-russian',
    name: { fr: 'Russian Manicure', en: 'Russian Manicure' },
    duration: '1h',
    price: '250 MAD',
    priceNum: 250,
    category: 'manicure-pedicure',
    subCategory: 'manicure',
    badge: { fr: 'Haute Précision', en: 'High Precision' },
    description: {
      fr: 'Technique mécanique ultra-précise à l’embout diamant pour des cuticules impeccables et un pourtour d’ongle parfait.',
      en: 'Ultra-precise mechanical dry technique with diamond bits for spotless cuticles and seamless edges.'
    }
  },
  {
    id: 'mani-sabon-spa',
    name: { fr: 'Manicure Sabon Spa', en: 'Signature Sabon Spa Manicure' },
    duration: '1h',
    price: '300 MAD',
    priceNum: 300,
    category: 'manicure-pedicure',
    subCategory: 'manicure',
    isPopular: true,
    badge: { fr: 'Signature Salon', en: 'Salon Signature' },
    description: {
      fr: 'Protocole signature d’excellence : bain aromatique, soin des cuticules, masque nourrissant et massage relaxant des mains.',
      en: 'Our flagship hand ritual: aromatic soak, meticulous cuticle work, nourishing mask, and hand massage.'
    }
  },
  {
    id: 'mani-semi-permanent',
    name: { fr: 'Manicure Semi-Permanent', en: 'Semi-Permanent Manicure' },
    duration: '1h',
    price: '450 MAD',
    priceNum: 450,
    category: 'manicure-pedicure',
    subCategory: 'manicure',
    description: {
      fr: 'Soin manucure complet avec pose de vernis semi-permanent longue tenue et brillance miroir.',
      en: 'Complete manicure treatment with long-wear high-shine semi-permanent gel polish.'
    }
  },
  {
    id: 'mani-gainage-biab',
    name: { fr: 'Gainage BIAB', en: 'BIAB Natural Overlay' },
    duration: '2h',
    price: '550 MAD',
    priceNum: 550,
    category: 'manicure-pedicure',
    subCategory: 'manicure',
    badge: { fr: 'Renforcement Naturel', en: 'Nail Strengthening' },
    priceNote: {
      fr: '550 MAD tarif carte salon (350 MAD sur système de réservation)',
      en: '550 MAD salon menu rate (350 MAD booking system rate)'
    },
    description: {
      fr: 'Technique Builder In A Bottle renforçant l’ongle naturel, stimulant sa repousse sans l’abîmer.',
      en: 'Builder In A Bottle overlay reinforcing natural nails, promoting healthy growth without damage.'
    }
  },
  {
    id: 'mani-biab-normal',
    name: { fr: 'BIAB Normal', en: 'BIAB Normal' },
    duration: '1h30',
    price: '550 MAD',
    priceNum: 550,
    category: 'manicure-pedicure',
    subCategory: 'manicure',
    description: {
      fr: 'Pose de gel BIAB structurant sur ongles naturels pour solidité et éclat durable.',
      en: 'Structuring BIAB gel application on natural nails for resilient, flawless shine.'
    }
  },
  {
    id: 'mani-pose-gel',
    name: { fr: 'Pose Gel', en: 'Gel Application' },
    duration: '2h',
    price: '550 MAD',
    priceNum: 550,
    category: 'manicure-pedicure',
    subCategory: 'manicure',
    description: {
      fr: 'Modelage et renforcement au gel UV/LED pour un galbe parfait et une tenue de plusieurs semaines.',
      en: 'UV/LED gel sculpting providing structured arch and weeks of pristine durability.'
    }
  },
  {
    id: 'mani-classique',
    name: { fr: 'Manicure Classique', en: 'Classic Manicure' },
    duration: '1h',
    price: '150 MAD',
    priceNum: 150,
    category: 'manicure-pedicure',
    subCategory: 'manicure',
    description: {
      fr: 'Limage harmonieux, soin soigné des cuticules, polissage et hydratation des mains.',
      en: 'Shaping, careful cuticle grooming, buffing, and hydrating hand lotion.'
    }
  },

  // SubCategory: Pedicure
  {
    id: 'pedi-spa',
    name: { fr: 'Pedicure Spa Men / Women', en: 'Spa Pedicure Men / Women' },
    duration: '1h',
    price: '350 MAD',
    priceNum: 350,
    category: 'manicure-pedicure',
    subCategory: 'pedicure',
    isPopular: true,
    description: {
      fr: 'Bain bouillonnant relaxant, soin des callosités à la râpe douce, gommage exfoliant, cuticules et modelage des pieds.',
      en: 'Relaxing foot bath, gentle callus smoothing, exfoliating scrub, cuticle care, and restorative foot massage.'
    }
  },
  {
    id: 'pedi-semi-permanent',
    name: { fr: 'Pedicure Semi-Permanent', en: 'Semi-Permanent Pedicure' },
    duration: '1h15',
    price: '500 MAD',
    priceNum: 500,
    category: 'manicure-pedicure',
    subCategory: 'pedicure',
    description: {
      fr: 'Soin pédicure complet suivi de la pose de vernis semi-permanent haute brillance et tenue prolongée.',
      en: 'Full spa pedicure accompanied by long-lasting, high-gloss semi-permanent gel finish.'
    }
  },

  // SubCategory: Extensions & Gel
  {
    id: 'ext-biab',
    name: { fr: 'BIAB Extension', en: 'BIAB Extension' },
    duration: '1h',
    price: '650 MAD',
    priceNum: 650,
    category: 'manicure-pedicure',
    subCategory: 'extensions',
    badge: { fr: 'Extensions Tendances', en: 'Trending Extensions' },
    priceNote: {
      fr: '650 MAD tarif carte salon (450 MAD sur système de réservation)',
      en: '650 MAD salon menu rate (450 MAD booking system rate)'
    },
    description: {
      fr: 'Extension sur chablon ou capsules réalisée au gel BIAB pour un rallongement naturel et ultra-résistant.',
      en: 'Sculpted BIAB extensions creating natural length with exceptional flexibility and strength.'
    }
  },
  {
    id: 'ext-biab-french',
    name: { fr: 'BIAB Extension French', en: 'BIAB Extension French' },
    duration: '2h',
    price: '500 MAD',
    priceNum: 500,
    category: 'manicure-pedicure',
    subCategory: 'extensions',
    description: {
      fr: 'Rallongement au BIAB avec tracé French Manucure nette et élégante.',
      en: 'BIAB nail extension complemented with a crisp, timeless French manicure smile line.'
    }
  },
  {
    id: 'ext-acrylic',
    name: { fr: 'Acrylic Extension', en: 'Acrylic Extension' },
    duration: '1h',
    price: '500 MAD',
    priceNum: 500,
    category: 'manicure-pedicure',
    subCategory: 'extensions',
    description: {
      fr: 'Extensions en résine acrylique pour une solidité maximale et un remodelage sur mesure.',
      en: 'Classic acrylic nail extension providing maximum resilience and tailored length.'
    }
  },
  {
    id: 'ext-faux-ongles',
    name: { fr: 'Faux Ongles Permanent', en: 'Permanent Nail Tips' },
    duration: '1h',
    price: '300 MAD',
    priceNum: 300,
    category: 'manicure-pedicure',
    subCategory: 'extensions',
    description: {
      fr: 'Pose de capsules complètes avec renfort permanent et mise en forme soignée.',
      en: 'Full tip application with permanent overlay and meticulous contouring.'
    }
  },
  {
    id: 'ext-ongle-gel-unite',
    name: { fr: 'Ongle en Gel par Ongle', en: 'Single Gel Nail Repair' },
    duration: '15m',
    price: '50 MAD',
    priceNum: 50,
    category: 'manicure-pedicure',
    subCategory: 'extensions',
    description: {
      fr: 'Réparation ou reconstruction unitaire d’un ongle cassé ou ébréché.',
      en: 'Single nail repair or reconstruction for broken or cracked nails.'
    }
  },

  // SubCategory: Nail Finishing & Art
  {
    id: 'finish-pose-semi',
    name: { fr: 'Pose Semi-Permanent', en: 'Semi-Permanent Polish' },
    duration: '45m',
    price: '300 MAD',
    priceNum: 300,
    category: 'manicure-pedicure',
    subCategory: 'finishing',
    description: {
      fr: 'Application experte de vernis semi-permanent avec catalyse sous lampe LED.',
      en: 'Precision application of semi-permanent polish cured under LED lamp.'
    }
  },
  {
    id: 'finish-gel-bottle',
    name: { fr: 'Semi-Permanent Gel Bottle', en: 'The GelBottle Application' },
    duration: '1h',
    price: '250 MAD',
    priceNum: 250,
    category: 'manicure-pedicure',
    subCategory: 'finishing',
    badge: { fr: 'The GelBottle Inc', en: 'The GelBottle Inc' },
    description: {
      fr: 'Application professionnelle avec les formules renommées The GelBottle.',
      en: 'Professional finish utilizing premium The GelBottle high-pigment formula.'
    }
  },
  {
    id: 'finish-vernis-opi',
    name: { fr: 'Pose Vernis Normal OPI', en: 'OPI Classic Polish Application' },
    duration: '20m',
    price: '80 MAD',
    priceNum: 80,
    category: 'manicure-pedicure',
    subCategory: 'finishing',
    description: {
      fr: 'Base, deux couches de couleur OPI et top coat brillant séchage rapide.',
      en: 'Base coat, two rich coats of authentic OPI lacquer, and glossy protective top coat.'
    }
  },
  {
    id: 'finish-french',
    name: { fr: 'French', en: 'French Manicure Finish' },
    duration: '10m',
    price: '50 MAD',
    priceNum: 50,
    category: 'manicure-pedicure',
    subCategory: 'finishing',
    description: {
      fr: 'Tracé du bord libre en blanc pur ou nuance personnalisée.',
      en: 'Clean smile-line painting in classic white or custom delicate tint.'
    }
  },
  {
    id: 'finish-nail-chrome',
    name: { fr: 'Nail Chrome', en: 'Chrome Glazed Finish' },
    duration: '30m',
    price: '100 MAD',
    priceNum: 100,
    category: 'manicure-pedicure',
    subCategory: 'finishing',
    badge: { fr: 'Effet Glazed', en: 'Glazed Effect' },
    description: {
      fr: 'Poudre miroir chromée frottée pour un reflet métallique ou glazed donut ultra-tendance.',
      en: 'Lustrous chrome pigment rubbed to a mirror-like or glazed donut sheen.'
    }
  },
  {
    id: 'finish-nail-ombre',
    name: { fr: 'Nail Ombré', en: 'Ombré Babyboomer Art' },
    duration: '30m',
    price: '100 MAD',
    priceNum: 100,
    category: 'manicure-pedicure',
    subCategory: 'finishing',
    description: {
      fr: 'Dégradé subtil babyboomer ou deux teintes fondues avec harmonie.',
      en: 'Seamless babyboomer gradient or dual-tone blended ombré nail art.'
    }
  },

  // SubCategory: Removal
  {
    id: 'rem-permanent',
    name: { fr: 'Removal Permanent', en: 'Permanent Gel Removal' },
    duration: '20m',
    price: '100 MAD',
    priceNum: 100,
    category: 'manicure-pedicure',
    subCategory: 'removal',
    priceNote: {
      fr: '100 MAD tarif carte salon (~80 MAD système de réservation)',
      en: '100 MAD salon menu rate (~80 MAD booking system rate)'
    },
    description: {
      fr: 'Dépose douce et soignée respectant la kératine naturelle de l’ongle.',
      en: 'Gentle, careful gel removal preserving the natural nail plate integrity.'
    }
  },
  {
    id: 'rem-biab',
    name: { fr: 'Removal BIAB / Extension', en: 'Removal BIAB / Extension' },
    duration: '15m - 30m',
    price: '150 MAD',
    priceNum: 150,
    category: 'manicure-pedicure',
    subCategory: 'removal',
    priceNote: {
      fr: '150 MAD tarif carte salon (100 MAD système de réservation)',
      en: '150 MAD salon menu rate (100 MAD booking system rate)'
    },
    description: {
      fr: 'Ponçage mécanique contrôlé et dissolution délicate des extensions ou du gel BIAB.',
      en: 'Controlled e-file filing and soothing soak-off for BIAB or nail extensions.'
    }
  },

  // ==========================================
  // 7. LASHES & BROWS
  // ==========================================
  {
    id: 'lash-volume-3d',
    name: { fr: 'Extension Cils Volume 3D', en: '3D Volume Lash Extensions' },
    duration: '1h',
    price: '550 MAD',
    priceNum: 550,
    category: 'lashes-brows',
    badge: { fr: 'Regard Sublime', en: 'Glamour Look' },
    description: {
      fr: 'Pose minutieuse bouquet par bouquet pour un volume dense, aérien et un regard intensément captivant.',
      en: 'Meticulous fan-by-fan application creating dense, weightless volume and captivating eye depth.'
    }
  },
  {
    id: 'brow-lift-teinture',
    name: { fr: 'Brow Lift + Teinture', en: 'Brow Lift + Tinting' },
    duration: '1h',
    price: '250 MAD',
    priceNum: 250,
    category: 'lashes-brows',
    isPopular: true,
    description: {
      fr: 'Restructuration et fixation vers le haut des poils du sourcil, complétée par une teinture sur mesure.',
      en: 'Brow hair realignment and upward setting paired with customized tint for fuller, defined arches.'
    }
  },
  {
    id: 'lash-lift',
    name: { fr: 'Rehaussement de Cils', en: 'Lash Lift' },
    duration: '1h',
    price: '200 MAD',
    priceNum: 200,
    category: 'lashes-brows',
    description: {
      fr: 'Recourbement naturel durable des cils dès la racine pour ouvrir le regard sans mascara.',
      en: 'Long-lasting natural upward lash curling from root to tip, opening the eyes effortlessly.'
    }
  },
  {
    id: 'lash-tint',
    name: { fr: 'Teinture des Cils', en: 'Eyelash Tinting' },
    duration: '1h',
    price: '100 MAD',
    priceNum: 100,
    category: 'lashes-brows',
    description: {
      fr: 'Coloration semi-permanente noire profonde ou brune pour densifier le regard.',
      en: 'Semi-permanent deep black or rich brown tint creating the illusion of natural mascara.'
    }
  },
  {
    id: 'brow-henna',
    name: { fr: 'Design Sourcils Henna', en: 'Henna Brow Architecture' },
    duration: '45m',
    price: '150 MAD',
    priceNum: 150,
    category: 'lashes-brows',
    description: {
      fr: 'Coloration végétale au henné restructurant la ligne du sourcil et teintant délicatement la peau.',
      en: 'Botanical henna staining mapping the ideal brow shape while softly tinting the underlying skin.'
    }
  },
  {
    id: 'brow-threading',
    name: { fr: 'Epilation Sourcils au Fil', en: 'Eyebrow Threading' },
    duration: '30m',
    price: '80 MAD',
    priceNum: 80,
    category: 'lashes-brows',
    description: {
      fr: 'Technique orientale ancestrale au fil de coton pour une ligne ultra-nette sans irriter la peau.',
      en: 'Ancestral cotton thread hair removal achieving razor-sharp definition without chemical irritation.'
    }
  },

  // ==========================================
  // 8. HAIR SERVICES
  // ==========================================
  // Instant Cheveux
  {
    id: 'hair-savonage',
    name: { fr: 'Savonage', en: 'Hair Wash & Shampoo' },
    duration: '10m',
    price: '50 MAD',
    priceNum: 50,
    category: 'hair-services',
    subCategory: 'instant',
    description: {
      fr: 'Lavage délicat au bac avec massage rapide du cuir chevelu.',
      en: 'Gentle basin shampoo wash with light refreshing scalp stimulation.'
    }
  },
  {
    id: 'hair-touching',
    name: { fr: 'Touching Cheveux', en: 'Hair Retouch / Touching' },
    duration: '20m',
    price: '50 MAD',
    priceNum: 50,
    category: 'hair-services',
    subCategory: 'instant',
    description: {
      fr: 'Rafraîchissement express du brushing ou retouche rapide de la coiffure.',
      en: 'Quick blowout refresh or touch-up for immediate polish.'
    }
  },
  {
    id: 'hair-coupe',
    name: { fr: 'Coupe de Cheveux', en: 'Haircut & Styling' },
    duration: '30m',
    price: '120 MAD',
    priceNum: 120,
    category: 'hair-services',
    subCategory: 'instant',
    description: {
      fr: 'Diagnostic de style, coupe personnalisée et mise en forme.',
      en: 'Style consultation, precision haircut, and flattering shape.'
    }
  },
  {
    id: 'hair-pointes',
    name: { fr: 'Coup des Pointes', en: 'Split Ends Trim' },
    duration: '25m',
    price: '80 MAD',
    priceNum: 80,
    category: 'hair-services',
    subCategory: 'instant',
    description: {
      fr: 'Égalisation nette des longueurs et élimination des pointes abîmées.',
      en: 'Clean trimming of split ends to preserve length and hair vitality.'
    }
  },
  {
    id: 'hair-depot-ext',
    name: { fr: 'Dépot d’Extentions', en: 'Extension Removal' },
    duration: '20m',
    price: '80 MAD',
    priceNum: 80,
    category: 'hair-services',
    subCategory: 'instant',
    description: {
      fr: 'Dépose douce et soignée de mèches ou bandes d’extensions capillaires.',
      en: 'Careful, damage-free removal of tape-in or bonded hair extensions.'
    }
  },

  // Brushing
  {
    id: 'brush-general',
    name: { fr: 'Brushing Cheveux', en: 'Hair Blowout' },
    duration: '15m',
    price: 'À partir de 50 MAD',
    category: 'hair-services',
    subCategory: 'brushing',
    description: {
      fr: 'Séchage professionnel et lissage ou wavy selon la longueur de votre chevelure.',
      en: 'Professional blowout with silky straight or bouncy waves based on hair length.'
    }
  },
  {
    id: 'brush-court',
    name: { fr: 'Brushing Cheveux Court', en: 'Short Hair Blowout' },
    duration: '15m',
    price: '50 MAD',
    priceNum: 50,
    category: 'hair-services',
    subCategory: 'brushing',
    description: {
      fr: 'Brushing volumateur soigné pour coupes courtes et carrés courts.',
      en: 'Volumizing precision blowout tailored for short cuts and pixie crops.'
    }
  },
  {
    id: 'brush-moyen',
    name: { fr: 'Brushing Cheveux Moyenne', en: 'Medium Hair Blowout' },
    duration: '20m',
    price: '100 MAD',
    priceNum: 100,
    category: 'hair-services',
    subCategory: 'brushing',
    description: {
      fr: 'Brushing souple ou ultra-lisse pour cheveux mi-longs jusqu’aux épaules.',
      en: 'Smooth or bouncy blow-dry for shoulder-length and medium hair.'
    }
  },
  {
    id: 'brush-long',
    name: { fr: 'Brushing Cheveux Long', en: 'Long Hair Blowout' },
    duration: '30m',
    price: '120 MAD',
    priceNum: 120,
    category: 'hair-services',
    subCategory: 'brushing',
    description: {
      fr: 'Séchage soyeux haute brillance et coiffage des chevelures longues et épaisses.',
      en: 'High-shine, silky finish and styling crafted for long and thick tresses.'
    }
  },

  // Coloration & Care
  {
    id: 'col-cheveux',
    name: { fr: 'Coloration de Cheveux', en: 'Hair Color Treatment' },
    duration: '1h',
    price: '100 MAD',
    priceNum: 100,
    category: 'hair-services',
    subCategory: 'color-care',
    description: {
      fr: 'Application professionnelle de couleur racine ou nuance éclat.',
      en: 'Professional root touch-up or vibrant gloss tint application.'
    }
  },
  {
    id: 'col-barbe',
    name: { fr: 'Coloration Cheveux + Barbe', en: 'Hair + Beard Color' },
    duration: '1h',
    price: '300 MAD',
    priceNum: 300,
    category: 'hair-services',
    subCategory: 'color-care',
    description: {
      fr: 'Teinte harmonieuse et couvrante pour cheveux et barbe masculine.',
      en: 'Seamless gray-blending color treatment for hair and beard.'
    }
  },
  {
    id: 'care-cheveux',
    name: { fr: 'Soin du Cheveux', en: 'Deep Conditioning Hair Care' },
    duration: '1h',
    price: '300 MAD',
    priceNum: 300,
    category: 'hair-services',
    subCategory: 'color-care',
    description: {
      fr: 'Masque profond revitalisant sous vapeur tiède pour réparer la fibre.',
      en: 'Intensive restorative hair mask with warm steam infusion.'
    }
  },
  {
    id: 'care-botox',
    name: { fr: 'Botox Capillaire', en: 'Hair Botox Treatment' },
    duration: '1h30',
    price: '300 MAD',
    priceNum: 300,
    category: 'hair-services',
    subCategory: 'color-care',
    badge: { fr: 'Éclat & Réparation', en: 'Glow & Repair' },
    description: {
      fr: 'Cure rajeunissante à l’acide hyaluronique et kératine comblant les brèches du cheveu.',
      en: 'Rejuvenating hyaluronic acid and keratin treatment replenishing damaged strands.'
    }
  },
  {
    id: 'care-protein-goldery',
    name: { fr: 'Protein Goldery', en: 'Protein Goldery' },
    duration: '1h',
    price: 'À partir de 300 MAD',
    category: 'hair-services',
    subCategory: 'color-care',
    description: {
      fr: 'Traitement protéiné nourrissant lissant et fortifiant selon la masse capillaire.',
      en: 'Nourishing protein hair smoothing treatment adapted to hair density.'
    }
  },
  {
    id: 'care-protein-court',
    name: { fr: 'Protein Goldery Court Cheveux', en: 'Protein Goldery - Short Hair' },
    duration: '1h',
    price: '300 MAD',
    priceNum: 300,
    category: 'hair-services',
    subCategory: 'color-care',
    description: {
      fr: 'Application protéines lissantes adaptée aux coupes courtes.',
      en: 'Smoothing protein infusion formulated for short hair.'
    }
  },
  {
    id: 'care-protein-moyen',
    name: { fr: 'Protein Goldery Moyen Cheveux', en: 'Protein Goldery - Medium Hair' },
    duration: '1h',
    price: '500 MAD',
    priceNum: 500,
    category: 'hair-services',
    subCategory: 'color-care',
    description: {
      fr: 'Application protéines lissantes adaptée aux cheveux mi-longs.',
      en: 'Smoothing protein infusion formulated for medium-length hair.'
    }
  },

  // ==========================================
  // 9. HAIR TREATMENTS
  // ==========================================
  {
    id: 'trt-keratin-2000',
    name: { fr: 'Soin Pro Keratin (Prestige)', en: 'Pro Keratin Treatment (Prestige)' },
    duration: '1h',
    price: '2 000 MAD',
    priceNum: 2000,
    category: 'hair-treatments',
    badge: { fr: 'Lissage Prestige', en: 'Prestige Smoothing' },
    isFeatured: true,
    description: {
      fr: 'Traitement intensif à la kératine pure brésilienne haute concentration : élimination des frisottis, brillance miroir et chevelure soyeuse durant plusieurs mois.',
      en: 'Intensive high-concentration pure Brazilian keratin therapy: eliminates frizz, imparts mirror glass shine, and guarantees months of silkiness.'
    }
  },
  {
    id: 'trt-keratin-1500',
    name: { fr: 'Soin Pro Keratin (Essentiel)', en: 'Pro Keratin Treatment (Essential)' },
    duration: '1h',
    price: '1 500 MAD',
    priceNum: 1500,
    category: 'hair-treatments',
    badge: { fr: 'Lissage Essentiel', en: 'Essential Smoothing' },
    description: {
      fr: 'Formule professionnelle thermo-active comblant la fibre en kératine pour dompter le volume et sublimer la matière.',
      en: 'Thermo-active professional keratin formula sealing cuticles, taming volume, and restoring luminous softness.'
    }
  },
  {
    id: 'trt-protect-color-brush',
    name: { fr: 'Soin Protect Color + Brushing', en: 'Protect Color Care + Blowout' },
    duration: '1h',
    price: '150 MAD',
    priceNum: 150,
    category: 'hair-treatments',
    description: {
      fr: 'Bouclier anti-affadissement fixant les pigments colorés, suivi d’un brushing impeccable.',
      en: 'Color-lock antioxidant treatment preventing fade, followed by a professional blowout.'
    }
  },
  {
    id: 'trt-keratine-pro-brush',
    name: { fr: 'Soin Keratine Pro + Brushing', en: 'Keratin Pro Care + Blowout' },
    duration: '1h',
    price: '150 MAD',
    priceNum: 150,
    category: 'hair-treatments',
    description: {
      fr: 'Micro-infusion de kératine express apportant souplesse et éclat instantané avec brushing inclus.',
      en: 'Express keratin micro-infusion delivering immediate suppleness and sheen with blowout included.'
    }
  },
  {
    id: 'trt-soin-hydratant-brush',
    name: { fr: 'Soin Hydratant + Brushing', en: 'Moisturizing Treatment + Blowout' },
    duration: '1h',
    price: '150 MAD',
    priceNum: 150,
    category: 'hair-treatments',
    badge: { fr: 'Catalogue Salon', en: 'Salon Listing' },
    description: {
      fr: 'Soin bain d’hydratation profond avec brushing de finition.',
      en: 'Deep moisture replenishment bath paired with a glossy salon blowout.'
    }
  },

  // ==========================================
  // 10. ORGANIC PRODUCTS
  // ==========================================
  // Individual botanical products
  {
    id: 'prod-thick-shampoo',
    name: { fr: 'Thickening Shampoo', en: 'Thickening Shampoo' },
    duration: '250ml',
    price: '270 MAD',
    priceNum: 270,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Shampooing densifiant aux extraits botaniques apportant volume et corps aux cheveux fins.',
      en: 'Botanical densifying shampoo boosting body and natural weightless thickness.'
    }
  },
  {
    id: 'prod-thick-cond',
    name: { fr: 'Thickening Conditioner', en: 'Thickening Conditioner' },
    duration: '250ml',
    price: '280 MAD',
    priceNum: 280,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Après-shampooing léger fortifiant démêlant sans alourdir la fibre.',
      en: 'Lightweight fortifying conditioner detangling while preserving airy volume.'
    }
  },
  {
    id: 'prod-keratin-shampoo',
    name: { fr: 'Pro-Keratin Shampoo', en: 'Pro-Keratin Shampoo' },
    duration: '250ml',
    price: '270 MAD',
    priceNum: 270,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Nettoyant réparateur sans sulfates prolongeant les bienfaits des lissages à la kératine.',
      en: 'Sulfate-free restorative cleanser extending the lifespan of salon keratin smoothing.'
    }
  },
  {
    id: 'prod-keratin-cond',
    name: { fr: 'Pro-Keratin Conditioner', en: 'Pro-Keratin Conditioner' },
    duration: '250ml',
    price: '280 MAD',
    priceNum: 280,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Baume restructurant à la kératine végétale scellant les écailles et apportant un soyeux absolu.',
      en: 'Plant-keratin restructuring balm smoothing cuticles and locking in moisture.'
    }
  },
  {
    id: 'prod-supreme-shampoo',
    name: { fr: 'Supreme Shampoo', en: 'Supreme Shampoo' },
    duration: '250ml',
    price: '270 MAD',
    priceNum: 270,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Formule nutrition suprême aux huiles précieuses pour cheveux secs ou sensibilisés.',
      en: 'Supreme nourishment formula infused with precious oils for sensitized hair.'
    }
  },
  {
    id: 'prod-hydrating-shampoo',
    name: { fr: 'Hydrating Shampoo', en: 'Hydrating Shampoo' },
    duration: '250ml',
    price: '270 MAD',
    priceNum: 270,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Bain désaltérant infusé à l’aloe vera bio et vitamines antioxydantes.',
      en: 'Quenching moisture shampoo formulated with organic aloe vera and vitamins.'
    }
  },
  {
    id: 'prod-hydrating-cond',
    name: { fr: 'Hydrating Conditioner', en: 'Hydrating Conditioner' },
    duration: '250ml',
    price: '280 MAD',
    priceNum: 280,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Émulsion démêlante ultra-douce pour des longueurs souples et brillantes.',
      en: 'Ultra-gentle moisture detangler restoring fluid movement and shine.'
    }
  },
  {
    id: 'prod-purify-shampoo',
    name: { fr: 'Purify Shampoo', en: 'Purify Shampoo' },
    duration: '250ml',
    price: '270 MAD',
    priceNum: 270,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Shampooing clarifiant doux équilibrant le cuir chevelu et éliminant les impuretés.',
      en: 'Gentle clarifying shampoo rebalancing scalp microbiome and removing buildup.'
    }
  },
  {
    id: 'prod-purify-cond',
    name: { fr: 'Purify Conditioner', en: 'Purify Conditioner' },
    duration: '250ml',
    price: '280 MAD',
    priceNum: 280,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Après-shampooing fraîcheur aux extraits de romarin et thé vert.',
      en: 'Cooling conditioning rinse packed with rosemary and green tea botanical extracts.'
    }
  },
  {
    id: 'prod-restruct-shampoo',
    name: { fr: 'Restructuring Shampoo', en: 'Restructuring Shampoo' },
    duration: '250ml',
    price: '280 MAD',
    priceNum: 280,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Cure reconstructrice réparant les ponts disulfures des cheveux traités chimiquement.',
      en: 'Reconstructive shampoo repairing inner disulfide bonds in colored or processed hair.'
    }
  },
  {
    id: 'prod-restruct-cond',
    name: { fr: 'Restructuring Conditioner', en: 'Restructuring Conditioner' },
    duration: '250ml',
    price: '280 MAD',
    priceNum: 280,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Soin scellant fortifiant reconstituant la barrière lipidique naturelle du cheveu.',
      en: 'Fortifying bonding conditioner replenishing the natural hair lipid shield.'
    }
  },
  {
    id: 'prod-miracle-mask',
    name: { fr: 'Miracle Mask', en: 'Miracle Mask' },
    duration: '200ml',
    price: '280 MAD',
    priceNum: 280,
    category: 'organic-products',
    subCategory: 'products',
    badge: { fr: 'Best-Seller', en: 'Best-Seller' },
    isPopular: true,
    description: {
      fr: 'Masque d’exception concentré en beurres précieux pour une régénération en 5 minutes.',
      en: 'Concentrated luxury butter hair mask delivering 5-minute deep regeneration.'
    }
  },
  {
    id: 'prod-angel-potion',
    name: { fr: 'Angel Potion', en: 'Angel Potion Leave-In' },
    duration: '150ml',
    price: '290 MAD',
    priceNum: 290,
    category: 'organic-products',
    subCategory: 'products',
    badge: { fr: 'Coup de Cœur', en: 'Iconic Elixir' },
    description: {
      fr: 'Élixir sans rinçage thermo-protecteur soyeux protégeant de la chaleur et des frisottis.',
      en: 'Silky leave-in thermal protection elixir shielding against heat tools and frizz.'
    }
  },
  {
    id: 'prod-hydrating-serum',
    name: { fr: 'Hydrating Serum', en: 'Hydrating Botanical Serum' },
    duration: '100ml',
    price: '340 MAD',
    priceNum: 340,
    category: 'organic-products',
    subCategory: 'products',
    description: {
      fr: 'Sérum précieux aux huiles pressées à froid sublimant les pointes et illuminant la chevelure.',
      en: 'Precious cold-pressed oil serum smoothing split ends with glass-like radiance.'
    }
  },
  // Featured Package in Products section (Displayed separately as required)
  {
    id: 'pkg-golden-hair',
    name: { fr: 'Golden Package', en: 'Golden Luxury Hair Package' },
    duration: '4h',
    price: '2 000 MAD',
    priceNum: 2000,
    category: 'organic-products',
    subCategory: 'package',
    badge: { fr: 'Forfait Signature Salon', en: 'Signature Salon Package' },
    isFeatured: true,
    description: {
      fr: 'Cérémonie capillaire d’exception : diagnostic personnalisé, soin profond régénérant, massage crânien relaxant, coupe sur mesure et brushing haute couture.',
      en: 'Couture hair sanctuary ceremony: diagnostic consultation, intensive botanical therapy, cranial scalp massage, custom haircut, and luxury blowout.'
    }
  },

  // ==========================================
  // 11. EXTRAS
  // ==========================================
  {
    id: 'extra-wax',
    name: { fr: 'Wax', en: 'Wax Express' },
    duration: '5m',
    price: '100 MAD',
    priceNum: 100,
    category: 'extras',
    description: {
      fr: 'Épilation cire chaude express pour petite zone de finition.',
      en: 'Quick hot wax touch-up for targeted areas.'
    }
  },
  {
    id: 'extra-design',
    name: { fr: 'Design', en: 'Custom Hair / Nail Design' },
    duration: '1h',
    price: 'À partir de 10 MAD',
    category: 'extras',
    description: {
      fr: 'Motifs personnalisés, nail art graphique ou traçage sur mesure.',
      en: 'Custom artistic styling, graphic nail accents, or tailored hairline design.'
    }
  },
  {
    id: 'extra-jacuzzi',
    name: { fr: 'Jacuzzi (Supplément)', en: 'Jacuzzi Add-on' },
    duration: '1h',
    price: '300 MAD',
    priceNum: 300,
    category: 'extras',
    badge: { fr: 'Détente Aquatique', en: 'Hydro Soak' },
    description: {
      fr: 'Séance de bain à remous chauffé privatisé en complément d’un soin ou massage.',
      en: 'Private bubbling whirlpool session added to your massage or ritual.'
    }
  },
  {
    id: 'extra-shampo-goldery',
    name: { fr: 'Shampo Goldery', en: 'Shampo Goldery' },
    duration: '5m',
    price: '600 MAD',
    priceNum: 600,
    category: 'extras',
    description: {
      fr: 'Soin lavant exclusif haut de gamme formulé aux actifs d’or liquide Goldery.',
      en: 'Exclusive high-potency gold-infused cleansing therapy by Goldery.'
    }
  },
  {
    id: 'extra-goldery-pack',
    name: { fr: 'Goldery Pack', en: 'Goldery Pack' },
    duration: '5m',
    price: '850 MAD',
    priceNum: 850,
    category: 'extras',
    badge: { fr: 'Gamme Goldery', en: 'Goldery Prestige' },
    description: {
      fr: 'Coffret rituel expert d’actifs Goldery pour cure capillaire intensive.',
      en: 'Intensive restorative Goldery ritual set formulated for salon-grade revitalizing.'
    }
  }
];
