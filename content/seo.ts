import type { L } from "@/lib/i18n";

type PageSeo = { title: L; description: L; image: string };

export const seo = {
  defaultTitle: "Angel's — Bridal Makeup & Saree Draping, Nilambur, Kerala",
  pages: {
    home: {
      title: { en: "Angel's — Bridal Makeup & Saree Draping in Nilambur, Kerala", ml: "Angel's — ബ്രൈഡൽ മേക്കപ്പ് & സാരി ഡ്രേപ്പിംഗ്, നിലമ്പൂർ" },
      description: {
        en: "Bridal makeup, hair and saree draping — Kanjeevaram and Kerala kasavu — by Angel's Beauty Parlour, Nilambur. 25 years of experience. Enquire on WhatsApp.",
        ml: "ബ്രൈഡൽ മേക്കപ്പ്, ഹെയർ, സാരി ഡ്രേപ്പിംഗ് — കാഞ്ചീപുരം, കേരള കസവ് — 25 വർഷത്തെ അനുഭവവുമായി ഏഞ്ചൽസ് ബ്യൂട്ടി പാർലർ, നിലമ്പൂർ. വാട്സ്ആപ്പിൽ അന്വേഷിക്കൂ.",
      },
      image: "hero-desktop",
    },
    services: {
      title: { en: "Bridal Makeup, Saree Draping & Styling Services", ml: "ബ്രൈഡൽ മേക്കപ്പ്, സാരി ഡ്രേപ്പിംഗ്, സ്റ്റൈലിംഗ് സേവനങ്ങൾ" },
      description: {
        en: "Bridal makeup and hair, engagement and party makeup, bridal saree draping, Kanjeevaram and Kerala kasavu draping and occasion styling — Angel's, Nilambur, Kerala.",
        ml: "ബ്രൈഡൽ മേക്കപ്പ്, ഹെയർ, നിശ്ചയ-പാർട്ടി മേക്കപ്പ്, ബ്രൈഡൽ സാരി ഡ്രേപ്പിംഗ്, കാഞ്ചീപുരം, കേരള കസവ് — Angel's, നിലമ്പൂർ.",
      },
      image: "bridal-feature",
    },
    lookbook: {
      title: { en: "Lookbook — Bridal Makeup & Saree Styling Inspiration", ml: "ലുക്ക്ബുക്ക് — ബ്രൈഡൽ മേക്കപ്പ്, സാരി സ്റ്റൈലിംഗ് പ്രചോദനം" },
      description: {
        en: "Styling inspiration for bridal makeup and hair, Kanjeevaram bridal sarees, Kerala kasavu and reception looks. Share a look with Angel's on WhatsApp.",
        ml: "ബ്രൈഡൽ മേക്കപ്പ്, ഹെയർ, കാഞ്ചീപുരം ബ്രൈഡൽ സാരി, കേരള കസവ്, റിസപ്ഷൻ ലുക്കുകൾ — സ്റ്റൈലിംഗ് പ്രചോദനം.",
      },
      image: "svc-kanjeevaram-bridal",
    },
    about: {
      title: { en: "About — 25 Years of Bridal Makeup & Draping in Nilambur", ml: "ഞങ്ങളെക്കുറിച്ച് — നിലമ്പൂരിൽ 25 വർഷത്തെ ബ്രൈഡൽ മേക്കപ്പ്" },
      description: {
        en: "Angel's grew from Angel's Beauty Parlour in Manimooly, Nilambur, founded by Merlin Sanoj — 25 years of bridal makeup and saree draping for weddings and church functions.",
        ml: "മെർലിൻ സനോജ് സ്ഥാപിച്ച മണിമൂളിയിലെ ഏഞ്ചൽസ് ബ്യൂട്ടി പാർലറിൽ നിന്ന് — 25 വർഷത്തെ ബ്രൈഡൽ മേക്കപ്പും സാരി ഡ്രേപ്പിംഗും.",
      },
      image: "artistry-consult",
    },
    contact: {
      title: { en: "Contact — WhatsApp, Call or Visit in Nilambur", ml: "ബന്ധപ്പെടുക — വാട്സ്ആപ്പ്, ഫോൺ, നിലമ്പൂർ" },
      description: {
        en: "Enquire about bridal makeup and saree draping on WhatsApp +91 94461 29996. Angel's Beauty Parlour, Manimooly, Nilambur, Malappuram — serving all of Kerala.",
        ml: "ബ്രൈഡൽ മേക്കപ്പിനും സാരി ഡ്രേപ്പിംഗിനും വാട്സ്ആപ്പ് +91 94461 29996. ഏഞ്ചൽസ് ബ്യൂട്ടി പാർലർ, മണിമൂളി, നിലമ്പൂർ — കേരളമെമ്പാടും.",
      },
      image: "enquiry-bg",
    },
  } satisfies Record<string, PageSeo>,
  verification: { google: "", bing: "" },
};

export const banner = {
  show: false,
  text: { en: "", ml: "" },
  link: "",
  linkLabel: { en: "", ml: "" },
};
