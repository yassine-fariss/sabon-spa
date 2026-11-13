import { Language } from '../types';

export const WHATSAPP_NUMBER = '212600437982';

/**
 * Generates an official, URL-encoded WhatsApp reservation link.
 * If a service or package name is provided, it customizes the pre-filled message.
 */
export const getWhatsAppUrl = (serviceOrPackName?: string, lang: Language = 'fr'): string => {
  let message = '';

  if (serviceOrPackName) {
    message = lang === 'fr'
      ? `Bonjour Sabon Spa ! Je souhaite réserver le soin : "${serviceOrPackName}". Pourriez-vous me renseigner ?`
      : `Hello Spa Sabon! I would like to book: "${serviceOrPackName}". Could you please provide me with more information?`;
  } else {
    message = lang === 'fr'
      ? 'Bonjour Sabon Spa ! Je souhaite effectuer une réservation. Pourriez-vous me renseigner ?'
      : 'Hello Spa Sabon! I would like to make a reservation. Could you please provide me with more information?';
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
