import { SPA_IMAGES } from './spaImages';

export interface MainCategoryConfig {
  id: string;
  slug: string;
  name: { fr: string; en: string };
  shortDesc: { fr: string; en: string };
  overviewTitle: { fr: string; en: string };
  overviewDesc: { fr: string; en: string };
  whoItsFor: { fr: string[]; en: string[] };
  keyHighlights: { fr: string[]; en: string[] };
  thumbnail: string;
  heroImage: string;
  sourceCategoryIds: string[];
  durationHint: { fr: string; en: string };
  priceStartingMAD: number;
}

export const MAIN_SERVICE_CATEGORIES: MainCategoryConfig[] = [
  {
    id: 'hammam-body',
    slug: 'hammam-body',
    name: {
      fr: 'Hammam & Corps',
      en: 'Hammam & Body',
    },
    shortDesc: {
      fr: 'Bains de vapeur traditionnels, voûte de sel étoilée, gommages au savon noir & jacuzzi privatif.',
      en: 'Traditional Moroccan steam baths, starry salt-brick vault, black soap scrubs & private jacuzzi.',
    },
    overviewTitle: {
      fr: 'Le rituel thermal par excellence',
      en: 'The definitive thermal sanctuary ritual',
    },
    overviewDesc: {
      fr: "Conçu selon l'art ancestral marocain au sein d'une architecture contemporaine épurée. La chaleur enveloppante de nos briques de sel minéral ouvre les pores, le gommage artisanal au savon noir et gant de kessa élimine les toxines, tandis que le jacuzzi privatif apaise durablement le corps et l'esprit.",
      en: 'Crafted according to ancestral Moroccan heritage within a refined contemporary sanctuary. The comforting warmth of illuminated mineral salt vaults opens the pores, artisanal black soap scrubs detoxify the skin, and private hydrotherapy restores complete equilibrium.',
    },
    whoItsFor: {
      fr: [
        'Détoxification profonde',
        'Peau douce & purifiée',
        'Relâchement musculaire',
        'Évasion sensorielle absolue',
      ],
      en: [
        'Deep skin detoxification',
        'Silky exfoliated skin',
        'Total muscular release',
        'Sensory thermal escape',
      ],
    },
    keyHighlights: {
      fr: [
        'Ailes 100% indépendantes femmes & hommes',
        'Voûte céleste en briques de sel minéral',
        'Savon noir naturel d’eucalyptus & ghassoul royal',
        'Peignoirs chauds, serviettes & thé marocain inclus',
      ],
      en: [
        '100% separate wings for women and men',
        'Fiber-optic starry ceiling & salt-brick vault',
        'Organic eucalyptus black soap & royal ghassoul',
        'Plush robes, towels & fresh mint tea included',
      ],
    },
    thumbnail: SPA_IMAGES.hammamWaterAmber,
    heroImage: SPA_IMAGES.hammamBlueTiles,
    sourceCategoryIds: ['hammam-wellness'],
    durationHint: { fr: '60 – 90 min', en: '60 – 90 min' },
    priceStartingMAD: 200,
  },
  {
    id: 'massage',
    slug: 'massage',
    name: {
      fr: 'Massages & Rituels Corporels',
      en: 'Massage',
    },
    shortDesc: {
      fr: 'Deep Tissue, pochons de sable chaud de Merzouga, pierres volcaniques & Kobido.',
      en: 'Deep tissue therapy, heated sand Merzouga pouches, hot basalt stones & Kobido.',
    },
    overviewTitle: {
      fr: 'L’art du toucher bienfaisant et sur-mesure',
      en: 'The art of bespoke restorative bodywork',
    },
    overviewDesc: {
      fr: "Chaque massage est réalisé par nos maîtres praticiens certifiés qui adaptent la pression et le rythme à vos besoins. Des huiles botaniques pures chauffées, des manœuvres décontracturantes ciblées et des rituels chauds pour dissoudre les tensions musculaires chroniques et retrouver une légèreté durable.",
      en: 'Every bodywork ritual is performed by certified master therapists tailoring pressure and rhythm to your physique. Warm botanical oils, targeted myofascial release, and thermal pouches melt chronic fatigue, physical stress, and postural stiffness.',
    },
    whoItsFor: {
      fr: [
        'Tensions dorsales & cervicales',
        'Récupération sportive',
        'Stress et surmenage',
        'Relaxation musculaire profonde',
      ],
      en: [
        'Neck & chronic back tension',
        'Athletic muscle recovery',
        'Stress & everyday fatigue',
        'Deep restorative relaxation',
      ],
    },
    keyHighlights: {
      fr: [
        'Maîtres praticiens expérimentés',
        'Huile d’argan bio et essences naturelles',
        'Tables de massage grand confort chauffées',
        'Pression 100% modulable selon vos souhaits',
      ],
      en: [
        'Experienced certified therapists',
        'Pure organic argan and botanical oils',
        'Heated luxury wide massage beds',
        'Fully customized pressure and technique',
      ],
    },
    thumbnail: SPA_IMAGES.massageReference,
    heroImage: SPA_IMAGES.massageCandle,
    sourceCategoryIds: ['massage'],
    durationHint: { fr: '30 · 60 · 90 min', en: '30 · 60 · 90 min' },
    priceStartingMAD: 300,
  },
  {
    id: 'facial-skincare',
    slug: 'facial-skincare',
    name: {
      fr: 'Visage & Soins de la Peau',
      en: 'Facial & Skincare',
    },
    shortDesc: {
      fr: 'Hydratation profonde, Kobido liftant japonais, éclat anti-âge & beauté du regard.',
      en: 'Deep hydration facials, Japanese Kobido lift, anti-aging radiance & brow/lash care.',
    },
    overviewTitle: {
      fr: 'L’éclat naturel et la jeunesse du teint',
      en: 'Radiant cellular vitality & natural lifting',
    },
    overviewDesc: {
      fr: "Des protocoles dermo-cosmétiques de haute précision combinés à des massages faciaux stimulants. Nettoyage méticuleux, exfoliation douce, modelage Kobido liftant et masques concentrés en actifs régénérants pour restaurer la fermeté, l'hydratation et la luminosité naturelle de votre peau.",
      en: 'Precision clinical facial care harmonized with sculpting botanical techniques. Meticulous pore cleansing, gentle enzyme resurfacing, lifting Kobido massage, and nutrient-dense masks restore skin density, hydration, and luminous vitality.',
    },
    whoItsFor: {
      fr: [
        'Teint terne ou déshydraté',
        'Perte de fermeté & ridules',
        'Pores obstrués & impuretés',
        'Mise en beauté du regard',
      ],
      en: [
        'Dull or dehydrated skin',
        'Loss of firmness & fine lines',
        'Congested pores & impurities',
        'Lash and brow enhancement',
      ],
    },
    keyHighlights: {
      fr: [
        'Diagnostic de peau personnalisé',
        'Produits haut de gamme hypoallergéniques',
        'Modelage Kobido raffermissant',
        'Résultats visibles dès la première séance',
      ],
      en: [
        'Personal skin diagnostic',
        'Premium hypoallergenic skincare',
        'Firming facial acupressure',
        'Instantly visible healthy glow',
      ],
    },
    thumbnail: SPA_IMAGES.facialSkincareReference,
    heroImage: SPA_IMAGES.socialSpaProducts,
    sourceCategoryIds: ['face-lashes'],
    durationHint: { fr: '30 · 45 · 60 min', en: '30 · 45 · 60 min' },
    priceStartingMAD: 80,
  },
  {
    id: 'hair-care',
    slug: 'hair-care',
    name: {
      fr: 'Soins Capillaires & Coiffure',
      en: 'Hair Care',
    },
    shortDesc: {
      fr: 'Botox capillaire, rituels à la kératine, coupes, brushing & espace barbier pour hommes.',
      en: 'Hair botox, deep keratin masks, styling, blowouts & traditional men’s barber lounge.',
    },
    overviewTitle: {
      fr: 'Sublimation du cheveu et art de la coiffure',
      en: 'High-performance hair wellness & styling',
    },
    overviewDesc: {
      fr: "Un salon élégant pensé pour les exigences capillaires féminines et masculines. Soins restructurants intensifs au botox et caviar pour cheveux abîmés, brushings impeccables, ainsi qu'un espace barbier dédié aux hommes pour la coupe, la barbe à la serviette chaude et les soins du visage.",
      en: 'An intimate salon crafted for tailored ladies styling and traditional gentlemen grooming. Intensive restorative botox and caviar hair treatments, long-lasting blowouts, alongside an authentic men’s barber suite featuring hot towel shaves and beard care.',
    },
    whoItsFor: {
      fr: [
        'Cheveux secs ou sensibilisés',
        'Coiffage & occasions spéciales',
        'Entretien de barbe & coupe homme',
        'Régénération capillaire intense',
      ],
      en: [
        'Dry, brittle or damaged hair',
        'Event styling & blowouts',
        'Men’s precision beard grooming',
        'Intensive fiber reconstruction',
      ],
    },
    keyHighlights: {
      fr: [
        'Espace coiffure femmes & barbier hommes dédiés',
        'Traitements Botox & Kératine certifiés',
        'Fauteuils bacs confortables',
        'Diagnostic capillaire professionnel',
      ],
      en: [
        'Dedicated ladies salon & gentlemen barber',
        'Certified Botox and Keratin formulas',
        'Ergonomic luxury wash basins',
        'Professional hair diagnostic',
      ],
    },
    thumbnail: SPA_IMAGES.hairCareReference,
    heroImage: SPA_IMAGES.interiorWarm,
    sourceCategoryIds: ['hair', 'barber'],
    durationHint: { fr: '15 · 30 · 60 min', en: '15 · 30 · 60 min' },
    priceStartingMAD: 50,
  },
  {
    id: 'beauty-nails',
    slug: 'beauty-nails',
    name: {
      fr: 'Beauté & Ongles',
      en: 'Beauty & Nails',
    },
    shortDesc: {
      fr: 'Manucure & pédicure spa, vernis semi-permanent, gel & bains adoucissants à la paraffine.',
      en: 'Spa manicure & pedicure, long-lasting gel, semi-permanent polish & paraffin baths.',
    },
    overviewTitle: {
      fr: 'L’élégance jusqu’au bout des ongles',
      en: 'Meticulous spa nail rituals & hand-foot care',
    },
    overviewDesc: {
      fr: "Un espace cocon dédié à la beauté des mains et des pieds. Fauteuils massants grand confort, bains relaxants aux sels marins, gommage doux, manucure et pédicure russes soignées, et un vaste choix de teintes de vernis classiques et semi-permanents de renommée internationale.",
      en: 'A relaxing haven dedicated to hand and foot aesthetics. Plush massage chairs, softening sea salt soaks, gentle sugar scrubs, precise Russian manicure techniques, and a curated palette of long-lasting semi-permanent and classic lacquers.',
    },
    whoItsFor: {
      fr: [
        'Mains et pieds soignés au quotidien',
        'Événements, mariages & soirées',
        'Pieds fatigués & callosités',
        'Tenue longue durée semi-permanente',
      ],
      en: [
        'Everyday pristine grooming',
        'Weddings & special occasions',
        'Tired feet & smoothing callous care',
        'Chip-resistant gel manicure',
      ],
    },
    keyHighlights: {
      fr: [
        'Instruments stérilisés sous sachets médicaux',
        'Vernis gel longue tenue sans solvants agressifs',
        'Bain de paraffine nourrissant',
        'Fauteuils spa avec massage intégré',
      ],
      en: [
        'Autoclave sterilized medical-grade tools',
        'Gentle non-toxic long-wear gel polishes',
        'Deeply nourishing warm paraffin baths',
        'Hydro-pedicure spa massage armchairs',
      ],
    },
    thumbnail: SPA_IMAGES.beautyNailsReference,
    heroImage: SPA_IMAGES.spaBeatyArea,
    sourceCategoryIds: ['hands-feet'],
    durationHint: { fr: '30 · 60 · 90 min', en: '30 · 60 · 90 min' },
    priceStartingMAD: 50,
  },
  {
    id: 'spa-packages',
    slug: 'spa-packages',
    name: {
      fr: 'Packs Signature & Rituels',
      en: 'Spa Packages',
    },
    shortDesc: {
      fr: 'Voyages sensoriels complets de 2h à 5h associant hammam impérial, massage & soins d’exception.',
      en: 'Curated 2h to 5h immersions combining imperial hammam, master massage & facial care.',
    },
    overviewTitle: {
      fr: 'L’immersion ultime dans le sanctuaire',
      en: 'The definitive all-inclusive sanctuary journeys',
    },
    overviewDesc: {
      fr: "Nos grands forfaits signature réunissent le meilleur du sanctuaire en une expérience fluide et sans interruption. Du forfait Silver au prestigieux Royal Package ou Rituel Mariée, chaque formule associe hammam privé sous voûte de sel, gommage authentique, massage complet et pause gourmande au lounge de repos.",
      en: 'Our flagship signature packages orchestrate the finest elements of Sabon Spa into one seamless, unforgettable escape. From our Silver experience to the imperial Royal Package and Bridal Prestige, each program unites private salt-vault thermal hammams, artisanal scrubs, full-body massage, and tranquility lounge moments.',
    },
    whoItsFor: {
      fr: [
        'Cadeau & célébration en duo',
        'Mariage & enterrement de vie de jeune fille',
        'Demi-journée de régénération totale',
        'Expérience spa tout-en-un',
      ],
      en: [
        'Couples celebration & luxury gifts',
        'Bridal prestige & pampering',
        'Half-day full mind-body renewal',
        'All-in-one comprehensive journey',
      ],
    },
    keyHighlights: {
      fr: [
        'Séances privatisées de 2h à 5h',
        'Hammam + Gommage + Massage + Soin',
        'Lounge privatif & dégustation de thé',
        'Tarifs avantageux par rapport aux soins séparés',
      ],
      en: [
        'Private journeys from 2h to 5h',
        'Hammam + Exfoliation + Massage + Care',
        'Private relaxation lounge with tea & treats',
        'Significant package savings vs individual care',
      ],
    },
    thumbnail: SPA_IMAGES.hammamStarlight,
    heroImage: SPA_IMAGES.bluePoolJacuzzi,
    sourceCategoryIds: ['packs'],
    durationHint: { fr: '2h à 5h', en: '2h to 5h' },
    priceStartingMAD: 400,
  },
  {
    id: 'hair-removal',
    slug: 'hair-removal',
    name: {
      fr: 'Épilation & Douceur',
      en: 'Hair Removal',
    },
    shortDesc: {
      fr: 'Cires tièdes hypoallergéniques, épilation orientale au sucre & finitions précises au fil.',
      en: 'Gentle warm hypoallergenic waxes, oriental sugaring & precision threading.',
    },
    overviewTitle: {
      fr: 'Une peau parfaitement lisse et soyeuse',
      en: 'Flawless smoothness with sensitive skin care',
    },
    overviewDesc: {
      fr: "Des méthodes d'épilation éprouvées garantissant une netteté impeccable tout en respectant l'équilibre cutané. Cires tièdes enrichies en agents apaisants, cire orientale traditionnelle et épilation au fil pour le visage, réalisées dans l'intimité de nos cabines individuelles avec des soins post-épilatoires calmants.",
      en: 'Meticulous hair removal rituals ensuring silky-smooth results while respecting sensitive epidermal balance. Hypoallergenic warm waxes enriched with calming extracts, traditional oriental sugar pastes, and precision facial threading performed in private treatment suites.',
    },
    whoItsFor: {
      fr: [
        'Épilation nette et durable',
        'Peaux sensibles & réactives',
        'Ligne des sourcils & duvet visage',
        'Zones ciblées ou corps complet',
      ],
      en: [
        'Long-lasting clean skin smoothness',
        'Sensitive and delicate skin types',
        'Precision brow shaping & facial zones',
        'Targeted areas or full-body wax',
      ],
    },
    keyHighlights: {
      fr: [
        'Cires tièdes à usage unique hygiéniques',
        'Cabines individuelles privées et climatisées',
        'Application d’huile apaisante à la camomille',
        'Ailes séparées pour femmes et hommes',
      ],
      en: [
        '100% single-use hygienic wax cartridges',
        'Private climate-controlled suites',
        'Soothing post-wax chamomile elixir',
        'Separate dedicated wings for women and men',
      ],
    },
    thumbnail: SPA_IMAGES.freshaTreatment,
    heroImage: SPA_IMAGES.socialDarkWarm,
    sourceCategoryIds: ['waxing'],
    durationHint: { fr: '10 · 20 · 60 min', en: '10 · 20 · 60 min' },
    priceStartingMAD: 50,
  },
];
