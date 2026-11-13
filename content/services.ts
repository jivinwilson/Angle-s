import type { L } from "@/lib/i18n";

export type ServiceGroup = "bridal" | "traditional" | "occasion" | "preparation" | "beauty" | "bespoke";

export type Service = {
  slug: string;
  group: ServiceGroup;
  image: string;
  visible: boolean;
  name: L;
  short: L;
  intro: L;
  includes: L<string[]>;
  keywords: string[];
};

export const groups: Record<ServiceGroup, L> = {
  bridal: { en: "Bridal", ml: "ബ്രൈഡൽ" },
  traditional: { en: "Traditional", ml: "പരമ്പരാഗതം" },
  occasion: { en: "Occasions", ml: "ആഘോഷങ്ങൾ" },
  preparation: { en: "Preparation", ml: "ഒരുക്കം" },
  beauty: { en: "Beauty", ml: "സൗന്ദര്യം" },
  bespoke: { en: "Bespoke", ml: "പ്രത്യേകം" },
};

export const services: Service[] = [
  {
    slug: "bridal-saree-draping",
    group: "bridal",
    image: "svc-bridal-saree-draping",
    visible: true,
    name: { en: "Bridal Saree Draping", ml: "ബ്രൈഡൽ സാരി ഡ്രേപ്പിംഗ്" },
    short: { en: "Flawless pleats and a pallu that stays perfect from muhurtham to the last photograph.", ml: "മുഹൂർത്തം മുതൽ അവസാന ഫോട്ടോ വരെ ഭംഗി ചോരാത്ത ഞൊറികളും പല്ലുവും." },
    intro: {
      en: "Your wedding saree deserves hands that understand silk. We drape it to your body, your jewellery and your ceremony — precise pleats, a pallu that frames you, and pinning that holds through every ritual, embrace and photograph.",
      ml: "നിങ്ങളുടെ വിവാഹസാരിക്ക് പട്ടിനെ അറിയുന്ന കൈകൾ വേണം. നിങ്ങളുടെ ശരീരത്തിനും ആഭരണങ്ങൾക്കും ചടങ്ങിനും ഇണങ്ങും വിധം ഞങ്ങൾ സാരി ഉടുപ്പിക്കുന്നു — കൃത്യമായ ഞൊറികൾ, മുഖത്തിന് ചേരുന്ന പല്ലു, എല്ലാ ചടങ്ങുകളിലും ഉറച്ചുനിൽക്കുന്ന പിന്നിംഗ്.",
    },
    includes: {
      en: ["Pleating and pallu setting for your bridal saree", "Secure, comfortable pinning for long ceremonies", "Draping planned around your jewellery and blouse"],
      ml: ["വിവാഹസാരിയുടെ ഞൊറിയും പല്ലുവും ഒരുക്കൽ", "നീണ്ട ചടങ്ങുകൾക്ക് സുഖകരവും ഉറപ്പുള്ളതുമായ പിന്നിംഗ്", "ആഭരണങ്ങൾക്കും ബ്ലൗസിനും ഇണങ്ങുന്ന ഡ്രേപ്പിംഗ്"],
    },
    keywords: ["bridal saree draping Kerala", "wedding saree draping"],
  },
  {
    slug: "kanjeevaram-bridal-draping",
    group: "bridal",
    image: "svc-kanjeevaram-bridal",
    visible: true,
    name: { en: "Kanjeevaram Bridal Draping", ml: "കാഞ്ചീപുരം ബ്രൈഡൽ ഡ്രേപ്പിംഗ്" },
    short: { en: "Heavy silk, handled with patience — crisp pleats and a regal fall.", ml: "കനമുള്ള പട്ട്, ക്ഷമയോടെ — വടിവൊത്ത ഞൊറികളും രാജകീയമായ വീഴ്ചയും." },
    intro: {
      en: "Kanjeevaram silk is heavy, structured and unforgiving of hurried hands. We work with its weight — setting deep, even pleats, aligning the zari border and balancing the pallu so the saree looks as magnificent as it was woven to be.",
      ml: "കാഞ്ചീപുരം പട്ട് കനമുള്ളതാണ്; തിടുക്കമുള്ള കൈകളോട് അത് പൊറുക്കില്ല. അതിന്റെ കനത്തിനൊപ്പം ഞങ്ങൾ പ്രവർത്തിക്കുന്നു — ആഴമുള്ള സമമായ ഞൊറികൾ, ഒത്തുചേരുന്ന കസവ് കര, സന്തുലിതമായ പല്ലു.",
    },
    includes: {
      en: ["Pleating suited to heavy silk", "Zari border alignment front and back", "Pallu styled open, pleated or pinned"],
      ml: ["കനമുള്ള പട്ടിന് അനുയോജ്യമായ ഞൊറി", "മുന്നിലും പിന്നിലും കസവ് കര ഒത്തുചേർക്കൽ", "തുറന്ന, ഞൊറിഞ്ഞ അല്ലെങ്കിൽ പിൻ ചെയ്ത പല്ലു"],
    },
    keywords: ["Kanjeevaram saree draping", "silk saree bridal draping"],
  },
  {
    slug: "kerala-kasavu-draping",
    group: "traditional",
    image: "svc-kerala-kasavu",
    visible: true,
    name: { en: "Kerala Style Kasavu Draping", ml: "കേരള സ്റ്റൈൽ കസവ് ഡ്രേപ്പിംഗ്" },
    short: { en: "The quiet grace of ivory and gold, draped the Kerala way.", ml: "ഐവറിയുടെയും സ്വർണ്ണത്തിന്റെയും ശാന്തമായ ചാരുത, കേരളീയ രീതിയിൽ." },
    intro: {
      en: "Kerala kasavu is about restraint — clean lines, a crisp gold border and an easy, dignified fall. Whether it is a wedding, Onam or a temple visit, we drape it neatly so the border sits exactly where it should.",
      ml: "കസവ് സാരിയുടെ ഭംഗി അതിന്റെ ലാളിത്യത്തിലാണ് — വൃത്തിയുള്ള വരകൾ, തിളങ്ങുന്ന കസവ് കര, ശാന്തമായ വീഴ്ച. വിവാഹമായാലും ഓണമായാലും ക്ഷേത്രദർശനമായാലും കര കൃത്യമായി വരുന്ന രീതിയിൽ ഞങ്ങൾ ഉടുപ്പിക്കുന്നു.",
    },
    includes: {
      en: ["Traditional kasavu saree draping", "Set mundu styling on request", "Neat finishing for cotton and tissue fabrics"],
      ml: ["പരമ്പരാഗത കസവ് സാരി ഡ്രേപ്പിംഗ്", "ആവശ്യമെങ്കിൽ സെറ്റ് മുണ്ട് സ്റ്റൈലിംഗ്", "കോട്ടൺ, ടിഷ്യു തുണികൾക്ക് വൃത്തിയുള്ള ഫിനിഷ്"],
    },
    keywords: ["Kerala saree draping", "kasavu saree draping"],
  },
  {
    slug: "christian-bridal-saree-draping",
    group: "bridal",
    image: "svc-bridal-package",
    visible: true,
    name: { en: "Christian Bridal Saree Draping", ml: "ക്രിസ്ത്യൻ ബ്രൈഡൽ സാരി ഡ്രേപ്പിംഗ്" },
    short: { en: "Ivory, gold and veil — draped with care for the church and the reception.", ml: "ഐവറിയും സ്വർണ്ണവും വെയിലും — പള്ളിക്കും റിസപ്ഷനും ശ്രദ്ധയോടെ." },
    intro: {
      en: "From years of styling brides for church weddings, we know how a saree must move down an aisle. We drape for elegance and comfort, and set the veil so it sits beautifully with the pallu through the ceremony.",
      ml: "പള്ളിക്കല്യാണങ്ങൾക്കായി വർഷങ്ങളായി വധുക്കളെ ഒരുക്കിയ അനുഭവത്തിൽ നിന്ന്, ഇടനാഴിയിലൂടെ നടക്കുമ്പോൾ സാരി എങ്ങനെ ഒഴുകണമെന്ന് ഞങ്ങൾക്കറിയാം. ചാരുതയും സൗകര്യവും ചേർത്ത് ഉടുപ്പിച്ച്, പല്ലുവിനൊപ്പം വെയിൽ ഭംഗിയായി ഉറപ്പിക്കുന്നു.",
    },
    includes: {
      en: ["Bridal saree draping for the church ceremony", "Veil setting with the pallu", "Re-styling for the reception on request"],
      ml: ["പള്ളിച്ചടങ്ങിനുള്ള ബ്രൈഡൽ സാരി ഡ്രേപ്പിംഗ്", "പല്ലുവിനൊപ്പം വെയിൽ ഒരുക്കൽ", "ആവശ്യമെങ്കിൽ റിസപ്ഷന് വീണ്ടും സ്റ്റൈലിംഗ്"],
    },
    keywords: ["Christian bridal saree draping Kerala", "church wedding saree styling"],
  },
  {
    slug: "hindu-bridal-draping",
    group: "bridal",
    image: "bridal-feature",
    visible: true,
    name: { en: "Hindu Bridal Draping", ml: "ഹിന്ദു ബ്രൈഡൽ ഡ്രേപ്പിംഗ്" },
    short: { en: "Traditional bridal drapes that honour every ritual.", ml: "ഓരോ ചടങ്ങിനെയും മാനിക്കുന്ന പരമ്പരാഗത ബ്രൈഡൽ ഡ്രേപ്പിംഗ്." },
    intro: {
      en: "Kerala Hindu weddings ask a lot of a saree — sitting, walking around the mandapam, garlands, and hours of photographs. We drape so you look composed and feel comfortable through all of it.",
      ml: "കേരള ഹിന്ദു വിവാഹങ്ങളിൽ സാരിക്ക് ഒരുപാട് താങ്ങണം — ഇരിപ്പ്, മണ്ഡപ പ്രദക്ഷിണം, മാല, മണിക്കൂറുകൾ നീളുന്ന ഫോട്ടോകൾ. ഇതിനെല്ലാമിടയിലും നിങ്ങൾ ഭംഗിയായും സുഖമായും ഇരിക്കും വിധം ഞങ്ങൾ ഉടുപ്പിക്കുന്നു.",
    },
    includes: {
      en: ["Bridal draping for Kerala Hindu ceremonies", "Draping that allows sitting and movement", "Coordination with jewellery and flowers"],
      ml: ["കേരള ഹിന്ദു ചടങ്ങുകൾക്കുള്ള ബ്രൈഡൽ ഡ്രേപ്പിംഗ്", "ഇരിക്കാനും നടക്കാനും സൗകര്യമുള്ള ഡ്രേപ്പിംഗ്", "ആഭരണങ്ങൾക്കും പൂക്കൾക്കും ഇണങ്ങുന്ന ഒരുക്കം"],
    },
    keywords: ["Hindu bridal saree draping Kerala"],
  },
  {
    slug: "muslim-bridal-draping",
    group: "bridal",
    image: "lookbook-03",
    visible: true,
    name: { en: "Muslim Bridal Draping & Dupatta Setting", ml: "മുസ്ലിം ബ്രൈഡൽ ഡ്രേപ്പിംഗും ദുപ്പട്ട സെറ്റിംഗും" },
    short: { en: "Graceful saree and dupatta setting, secure and beautifully framed.", ml: "ഭംഗിയുള്ളതും ഉറപ്പുള്ളതുമായ സാരി, ദുപ്പട്ട സെറ്റിംഗ്." },
    intro: {
      en: "A bridal dupatta or head drape has to frame the face, stay in place and still feel light. We set saree and dupatta together so the whole look is balanced, modest where you want it, and comfortable all day.",
      ml: "വധുവിന്റെ ദുപ്പട്ട മുഖത്തിന് ഭംഗി നൽകണം, ഇളകാതെ നിൽക്കണം, എന്നിട്ടും ഭാരം തോന്നരുത്. സാരിയും ദുപ്പട്ടയും ഒരുമിച്ച് ഒരുക്കി, ദിവസം മുഴുവൻ സുഖകരമായ സന്തുലിതമായ ലുക്ക് ഞങ്ങൾ നൽകുന്നു.",
    },
    includes: {
      en: ["Bridal saree draping", "Dupatta or head drape setting", "Secure pinning that stays comfortable"],
      ml: ["ബ്രൈഡൽ സാരി ഡ്രേപ്പിംഗ്", "ദുപ്പട്ട / തലമൂടൽ സെറ്റിംഗ്", "സുഖകരവും ഉറപ്പുള്ളതുമായ പിന്നിംഗ്"],
    },
    keywords: ["Muslim bridal draping Kerala", "bridal dupatta setting"],
  },
  {
    slug: "reception-saree-styling",
    group: "occasion",
    image: "occasions-feature",
    visible: true,
    name: { en: "Reception Saree Styling", ml: "റിസപ്ഷൻ സാരി സ്റ്റൈലിംഗ്" },
    short: { en: "An evening look — sleeker drapes, statement pallu, effortless glamour.", ml: "സായാഹ്ന ലുക്ക് — ഒതുക്കമുള്ള ഡ്രേപ്പ്, ശ്രദ്ധേയമായ പല്ലു." },
    intro: {
      en: "Receptions call for something different from the ceremony: a cleaner silhouette, a pallu with presence and a drape that moves well through a long evening. We style it to suit the venue, the lights and you.",
      ml: "റിസപ്ഷന് വിവാഹച്ചടങ്ങിൽ നിന്ന് വ്യത്യസ്തമായ ഒന്ന് വേണം: ഒതുക്കമുള്ള രൂപം, ശ്രദ്ധ നേടുന്ന പല്ലു, നീണ്ട സായാഹ്നത്തിലും ഒഴുക്കോടെ നിൽക്കുന്ന ഡ്രേപ്പ്. വേദിക്കും വെളിച്ചത്തിനും നിങ്ങൾക്കും ഇണങ്ങും വിധം ഞങ്ങൾ ഒരുക്കുന്നു.",
    },
    includes: {
      en: ["Contemporary and classic reception drapes", "Pallu styling for photographs and stage", "Quick change from ceremony look on request"],
      ml: ["ആധുനികവും ക്ലാസിക്കുമായ റിസപ്ഷൻ ഡ്രേപ്പുകൾ", "ഫോട്ടോയ്ക്കും വേദിക്കും പല്ലു സ്റ്റൈലിംഗ്", "ആവശ്യമെങ്കിൽ ചടങ്ങിന് ശേഷം വേഗത്തിൽ മാറ്റം"],
    },
    keywords: ["reception saree styling", "reception saree draping Kerala"],
  },
  {
    slug: "wedding-guest-saree-styling",
    group: "occasion",
    image: "lookbook-04",
    visible: true,
    name: { en: "Wedding Guest Saree Styling", ml: "വിവാഹ അതിഥി സാരി സ്റ്റൈലിംഗ്" },
    short: { en: "For the sister, the mother, the best friend — look your best, effortlessly.", ml: "സഹോദരിക്കും അമ്മയ്ക്കും കൂട്ടുകാരിക്കും — അനായാസം ഏറ്റവും ഭംഗിയായി." },
    intro: {
      en: "The people closest to the bride are in almost every photograph. We drape your saree neatly and quickly, so you can be part of the celebration rather than fixing pleats in a corner.",
      ml: "വധുവിനോട് ഏറ്റവും അടുത്തവർ മിക്കവാറും എല്ലാ ഫോട്ടോകളിലും ഉണ്ടാകും. ഞൊറി ശരിയാക്കി ഒരു മൂലയിൽ നിൽക്കാതെ ആഘോഷത്തിൽ പങ്കുചേരാൻ, ഞങ്ങൾ നിങ്ങളുടെ സാരി വൃത്തിയായും വേഗത്തിലും ഉടുപ്പിക്കുന്നു.",
    },
    includes: {
      en: ["Neat draping for silk, organza and georgette", "Style suggestions to suit the occasion", "Available for family groups"],
      ml: ["പട്ട്, ഓർഗൻസ, ജോർജറ്റ് സാരികൾക്ക് വൃത്തിയുള്ള ഡ്രേപ്പിംഗ്", "ചടങ്ങിന് ഇണങ്ങുന്ന സ്റ്റൈൽ നിർദ്ദേശങ്ങൾ", "കുടുംബാംഗങ്ങൾക്ക് ഒരുമിച്ചും ലഭ്യം"],
    },
    keywords: ["wedding guest saree draping", "saree draping for wedding"],
  },
  {
    slug: "special-occasion-styling",
    group: "occasion",
    image: "svc-saree-styling",
    visible: true,
    name: { en: "Special Occasion & Church Function Styling", ml: "വിശേഷാവസരങ്ങൾക്കും പള്ളിച്ചടങ്ങുകൾക്കും സ്റ്റൈലിംഗ്" },
    short: { en: "Engagements, holy communions, baptisms, festivals — dressed with grace.", ml: "നിശ്ചയം, ആദ്യകുർബാന, മാമ്മോദീസ, ഉത്സവങ്ങൾ — ചാരുതയോടെ." },
    intro: {
      en: "Not every important day is a wedding. For engagements, church functions, family celebrations and festivals, we style your saree so you feel confident, comfortable and completely yourself.",
      ml: "എല്ലാ പ്രധാന ദിവസങ്ങളും വിവാഹമല്ല. നിശ്ചയം, പള്ളിച്ചടങ്ങുകൾ, കുടുംബാഘോഷങ്ങൾ, ഉത്സവങ്ങൾ — ആത്മവിശ്വാസത്തോടെയും സുഖത്തോടെയും ഇരിക്കാൻ ഞങ്ങൾ നിങ്ങളുടെ സാരി ഒരുക്കുന്നു.",
    },
    includes: {
      en: ["Draping for engagements and church functions", "Festival and family celebration looks", "Makeup and hair can be added"],
      ml: ["നിശ്ചയത്തിനും പള്ളിച്ചടങ്ങുകൾക്കും ഡ്രേപ്പിംഗ്", "ഉത്സവങ്ങൾക്കും കുടുംബാഘോഷങ്ങൾക്കും ലുക്കുകൾ", "മേക്കപ്പും ഹെയറും ചേർക്കാം"],
    },
    keywords: ["saree styling for special occasions", "church function makeup Kerala"],
  },
  {
    slug: "group-family-draping",
    group: "occasion",
    image: "artistry-consult",
    visible: true,
    name: { en: "Group & Family Draping", ml: "ഗ്രൂപ്പ്, കുടുംബ ഡ്രേപ്പിംഗ്" },
    short: { en: "Bridesmaids and family, draped in harmony and on time.", ml: "ബ്രൈഡ്സ്മെയ്ഡ്സിനും കുടുംബത്തിനും — ഒത്തിണക്കത്തോടെ, സമയത്ത്." },
    intro: {
      en: "When the bride's party wears coordinated sarees, consistency matters — matching pleats, matching pallu lengths, everyone ready before the photographer arrives. Tell us how many people and we will plan the timing with you.",
      ml: "വധുവിന്റെ കൂട്ടർ ഒരേ നിറത്തിലുള്ള സാരികൾ ധരിക്കുമ്പോൾ ഏകരൂപം പ്രധാനമാണ് — ഒരേ ഞൊറികൾ, ഒരേ നീളമുള്ള പല്ലു, ഫോട്ടോഗ്രാഫർ എത്തും മുമ്പ് എല്ലാവരും തയ്യാർ. എത്ര പേരെന്ന് പറയൂ, സമയം ഞങ്ങൾ ഒരുമിച്ച് ആസൂത്രണം ചെയ്യാം.",
    },
    includes: {
      en: ["Coordinated draping for bridesmaids and family", "Time planning for larger groups", "At the parlour or your venue"],
      ml: ["ബ്രൈഡ്സ്മെയ്ഡ്സിനും കുടുംബത്തിനും ഒരേ രീതിയിൽ ഡ്രേപ്പിംഗ്", "വലിയ ഗ്രൂപ്പുകൾക്ക് സമയ ആസൂത്രണം", "പാർലറിലോ നിങ്ങളുടെ വേദിയിലോ"],
    },
    keywords: ["bridesmaid saree draping", "group saree draping Kerala"],
  },
  {
    slug: "lehenga-dupatta-setting",
    group: "occasion",
    image: "svc-accessories",
    visible: true,
    name: { en: "Lehenga & Dupatta Setting", ml: "ലെഹങ്ക, ദുപ്പട്ട സെറ്റിംഗ്" },
    short: { en: "Dupattas pleated, pinned and placed to flatter.", ml: "ഭംഗി കൂട്ടുന്ന രീതിയിൽ ഞൊറിഞ്ഞ്, പിൻ ചെയ്ത ദുപ്പട്ട." },
    intro: {
      en: "A lehenga is only as good as its dupatta. We pleat and pin it — over the shoulder, across the body or over the head — so it shows off the embroidery and stays put.",
      ml: "ലെഹങ്കയുടെ ഭംഗി ദുപ്പട്ടയിലാണ്. തോളിലൂടെയോ ശരീരത്തിന് കുറുകെയോ തലയിലൂടെയോ — ചിത്രപ്പണി തെളിഞ്ഞുകാണും വിധം ഞൊറിഞ്ഞ് ഉറപ്പിക്കുന്നു.",
    },
    includes: {
      en: ["Single or double dupatta setting", "Head and shoulder drape styles", "Pinning that protects delicate fabric"],
      ml: ["ഒന്നോ രണ്ടോ ദുപ്പട്ട സെറ്റിംഗ്", "തലയിലും തോളിലും ഡ്രേപ്പ് സ്റ്റൈലുകൾ", "നേർത്ത തുണിക്ക് കേടുവരാത്ത പിന്നിംഗ്"],
    },
    keywords: ["lehenga dupatta draping", "dupatta setting Kerala"],
  },
  {
    slug: "saree-pre-pleating",
    group: "preparation",
    image: "intro-pleats",
    visible: true,
    name: { en: "Saree Pre-pleating & Box Folding", ml: "സാരി പ്രീ-പ്ലീറ്റിംഗും ബോക്സ് ഫോൾഡിംഗും" },
    short: { en: "Pleats set in advance, so your wedding morning runs on time.", ml: "ഞൊറികൾ മുൻകൂട്ടി ഒരുക്കി, വിവാഹദിനം സമയത്തിന് മുന്നോട്ട്." },
    intro: {
      en: "We pleat, iron and fold your saree before the day, so on the morning itself it goes on in minutes and looks immaculate. Ideal for brides with tight schedules and for heavy silks.",
      ml: "ചടങ്ങിന് മുൻപേ ഞങ്ങൾ സാരി ഞൊറിഞ്ഞ്, ഇസ്തിരിയിട്ട് മടക്കിവെക്കുന്നു; അന്നേദിവസം മിനിറ്റുകൾക്കുള്ളിൽ ഉടുക്കാം, കുറ്റമറ്റ ഭംഗിയോടെ. സമയം കുറവുള്ള വധുക്കൾക്കും കനമുള്ള പട്ടുകൾക്കും ഉത്തമം.",
    },
    includes: {
      en: ["Measured pre-pleating to your height", "Pressing and box folding", "Ready-to-wear on the day"],
      ml: ["നിങ്ങളുടെ ഉയരത്തിനനുസരിച്ച് അളന്ന് ഞൊറിയൽ", "ഇസ്തിരിയിടലും ബോക്സ് ഫോൾഡിംഗും", "അന്നേദിവസം ഉടുക്കാൻ തയ്യാർ"],
    },
    keywords: ["saree pre-pleating Kerala", "saree box folding"],
  },
  {
    slug: "bridal-makeup",
    group: "beauty",
    image: "svc-bridal-makeup",
    visible: true,
    name: { en: "Bridal Makeup", ml: "ബ്രൈഡൽ മേക്കപ്പ്" },
    short: { en: "Twenty-five years of making brides look like themselves, only more radiant.", ml: "ഇരുപത്തഞ്ച് വർഷമായി വധുക്കളെ അവരായിത്തന്നെ, കൂടുതൽ തിളക്കത്തോടെ." },
    intro: {
      en: "Merlin Sanoj has been doing makeup for weddings and church functions for twenty-five years. The approach is simple: skin that looks like skin, features gently defined, and a finish that lasts through the heat and the hours.",
      ml: "മെർലിൻ സനോജ് ഇരുപത്തഞ്ച് വർഷമായി വിവാഹങ്ങൾക്കും പള്ളിച്ചടങ്ങുകൾക്കും മേക്കപ്പ് ചെയ്യുന്നു. സമീപനം ലളിതമാണ്: സ്വാഭാവികമായ ചർമ്മം, മൃദുവായി എടുത്തുകാട്ടുന്ന മുഖസവിശേഷതകൾ, ചൂടിലും മണിക്കൂറുകളിലും മായാത്ത ഫിനിഷ്.",
    },
    includes: {
      en: ["Bridal makeup for ceremony and reception", "Makeup for church functions and family members", "Look planned with your saree and jewellery"],
      ml: ["ചടങ്ങിനും റിസപ്ഷനും ബ്രൈഡൽ മേക്കപ്പ്", "പള്ളിച്ചടങ്ങുകൾക്കും കുടുംബാംഗങ്ങൾക്കും മേക്കപ്പ്", "സാരിക്കും ആഭരണങ്ങൾക്കും ഇണങ്ങുന്ന ലുക്ക്"],
    },
    keywords: ["bridal makeup Nilambur", "bridal makeup Malappuram"],
  },
  {
    slug: "hair-styling",
    group: "beauty",
    image: "svc-hair-styling",
    visible: true,
    name: { en: "Bridal Hair Styling", ml: "ബ്രൈഡൽ ഹെയർ സ്റ്റൈലിംഗ്" },
    short: { en: "Classic buns with jasmine, soft waves, veils set securely.", ml: "മുല്ലപ്പൂ ചൂടിയ ക്ലാസിക് കൊണ്ട, മൃദുവായ ചുരുളുകൾ, ഉറപ്പുള്ള വെയിൽ." },
    intro: {
      en: "From the traditional Kerala bun crowned with jasmine to softer modern styles, we create hair that complements your drape, holds your flowers and veil, and lasts the whole day.",
      ml: "മുല്ലപ്പൂ ചൂടിയ പരമ്പരാഗത കേരള കൊണ്ട മുതൽ മൃദുവായ ആധുനിക സ്റ്റൈലുകൾ വരെ — നിങ്ങളുടെ ഡ്രേപ്പിന് ഇണങ്ങുന്ന, പൂവും വെയിലും ഉറപ്പിച്ചുനിർത്തുന്ന, ദിവസം മുഴുവൻ നിലനിൽക്കുന്ന ഹെയർസ്റ്റൈൽ.",
    },
    includes: {
      en: ["Traditional buns with jasmine", "Veil and hair accessory setting", "Styles for family members"],
      ml: ["മുല്ലപ്പൂ ചൂടിയ പരമ്പരാഗത കൊണ്ട", "വെയിലും ഹെയർ ആക്സസറികളും ഉറപ്പിക്കൽ", "കുടുംബാംഗങ്ങൾക്കുള്ള സ്റ്റൈലുകൾ"],
    },
    keywords: ["bridal hairstyle Kerala", "bridal hair styling Nilambur"],
  },
  {
    slug: "custom-styling",
    group: "bespoke",
    image: "svc-bridal-consultation",
    visible: true,
    name: { en: "Custom Styling", ml: "കസ്റ്റം സ്റ്റൈലിംഗ്" },
    short: { en: "Something particular in mind? Let's plan it together.", ml: "മനസ്സിൽ പ്രത്യേകമായി എന്തെങ്കിലുമുണ്ടോ? നമുക്കൊരുമിച്ച് ആസൂത്രണം ചെയ്യാം." },
    intro: {
      en: "A family drape passed down from your grandmother, a regional style you love, a photoshoot or a look you saved months ago — tell us what you have in mind and we will work out how to make it happen.",
      ml: "മുത്തശ്ശിയിൽ നിന്ന് കൈമാറിവന്ന ഒരു ഉടുപ്പുരീതി, ഇഷ്ടപ്പെട്ട ഒരു പ്രാദേശിക സ്റ്റൈൽ, ഒരു ഫോട്ടോഷൂട്ട്, മാസങ്ങൾക്ക് മുമ്പ് സേവ് ചെയ്ത ഒരു ലുക്ക് — മനസ്സിലുള്ളത് പറയൂ, അത് എങ്ങനെ സാധ്യമാക്കാമെന്ന് ഞങ്ങൾ നോക്കാം.",
    },
    includes: {
      en: ["Consultation over WhatsApp or at the parlour", "Regional and heritage drapes", "Photoshoot styling"],
      ml: ["വാട്സ്ആപ്പിലോ പാർലറിലോ കൺസൾട്ടേഷൻ", "പ്രാദേശികവും പാരമ്പര്യവുമായ ഡ്രേപ്പുകൾ", "ഫോട്ടോഷൂട്ട് സ്റ്റൈലിംഗ്"],
    },
    keywords: ["saree styling services", "saree draping artist Kerala"],
  },
];

export const visibleServices = services.filter((s) => s.visible);
export const getService = (slug: string) => visibleServices.find((s) => s.slug === slug);
