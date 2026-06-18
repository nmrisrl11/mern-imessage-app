import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { Languages } from "./constants/languages";

i18n
	// load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
	// learn more: https://github.com/i18next/i18next-http-backend
	.use(Backend)

	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)

	// pass the i18n instance to react-i18next.
	.use(initReactI18next)

	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		supportedLngs: Languages.map((language) => language.languageCode),
		fallbackLng: Languages[0].languageCode,
		load: "currentOnly" /** Thips stops i18next from looking "en" or "zh" folders */,
		debug: import.meta.env.DEV /** Make this false in production */,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			//! Where to check for language
			/**
			 * @querystring
			 * Checks if the URL has ?lng=en-US
			 * Example: dashboard?lng=en-US
			 *
			 * @localStorage
			 * Checks if the user has visited before and chosen a language
			 * Example: localStorage key => i18nextLng
			 *
			 * @navigator
			 * Checks the browser's system settings (e.g., "English (US)")
			 */
			order: ["querystring", "localStorage", "navigator"],

			//! Where to store the user's preference?
			caches: ["localStorage"],

			//! Key names
			lookupQuerystring: "lng",
			lookupLocalStorage: "i18nextLng",
		},

		// Optional: backend options if you change the path
		// backend: {
		//   loadPath: '/locales/{{lng}}/{{ns}}.json',
		// }
	});

export default i18n;
