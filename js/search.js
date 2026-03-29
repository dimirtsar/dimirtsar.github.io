const searchData = [
  {
    title: "Головна",
    url: "/",
    description: "Теплові насоси · Енергоефективність. Експертний блог про теплові насоси, альтернативну енергетику та енергоефективні рішення",
    keywords: ["теплові насоси", "енергоефективність", "Дмитро Царенко", "Неотепло"]
  },
  {
    title: "Про мене",
    url: "/about/",
    description: "Інформація про Дмитра Царенка - інженера-енергетика, експерта з теплових насосів",
    keywords: ["Дмитро Царенко", "інженер", "біографія"]
  },
  {
    title: "Наукові публікації",
    url: "/publications/",
    description: "Наукові дослідження та публікації з енергоефективності та теплових насосів",
    keywords: ["наука", "публікації", "дослідження"]
  },
  {
    title: "Блог",
    url: "/blog/",
    description: "Блог про теплові насоси, енергоефективність та інженерні рішення",
    keywords: ["блог", "статті"]
  },
  {
    title: "Теплові насоси",
    url: "/heat-pumps/",
    description: "Інформація про теплові насоси, принципи роботи та застосування",
    keywords: ["теплові насоси", "опалення"]
  },
  {
    title: "Енергоефективність",
    url: "/efficiency/",
    description: "Енергоефективні рішення для будівель та систем опалення",
    keywords: ["енергоефективність", "енергозбереження"]
  },
  {
    title: "Бізнес",
    url: "/business/",
    description: "Бізнес в енергетиці та теплових насосах",
    keywords: ["бізнес", "підприємництво"]
  },
  {
    title: "Контакти",
    url: "/contact/",
    description: "Зв'язатися з Дмитром Царенком",
    keywords: ["контакти", "зв'язок"]
  },
  {
    title: "Австрійська якість чи маркетинг?",
    url: "/blog/austrian-quality/",
    description: "Розбір міфу про австрійську якість теплових насосів та реальне виробництво",
    keywords: ["австрія", "якість", "виробництво", "теплові насоси"]
  },
  {
    title: "Каскад теплових насосів",
    url: "/blog/cascade/",
    description: "Переваги та особливості використання каскаду теплових насосів",
    keywords: ["каскад", "теплові насоси", "потужність"]
  },
  {
    title: "Ризики дешевих рішень",
    url: "/blog/cheap-risks/",
    description: "Чому дешеві теплові насоси можуть коштувати дорожче",
    keywords: ["ціна", "якість", "ризики"]
  },
  {
    title: "Вентиляція чи кондиціонування",
    url: "/blog/climate-vs-ventilation/",
    description: "Різниця між системами вентиляції та кондиціонування",
    keywords: ["вентиляція", "кондиціонування", "клімат"]
  },
  {
    title: "Інвестиції в комфорт",
    url: "/blog/comfort-investment/",
    description: "Як правильно інвестувати в системи опалення та комфорту",
    keywords: ["інвестиції", "комфорт", "опалення"]
  },
  {
    title: "Центр управління опаленням",
    url: "/blog/control-center/",
    description: "Автоматизація та управління системами опалення",
    keywords: ["автоматизація", "управління", "smart home"]
  },
  {
    title: "Комплексні енергетичні рішення",
    url: "/blog/energy-solutions/",
    description: "Інтеграція різних енергетичних систем для максимальної ефективності",
    keywords: ["енергетика", "інтеграція", "рішення"]
  },
  {
    title: "Пошук прийнятної ціни",
    url: "/blog/finding-acceptable-price/",
    description: "Як визначити адекватну ціну на теплові насоси",
    keywords: ["ціна", "вартість", "бюджет"]
  },
  {
    title: "Коли встановлювати геотермальний насос",
    url: "/blog/geothermal-timing/",
    description: "Оптимальний час для монтажу геотермальної системи",
    keywords: ["геотермальний", "монтаж", "термін"]
  },
  {
    title: "Активне та пасивне охолодження",
    url: "/blog/heat-pump-cooling-active-passive/",
    description: "Різниця між режимами охолодження в теплових насосах",
    keywords: ["охолодження", "кондиціонування", "літо"]
  },
  {
    title: "Гаряча вода від теплового насоса",
    url: "/blog/heat-pump-hot-water/",
    description: "Підготовка гарячої води за допомогою теплового насоса",
    keywords: ["гаряча вода", "бойлер", "ГВП"]
  },
  {
    title: "Підходи виробників теплових насосів",
    url: "/blog/heat-pump-manufacturers-approach/",
    description: "Різні філософії виробників теплових насосів",
    keywords: ["виробники", "бренди", "філософія"]
  },
  {
    title: "Тренди ринку теплових насосів",
    url: "/blog/heat-pump-market-trends/",
    description: "Актуальні тенденції розвитку ринку теплових насосів",
    keywords: ["ринок", "тренди", "розвиток"]
  },
  {
    title: "Потужність та бівалентність",
    url: "/blog/heat-pump-power-bivalence/",
    description: "Розрахунок потужності та бівалентні системи опалення",
    keywords: ["потужність", "бівалентність", "розрахунок"]
  },
  {
    title: "Практичний досвід експлуатації",
    url: "/blog/heat-pump-practical-experience/",
    description: "Реальний досвід використання теплових насосів в Україні",
    keywords: ["досвід", "експлуатація", "практика"]
  },
  {
    title: "Порівняння принципів роботи насосів",
    url: "/blog/heat-pump-principle-comparison/",
    description: "Повітря-вода vs грунт-вода: порівняння принципів",
    keywords: ["повітря-вода", "грунт-вода", "порівняння"]
  },
  {
    title: "Наукове порівняння типів насосів",
    url: "/blog/heat-pump-scientific-comparison/",
    description: "Науковий аналіз ефективності різних типів теплових насосів",
    keywords: ["наука", "дослідження", "ефективність"]
  },
  {
    title: "Теплові насоси: принцип роботи",
    url: "/blog/heat-pumps-article/",
    description: "Базові принципи роботи теплових насосів",
    keywords: ["принцип роботи", "теорія", "основи"]
  },
  {
    title: "HGL Tech - технології опалення",
    url: "/blog/hgl-tech/",
    description: "Огляд технологій компанії HGL Tech",
    keywords: ["HGL Tech", "технології", "обладнання"]
  },
  {
    title: "Поширення насосів в Австрії",
    url: "/blog/hp-diffusion-austria/",
    description: "Статистика розповсюдження теплових насосів в Австрії",
    keywords: ["австрія", "статистика", "поширення"]
  },
  {
    title: "Гнучкість теплових насосів",
    url: "/blog/hp-flexibility/",
    description: "Універсальність та адаптивність систем на базі теплових насосів",
    keywords: ["гнучкість", "універсальність", "адаптація"]
  },
  {
    title: "Власники насосів в Австрії",
    url: "/blog/hp-owners-austria/",
    description: "Профіль та досвід власників теплових насосів в Австрії",
    keywords: ["власники", "досвід", "австрія"]
  },
  {
    title: "Людський фактор в інженерії",
    url: "/blog/human-factor-engineering/",
    description: "Вплив людського фактора на якість інженерних систем",
    keywords: ["людський фактор", "якість", "помилки"]
  },
  {
    title: "Інтеграція систем опалення",
    url: "/blog/integration/",
    description: "Як правильно інтегрувати різні системи опалення",
    keywords: ["інтеграція", "системи", "комплекс"]
  },
  {
    title: "Інтуїція в інженерії",
    url: "/blog/intuition/",
    description: "Роль інтуїції та досвіду в проєктуванні систем",
    keywords: ["інтуїція", "досвід", "проєктування"]
  },
  {
    title: "ION AI в енергетиці",
    url: "/blog/ion-ai/",
    description: "Штучний інтелект для оптимізації енергоспоживання",
    keywords: ["AI", "штучний інтелект", "оптимізація"]
  },
  {
    title: "Слухати чи пояснювати",
    url: "/blog/listen-or-explain/",
    description: "Комунікація з клієнтами в інженерному бізнесі",
    keywords: ["комунікація", "клієнти", "продажі"]
  },
  {
    title: "Ринкове ціноутворення",
    url: "/blog/market-pricing/",
    description: "Принципи формування цін на теплові насоси",
    keywords: ["ціна", "ринок", "економіка"]
  },
  {
    title: "Виміряна відповідальність",
    url: "/blog/measure-responsibility/",
    description: "Відповідальність за якість та результат в інженерії",
    keywords: ["відповідальність", "якість", "гарантія"]
  },
  {
    title: "Навігатор в світі опалення",
    url: "/blog/navigator/",
    description: "Як орієнтуватися в різноманітті опалювальних систем",
    keywords: ["вибір", "орієнтація", "рішення"]
  },
  {
    title: "Партнер чи ніша",
    url: "/blog/partner-or-niche/",
    description: "Стратегії розвитку бізнесу в енергетиці",
    keywords: ["бізнес", "стратегія", "партнерство"]
  },
  {
    title: "Ціновий аргумент",
    url: "/blog/price-argument/",
    description: "Як працювати з запереченнями про ціну",
    keywords: ["ціна", "заперечення", "продажі"]
  },
  {
    title: "Ціна відповідальності",
    url: "/blog/price-of-responsibility/",
    description: "Чому якісний монтаж коштує дорожче",
    keywords: ["ціна", "якість", "відповідальність"]
  },
  {
    title: "Психологія ціноутворення",
    url: "/blog/pricing-psychology/",
    description: "Психологічні аспекти сприйняття ціни клієнтами",
    keywords: ["психологія", "ціна", "клієнти"]
  },
  {
    title: "Програмування автоматики",
    url: "/blog/programming/",
    description: "Налаштування автоматики для систем опалення",
    keywords: ["програмування", "автоматика", "налаштування"]
  },
  {
    title: "Відповідальність в бізнесі",
    url: "/blog/responsibility/",
    description: "Чому важлива відповідальність за свою роботу",
    keywords: ["відповідальність", "бізнес", "етика"]
  },
  {
    title: "Започаткувати чи приєднатися",
    url: "/blog/start-or-join/",
    description: "Власний бізнес vs робота в компанії",
    keywords: ["бізнес", "кар'єра", "вибір"]
  },
  {
    title: "Команда понад усе",
    url: "/blog/team-first/",
    description: "Важливість команди в інженерному бізнесі",
    keywords: ["команда", "люди", "бізнес"]
  },
  {
    title: "Тепловий насос: повітря-вода чи грунт-вода",
    url: "/blog/teplovyi-nasos-povitrya-voda-chy-grunt-voda/",
    description: "Детальне порівняння типів теплових насосів українською",
    keywords: ["повітря-вода", "грунт-вода", "порівняння", "вибір"]
  },
  {
    title: "Під ключ - що це означає",
    url: "/blog/turnkey/",
    description: "Реальність послуги 'під ключ' в монтажі опалення",
    keywords: ["під ключ", "монтаж", "послуги"]
  },
  {
    title: "Розуміння справжньої цінності",
    url: "/blog/understanding-real-value/",
    description: "Як оцінити справжню цінність інженерних рішень",
    keywords: ["цінність", "якість", "оцінка"]
  },
  {
    title: "Вентиляція з рекупераціею",
    url: "/blog/ventilation/",
    description: "Системи вентиляції з рекуперацією тепла",
    keywords: ["вентиляція", "рекуперація", "повітря"]
  },
  {
    title: "Виробництво теплових насосів: Україна vs Європа",
    url: "/blog/vyrobnytstvo-teplovykh-nasosiv-ukraina-evropa/",
    description: "Порівняння виробництва теплових насосів в Україні та Європі",
    keywords: ["виробництво", "україна", "європа", "якість"]
  }
];

