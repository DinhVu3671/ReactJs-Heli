import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
 
import { TRANSLATIONS_VI } from "./vi/translation";
import { TRANSLATIONS_EN } from "./en/translation";
import i18next from "i18next";
 

function changL() {
  if(i18next.language == 'en') i18next.language = 'en'
  else i18next.language = 'vi';
}

i18n
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: changL(),
   resources: {
     en: {
       translation: TRANSLATIONS_EN
     },
     vi: {
       translation: TRANSLATIONS_VI
     }
   }
 });
 console.log(i18next.language);

export default i18n;