import { systemeDesignAr } from "./ar-systeme-design";
import type { Dictionnaire } from "./fr";

/** نصوص الواجهة بالعربية. يجب أن تطابق مفاتيح القاموس الفرنسي تمامًا. */
export const ar: Dictionnaire = {
  metadonnees: {
    description: "منصة لحجز المواعيد وإدارتها لفائدة المؤسسات المهنية.",
  },
  commun: {
    chargement: "جارٍ التحميل",
    fermer: "إغلاق",
    retourTableauDeBord: "العودة إلى لوحة التحكم",
    allerAuContenu: "الانتقال إلى المحتوى الرئيسي",
    filAriane: "مسار التنقل",
    nonLu: "(غير مقروء)",
    actuel: "(الحالية)",
    erreurTitre: "حدث خطأ",
    erreurDescription: "تعذّر عرض الصفحة. حاول مرة أخرى بعد قليل.",
    reessayer: "إعادة المحاولة",
    introuvableTitre: "الصفحة غير موجودة",
    introuvableDescription: "هذه الصفحة غير موجودة أو تم نقلها.",
  },
  navigation: {
    libelles: {
      "tableau-de-bord": "لوحة التحكم",
      "rendez-vous": "المواعيد",
      calendrier: "التقويم",
      clients: "العملاء",
      services: "الخدمات",
      equipe: "الفريق",
      disponibilites: "أوقات التوفر",
      "reservation-en-ligne": "الحجز عبر الإنترنت",
      notifications: "الإشعارات",
      finances: "المالية",
      rapports: "التقارير",
      parametres: "الإعدادات",
    },
    sections: {
      apercu: "نظرة عامة",
      gestion: "الإدارة",
      "relation-client": "العلاقة مع العملاء",
      activite: "النشاط",
    },
    barreLaterale: "الشريط الجانبي",
    navigationPrincipale: "التنقل الرئيسي",
    menuNavigation: "قائمة التنقل",
    afficherMasquerMenu: "إظهار القائمة أو إخفاؤها",
    fermerMenu: "إغلاق قائمة التنقل",
    systemeDesign: "نظام التصميم",
  },
  roles: {
    administrateur_plateforme: "مسؤول المنصة",
    administrateur: "المسؤول",
    secretaire: "سكرتير",
    collaborateur: "متعاون",
    client: "عميل",
  },
  typesOrganisation: {
    clinique_medicale: "عيادة طبية",
    cabinet_dentaire: "عيادة أسنان",
    cabinet_avocats: "مكتب محاماة",
    cabinet_comptable: "مكتب محاسبة",
    cabinet_conseil: "مكتب استشارات",
    centre_formation: "مركز تكوين",
    autre: "خدمات مهنية",
  },
  organisation: {
    vosOrganisations: "مؤسساتك",
    changerOrganisation: "المؤسسة الحالية: {nom}. تغيير المؤسسة",
    changementBientot: "ستتوفر إمكانية تغيير المؤسسة قريبًا.",
  },
  barreNavigation: {
    rechercheLibelle: "البحث في مساحة العمل",
    recherchePlaceholder: "ابحث عن عميل أو موعد...",
    changerLangue: "تغيير اللغة",
  },
  notifications: {
    titre: "الإشعارات",
    libelleAvecNonLues: "الإشعارات، {nombre} غير مقروءة",
    nouvelles: "{nombre} جديدة",
    voirTout: "عرض كل الإشعارات",
    types: {
      nouvelle_reservation: {
        titre: "حجز جديد عبر الإنترنت",
        message: "حجز {client} « {service} » يوم {date}.",
      },
      rappel_rendez_vous: {
        titre: "موعد قادم",
        message: "يبدأ « {service} » مع {client} بعد {minutes} دقيقة.",
      },
      paiement_recu: {
        titre: "تم استلام الدفع",
        message: "تم تسجيل الفاتورة {facture} كمدفوعة.",
      },
      disponibilite_modifiee: {
        titre: "تم تعديل أوقات التوفر",
        message: "عدّل {collaborateur} أوقات توفره لهذا الأسبوع.",
      },
    },
  },
  utilisateur: {
    menuDuCompte: "قائمة حساب {nom}",
    parametresCompte: "إعدادات الحساب",
    preferencesNotifications: "تفضيلات الإشعارات",
    deconnexion: "تسجيل الخروج",
  },
  pagination: {
    libelle: "ترقيم الصفحات",
    pageSurTotal: "الصفحة {page} من {total}",
    page: "الصفحة {page}",
    precedente: "الصفحة السابقة",
    suivante: "الصفحة التالية",
  },
  tableauDeBord: {
    bienvenue: "مرحبًا {prenom}. هذه مساحة عملك في {organisation}.",
    voirSystemeDesign: "عرض نظام التصميم",
    organisation: "المؤسسة",
    typeOrganisation: "نوع المؤسسة",
    votreRole: "دورك",
    aVenirTitre: "لوحة التحكم قادمة قريبًا",
    aVenirDescription:
      "ستظهر هنا الأرقام الرئيسية ومواعيد اليوم والنشاط الأخير. لوحة التحكم مبرمجة في مرحلة التطوير القادمة.",
  },
  moduleAVenir: {
    titre: "{module}: قريبًا",
    description: "هذه الوحدة مبرمجة في مرحلة تطوير قادمة. التنقل والتخطيط جاهزان لها.",
  },
  statutsRendezVous: {
    confirme: "مؤكد",
    en_attente: "قيد الانتظار",
    annule: "ملغى",
  },
  systemeDesign: systemeDesignAr,
};
