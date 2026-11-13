/**
 * Spa Sabon — Centralized image manifest.
 * All paths go through getAssetUrl() so they resolve correctly on GitHub Pages (/sabon-spa/ subpath).
 */
import { getAssetUrl } from '../utils/assets';

// ─── Helper ──────────────────────────────────────────────────────────────────
const spa = (file: string) => getAssetUrl(`spa/${file}`);
const img = (file: string) => getAssetUrl(`images/${file}`);

// ─── Spa Interior — High-Resolution HDR Shots ────────────────────────────────
export const SPA_IMAGES = {
  // Lounge / Reception
  loungeReception:    spa('lounge-reception.jpg'),     // Warm pink lounge, pink sofa, blossom tree
  interiorWarm:       spa('interior-warm.jpg'),         // Mixed warm interior, varied zones
  spaBeatyArea:       spa('spa-beauty-area.jpg'),       // Beauty treatment area, warm pink

  // Hammam
  hammamMarble:       spa('hammam-marble.jpg'),         // Bright marble/white tiles, well-lit
  hammamBlueTiles:    spa('hammam-blue-tiles.jpg'),     // Hammam with blue tiles
  hammamWaterAmber:   spa('hammam-water-amber.jpg'),    // Hammam with water + warm amber lighting
  hammamTreatment:    spa('hammam-treatment.jpg'),      // Dark hammam treatment room
  hammamPanorama:     spa('hammam-panorama.jpg'),       // Panoramic hammam view
  hammamStarlight:    spa('hammam-starlight.jpg'),      // Very dark, starlight ceiling effect

  // Pools / Jacuzzi
  bluePoolJacuzzi:    spa('blue-pool-jacuzzi.jpg'),     // Dominant blue — jacuzzi pool
  spafireAmbiance:    spa('spa-fire-ambiance.jpg'),     // Warm amber/fire-lit atmosphere

  // Treatments
  massageCandle:      spa('massage-candle.jpg'),        // Dark candlelit massage room
  massageReference:   spa('massage-reference.jpg'),     // Official reference massage treatment photo

  // Fresha marketing shots
  freshaTreatment:    spa('fresha-treatment.jpg'),      // Pinkish, treatment-related
  freshaMassageCandle: spa('fresha-massage-candle.jpg'), // Candle-lit massage setting
  freshaBeautyClean:  spa('fresha-beauty-clean.jpg'),  // Clean spa/nail/beauty area
  beautyNailsReference: spa('beauty-nails-reference.jpg'), // Official reference beauty & nails photo
  hairCareReference:    spa('hair-care-reference.jpg'),    // Official reference hair care photo
  freshaJacuzziBlue:  spa('fresha-jacuzzi-blue.jpg'),  // Jacuzzi blue water (bright)

  // Social / Portrait
  socialDarkWarm:        spa('social-dark-warm.jpg'),
  socialAmberTreatment:  spa('social-amber-treatment.jpg'),
  socialServicePhoto:    spa('social-service-photo.jpg'),
  socialSpaProducts:     spa('social-spa-products.jpg'),
  socialInteriorPortrait: spa('social-interior-portrait.jpg'),
  socialBrightInterior:  spa('social-bright-interior.jpg'),
  socialHammamArt:       spa('social-hammam-art.jpg'),
  socialDramaticSpa:     spa('social-dramatic-spa.jpg'),

  // People & Products
  team:         spa('team.jpg'),
  spaProducts:  spa('spa-products.jpg'),

  // Legacy public/images (kept for backward compatibility)
  legacyLounge:        img('lounge.jpg'),
  legacyHammamVault:   img('hammam-vault.jpg'),
  legacyHammamBlue:    img('hammam-blue.jpg'),
  legacySauna:         img('sauna.jpg'),
  legacyDetailMassage: img('detail-massage.jpg'),
  legacyFacialGlow:    img('facial-glow.jpg'),
  legacyRitualSoak:    img('ritual-soak.jpg'),
  legacyTreatmentCandle: img('treatment-candle.jpg'),
};

// ─── Category Header Images ────────────────────────────────────────────────
export const CATEGORY_IMAGES: Record<string, string> = {
  'spa-packages':     SPA_IMAGES.hammamStarlight,
  'kids-packages':    SPA_IMAGES.freshaBeautyClean,
  'hammam-body':      SPA_IMAGES.hammamBlueTiles,
  'massage':          SPA_IMAGES.massageCandle,
  'facial':           SPA_IMAGES.socialSpaProducts,
  'manicure-pedicure': SPA_IMAGES.freshaBeautyClean,
  'lashes-brows':     SPA_IMAGES.socialBrightInterior,
  'hair-services':    SPA_IMAGES.socialAmberTreatment,
  'hair-treatments':  SPA_IMAGES.interiorWarm,
  'organic-products': SPA_IMAGES.spaProducts,
  'extras':           SPA_IMAGES.hammamPanorama,
};

// ─── Full Gallery (all 24 unique photos, excluding team) ─────────────────────
export interface GalleryPhoto {
  src: string;
  title: { fr: string; en: string };
  category: { fr: string; en: string };
  tall?: boolean;  // hint for masonry layout
  wide?: boolean;
}

