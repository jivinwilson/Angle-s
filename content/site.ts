export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const site = {
  name: "Angel's",
  legalName: "Angel's Beauty Parlour",
  tagline: { en: "Where Every Drape Becomes Elegance", ml: "ഓരോ ഞൊറിയും ചാരുതയാകുന്നിടം" },
  phone: "+919446129996",
  phoneDisplay: "+91 94461 29996",
  whatsapp: "919446129996",
  instagram: { handle: "vijishawilson76", url: "https://www.instagram.com/vijishawilson76/" },
  founder: "Merlin Sanoj",
  stylist: "Vijisha",
  years: 25,
  location: {
    locality: "Manimooly",
    town: "Nilambur",
    district: "Malappuram",
    region: "Kerala",
    country: "IN",
  },
  hours: { open: "10:00", close: "17:00", days: "daily" },
  callHours: { from: 10, to: 20 },
};
