import * as viJson from "@/assets/locale/vi.json";
import * as enJson from "@/assets/locale/en.json";
import * as koJson from "@/assets/locale/ko.json";

export default defineI18nConfig(() => ({
  legacy: false,
  warnHtmlMessage: false,
  globalInjection: true,
  allowComposition: true,
  messages: {
    vi: viJson,
    en: enJson,
    ko: koJson,
  },
}));