export const FULL_GALLERY: GalleryPhoto[] = [
  {
    src: SPA_IMAGES.bluePoolJacuzzi,
    title: { fr: 'Piscine & Jacuzzi Bleu Profond', en: 'Deep Blue Pool & Jacuzzi' },
    category: { fr: 'Hydrothérapie', en: 'Hydrotherapy' },
    wide: true
  },
  {
    src: SPA_IMAGES.hammamStarlight,
    title: { fr: 'Voûte Étoilée — Hammam Royal', en: 'Starlight Vault — Royal Hammam' },
    category: { fr: 'Hammam', en: 'Hammam' },
    tall: true
  },
  {
    src: SPA_IMAGES.loungeReception,
    title: { fr: 'Lounge d\'Accueil & Velours Rose', en: 'Welcome Lounge & Blush Velvet' },
    category: { fr: 'Architecture & Accueil', en: 'Architecture & Lounge' }
  },
  {
    src: SPA_IMAGES.massageCandle,
    title: { fr: 'Suite de Massage aux Bougies', en: 'Candlelit Massage Suite' },
    category: { fr: 'Massages & Rituels', en: 'Massages & Rituals' },
    tall: true
  },
  {
    src: SPA_IMAGES.hammamBlueTiles,
    title: { fr: 'Sanctuaire aux Carreaux Bleus', en: 'Blue Tile Hammam Sanctuary' },
    category: { fr: 'Hammam', en: 'Hammam' }
  },
  {
    src: SPA_IMAGES.freshaJacuzziBlue,
    title: { fr: 'Bassin Jacuzzi — Eau Cristalline', en: 'Jacuzzi Pool — Crystal Waters' },
    category: { fr: 'Hydrothérapie', en: 'Hydrotherapy' }
  },
  {
    src: SPA_IMAGES.spafireAmbiance,
    title: { fr: 'Ambiance Feu & Ombre', en: 'Fire & Shadow Ambiance' },
    category: { fr: 'Espaces Privés', en: 'Private Suites' },
    wide: true
  },
  {
    src: SPA_IMAGES.hammamMarble,
    title: { fr: 'Hammam en Marbre Blanc', en: 'White Marble Hammam' },
    category: { fr: 'Hammam', en: 'Hammam' }
  },
  {
    src: SPA_IMAGES.hammamWaterAmber,
    title: { fr: 'Eau & Lumière Ambrée', en: 'Water & Amber Light' },
    category: { fr: 'Hammam', en: 'Hammam' }
  },
  {
    src: SPA_IMAGES.freshaBeautyClean,
    title: { fr: 'Espace Beauté & Soins', en: 'Beauty & Treatment Space' },
    category: { fr: 'Beauté & Éclat', en: 'Beauty & Glow' }
  },
  {
    src: SPA_IMAGES.hammamTreatment,
    title: { fr: 'Cabine de Soin Privée', en: 'Private Treatment Suite' },
    category: { fr: 'Hammam', en: 'Hammam' },
    tall: true
  },
  {
    src: SPA_IMAGES.freshaMassageCandle,
    title: { fr: 'Massage aux Bougies', en: 'Candlelit Massage' },
    category: { fr: 'Massages & Rituels', en: 'Massages & Rituals' }
  },
  {
    src: SPA_IMAGES.hammamPanorama,
    title: { fr: 'Vue Panoramique du Hammam', en: 'Hammam Panoramic View' },
    category: { fr: 'Hammam', en: 'Hammam' },
    wide: true
  },
  {
    src: SPA_IMAGES.socialDramaticSpa,
    title: { fr: 'Atmosphère Dramatique', en: 'Dramatic Spa Atmosphere' },
    category: { fr: 'Espaces Privés', en: 'Private Suites' }
  },
  {
    src: SPA_IMAGES.socialServicePhoto,
    title: { fr: 'Rituels & Soins Signatures', en: 'Signature Rituals & Care' },
    category: { fr: 'Soins', en: 'Treatments' }
  },
  {
    src: SPA_IMAGES.socialSpaProducts,
    title: { fr: 'Produits Naturels & Organiques', en: 'Natural & Organic Products' },
    category: { fr: 'Beauté & Éclat', en: 'Beauty & Glow' }
  },
  {
    src: SPA_IMAGES.socialBrightInterior,
    title: { fr: 'Intérieur Lumineux & Épuré', en: 'Bright & Clean Interior' },
    category: { fr: 'Architecture & Accueil', en: 'Architecture & Lounge' }
  },
  {
    src: SPA_IMAGES.socialInteriorPortrait,
    title: { fr: 'Esprit du Sanctuaire', en: 'The Sanctuary Spirit' },
    category: { fr: 'Architecture & Accueil', en: 'Architecture & Lounge' },
    tall: true
  },
  {
    src: SPA_IMAGES.freshaTreatment,
    title: { fr: 'Soins du Visage & Corps', en: 'Face & Body Treatments' },
    category: { fr: 'Soins', en: 'Treatments' }
  },
  {
    src: SPA_IMAGES.socialHammamArt,
    title: { fr: 'Art Traditionnel Marocain', en: 'Traditional Moroccan Art' },
    category: { fr: 'Hammam', en: 'Hammam' }
  },
];
