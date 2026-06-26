import i18n from 'i18next';
const { initReactI18next } = require('react-i18next');
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Velora",
      "tagline": "The Smarter Way to Shop Premium",
      "login": "Login",
      "register": "Register",
      "shop_now": "Shop Now",
      "admin_dash": "Admin Dashboard",
      "products": "Products",
      "categories": "Categories",
      "logout": "Logout"
    }
  },
  ar: {
    translation: {
      "welcome": "أهلاً بك في فيلورا",
      "tagline": "الطريقة الأذكى لتسوق المنتجات الفاخرة",
      "login": "تسجيل الدخول",
      "register": "إنشاء حساب",
      "shop_now": "تسوق الآن",
      "admin_dash": "لوحة التحكم",
      "products": "المنتجات",
      "categories": "الأقسام",
      "logout": "تسجيل الخروج"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