function normalizeText(text) {
  return text.toLowerCase()
    .replace(/ʼ/g, "'")
    .replace(/[^\wа-яіїєґ\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function searchContent(query) {
  if (!query || query.length < 2) return [];

  const normalizedQuery = normalizeText(query);
  const queryWords = normalizedQuery.split(' ').filter(w => w.length > 1);

  const results = searchData.map(item => {
    const normalizedTitle = normalizeText(item.title);
    const normalizedDesc = normalizeText(item.description);
    const normalizedKeywords = item.keywords.map(k => normalizeText(k));

    let score = 0;

    queryWords.forEach(word => {
      if (normalizedTitle.includes(word)) score += 10;
      if (normalizedDesc.includes(word)) score += 5;
      normalizedKeywords.forEach(keyword => {
        if (keyword.includes(word)) score += 3;
      });
    });

    if (normalizedTitle.startsWith(normalizedQuery)) score += 20;
    if (normalizedTitle.includes(normalizedQuery)) score += 15;

    return { ...item, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 8);

  return results;
}

function highlightMatch(text, query) {
  if (!query) return text;

  const normalizedQuery = normalizeText(query);
  const words = normalizedQuery.split(' ').filter(w => w.length > 1);

  let result = text;
  words.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  });

  return result;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { searchContent, highlightMatch, normalizeText };
}
