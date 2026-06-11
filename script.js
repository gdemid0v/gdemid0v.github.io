"use strict";

const LANGUAGE_STORAGE_KEY = "portfolioLanguage";

let currentLanguage = getStoredLanguage();

const i18n = {
  ru: {
    ui: {
      start: "Пуск",
      programs: "Программы",
      aboutPortfolio: "О портфолио",
      projects: "Проекты",
      skills: "Навыки",
      certificates: "Сертификаты",
      contacts: "Контакты",
      readme: "README.txt",
      shutdown: "Завершение работы...",
      file: "Файл",
      edit: "Правка",
      view: "Вид",
      help: "Справка",
      back: "Назад",
      up: "Вверх",
      views: "Вид",
      address: "Адрес",
      items: "элементов",
      portfolioFolder: "Папка портфолио",
      certificateItems: "сертификатов",
      notepad: "Блокнот",
      explorer: "Проводник",
      open: "Открыть",
      openFile: "Открыть файл",
      openInNewTab: "Открыть в новой вкладке",
      close: "Закрыть",
      minimize: "Свернуть",
      maximize: "Развернуть",
      restore: "Восстановить",
      contents: "содержимое",
      changeLanguage: "Сменить язык",
      languageTitle: "Сменить язык / Change language",
      systemClock: "Системные часы",
      systemTray: "Область уведомлений",
      openWindows: "Открытые окна",
      desktopShortcuts: "Ярлыки рабочего стола",
      desktopLabel: "Windows 98-style рабочий стол портфолио",
      windowMenu: "Меню окна",
      certificatePreview: "Просмотр сертификата",
      previewUnavailable: "Файл пока не добавлен",
      previewHint:
        "Добавьте файл в assets/certificates/ и отметьте previewAvailable: true в массиве certificates внутри script.js.",
      imagePreviewAlt: "Предпросмотр сертификата",
      pdfPreviewTitle: "PDF-сертификат",
      noPreview: "Предпросмотр появится после добавления файла.",
      issuer: "Организация",
      date: "Дата",
      type: "Тип",
      filePath: "Файл",
      ok: "OK",
      shutdownTitle: "Завершение работы",
      shutdownMessage: "Это веб-портфолио нельзя выключить из браузера.",
    },
    desktop: {
      about: "Обо мне",
      education: "Образование",
      projects: "Проекты",
      skills: "Навыки",
      achievements: "Достижения",
      certificates: "Сертификаты и бейджи",
      contacts: "Контакты",
      readme: "README.txt",
    },
  },
  en: {
    ui: {
      start: "Start",
      programs: "Programs",
      aboutPortfolio: "About this portfolio",
      projects: "Projects",
      skills: "Skills",
      certificates: "Certificates",
      contacts: "Contacts",
      readme: "README.txt",
      shutdown: "Shut Down...",
      file: "File",
      edit: "Edit",
      view: "View",
      help: "Help",
      back: "Back",
      up: "Up",
      views: "Views",
      address: "Address",
      items: "items",
      portfolioFolder: "Portfolio folder",
      certificateItems: "certificates",
      notepad: "Notepad",
      explorer: "Explorer",
      open: "Open",
      openFile: "Open file",
      openInNewTab: "Open in new tab",
      close: "Close",
      minimize: "Minimize",
      maximize: "Maximize",
      restore: "Restore",
      contents: "contents",
      changeLanguage: "Change language",
      languageTitle: "Change language / Сменить язык",
      systemClock: "System clock",
      systemTray: "System tray",
      openWindows: "Open windows",
      desktopShortcuts: "Desktop shortcuts",
      desktopLabel: "Windows 98-style portfolio desktop",
      windowMenu: "Window menu",
      certificatePreview: "Certificate preview",
      previewUnavailable: "File has not been added yet",
      previewHint:
        "Add the file to assets/certificates/ and set previewAvailable: true in the certificates array inside script.js.",
      imagePreviewAlt: "Certificate preview",
      pdfPreviewTitle: "PDF certificate",
      noPreview: "Preview will appear after the file is added.",
      issuer: "Issuer",
      date: "Date",
      type: "Type",
      filePath: "File",
      ok: "OK",
      shutdownTitle: "Shut Down",
      shutdownMessage: "This web portfolio cannot be shut down from the browser.",
    },
    desktop: {
      about: "About Me",
      education: "Education",
      projects: "Projects",
      skills: "Skills",
      achievements: "Achievements",
      certificates: "Certificates & Badges",
      contacts: "Contacts",
      readme: "README.txt",
    },
  },
};

const fileSystem = {
  about: {
    type: "folder",
    icon: "about",
    label: { ru: "Обо мне", en: "About Me" },
    files: {
      "who-am-i": {
        type: "text",
        filename: { ru: "кто-я.txt", en: "who-am-i.txt" },
        content: {
          ru:
            "Я Георгий Демидов, студент-разработчик. Мне интересны веб-приложения, интерфейсы, автоматизация, инфраструктура, моушн-дизайн и современные цифровые продукты. Мне нравятся проекты, где код, визуальная подача и реальная польза соединяются в один полноценный продукт.",
          en:
            "I am George Demidov, a student developer. I am interested in web applications, interfaces, automation, infrastructure, motion design, and modern digital products. I like projects where code, visual presentation, and real usefulness come together as one complete product.",
        },
      },
      background: {
        type: "text",
        filename: { ru: "биография.txt", en: "background.txt" },
        content: {
          ru:
            "Мой опыт объединяет разработку, дизайн, медиапроизводство, серверное администрирование и презентацию проектов. Я работал с учебными, портфолио-, инфраструктурными и full-stack веб-проектами.",
          en:
            "My experience combines development, design, media production, server administration, and project presentation. I have worked on educational, portfolio, infrastructure, and full-stack web projects.",
        },
      },
      interests: {
        type: "text",
        filename: { ru: "интересы.txt", en: "interests.txt" },
        content: {
          ru:
            "Мои основные интересы: full-stack разработка, backend-системы, frontend-интерфейсы, базы данных, UI/UX, motion design, 3D-графика, автоматизация, локальные AI-интеграции, серверная инфраструктура и визуальная упаковка цифровых продуктов.",
          en:
            "My main interests are full-stack development, backend systems, frontend interfaces, databases, UI/UX, motion design, 3D graphics, automation, local AI integrations, server infrastructure, and visual packaging for digital products.",
        },
      },
    },
  },
  education: {
    type: "folder",
    icon: "education",
    label: { ru: "Образование", en: "Education" },
    files: {
      school: {
        type: "text",
        filename: { ru: "школа.txt", en: "school.txt" },
        content: {
          ru: "В 2022 году я окончил 9 класс в Школе №1861 «Загорье».",
          en: "In 2022, I completed 9th grade at School No. 1861 “Zagorye”.",
        },
      },
      college: {
        type: "text",
        filename: { ru: "колледж.txt", en: "college.txt" },
        content: {
          ru:
            "В 2022 году я поступил в ГБПОУ Колледж «Царицыно» на специальность «Информационные системы и программирование». Во время обучения я работал над программными проектами, презентациями, технической документацией и цифровыми системами.",
          en:
            "In 2022, I entered GBPOU College “Tsaritsyno”, majoring in Information Systems and Programming. During my studies, I worked on software projects, presentations, technical documentation, and digital systems.",
        },
      },
      specialty: {
        type: "text",
        filename: { ru: "специальность.txt", en: "specialty.txt" },
        content: {
          ru:
            "Моя специальность — «Информационные системы и программирование». Она включает разработку программного обеспечения, базы данных, веб-технологии, проектирование систем, тестирование, развертывание и документацию.\n\nПериод обучения: 2022–2026.",
          en:
            "My specialty is Information Systems and Programming. It includes software development, databases, web technologies, system design, testing, deployment, and documentation.\n\nEducation period: 2022-2026.",
        },
      },
    },
  },
  projects: {
    type: "folder",
    icon: "projects",
    label: { ru: "Проекты", en: "Projects" },
    files: {
      investtrack: {
        type: "text",
        filename: { ru: "investtrack.txt", en: "investment-dashboard.txt" },
        content: {
          ru:
            "Investment Dashboard / InvestTrack — full-stack веб-приложение для отслеживания инвестиционного портфеля, активов, счетов, транзакций, аналитики, кэширования, AI-ассистента и серверной инфраструктуры. Проект включает frontend-интерфейсы, backend-логику, проектирование базы данных, оптимизацию производительности, тестирование и AI-интеграцию.",
          en:
            "Investment Dashboard / InvestTrack is a full-stack web application for tracking an investment portfolio, assets, accounts, transactions, analytics, caching, an AI assistant, and server infrastructure. The project includes frontend interfaces, backend logic, database design, performance optimization, testing, and AI integration.",
        },
      },
      "moy-tsaritsyno": {
        type: "text",
        filename: { ru: "мой-царицыно.txt", en: "moy-tsaritsyno.txt" },
        content: {
          ru:
            "Мой Царицыно — концепция цифровой платформы для колледжа с профилями пользователей, авторизацией, социальными функциями, голосованиями, мероприятиями, административными инструментами и студенческими сервисами. Проект включает модульную архитектуру, backend API, frontend-страницы, базу данных и документацию.",
          en:
            "Moy Tsaritsyno is a concept for a digital college platform with user profiles, authorization, social features, voting, events, administrative tools, and student services. The project includes modular architecture, a backend API, frontend pages, a database, and documentation.",
        },
      },
      "exam-cli-generator": {
        type: "text",
        filename: { ru: "exam-cli-generator.txt", en: "exam-cli-generator.txt" },
        content: {
          ru:
            "Exam CLI Generator — npm CLI-инструмент для быстрой генерации учебных веб-проектов. Он помогает создавать готовые шаблоны проектов с backend, frontend, структурой базы данных, документацией и setup-скриптами.",
          en:
            "Exam CLI Generator is an npm CLI tool for quickly generating educational web projects. It helps create ready-made project templates with a backend, frontend, database structure, documentation, and setup scripts.",
        },
      },
      infrastructure: {
        type: "text",
        filename: { ru: "infrastructure.txt", en: "vpn-service.txt" },
        content: {
          ru:
            "Инфраструктурные и VPN-проекты включали работу с Linux-серверами, Docker, доменами, Nginx, сертификатами, proxy-сервисами, приватными сетями и развертыванием сервисов. Эти проекты дали мне практический опыт серверного администрирования и сетевой диагностики.",
          en:
            "Infrastructure and VPN projects included work with Linux servers, Docker, domains, Nginx, certificates, proxy services, private networks, and service deployment. These projects gave me practical experience in server administration and network diagnostics.",
        },
      },
    },
  },
  skills: {
    type: "folder",
    icon: "skills",
    label: { ru: "Навыки", en: "Skills" },
    files: {
      overview: {
        type: "text",
        filename: { ru: "обзор.txt", en: "overview.txt" },
        content: {
          ru:
            "Я совмещаю навыки разработки, инфраструктуры и визуального продакшена. Могу разработать веб-приложение, спроектировать базу данных, развернуть проект на сервере, подготовить документацию, собрать презентацию и визуально упаковать результат.",
          en:
            "I combine development, infrastructure, and visual production skills. I can build a web application, design a database, deploy a project on a server, prepare documentation, create a presentation, and visually package the result.",
        },
      },
      frontend: {
        type: "text",
        filename: { ru: "frontend.txt", en: "frontend.txt" },
        content: {
          ru:
            "Frontend: HTML, CSS, JavaScript, React, Next.js, адаптивная верстка, компонентные интерфейсы, формы, дашборды, таблицы, графики, модальные окна, desktop-like UI, пользовательские сценарии и визуальная полировка интерфейса.",
          en:
            "Frontend: HTML, CSS, JavaScript, React, Next.js, responsive layout, component interfaces, forms, dashboards, tables, charts, modal windows, desktop-like UI, user flows, and visual interface polish.",
        },
      },
      backend: {
        type: "text",
        filename: { ru: "backend.txt", en: "backend.txt" },
        content: {
          ru:
            "Backend: Node.js, Express, NestJS, REST API, серверная бизнес-логика, авторизация, JWT, API routes, валидация, интеграция frontend и backend, BFF-подход на Next.js.",
          en:
            "Backend: Node.js, Express, NestJS, REST APIs, server-side business logic, authorization, JWT, API routes, validation, frontend/backend integration, and the BFF approach in Next.js.",
        },
      },
      databases: {
        type: "text",
        filename: { ru: "базы-данных.txt", en: "databases.txt" },
        content: {
          ru:
            "Базы данных: PostgreSQL, SQLite, Microsoft SQL Server, Prisma ORM, ER-диаграммы, нормализация, миграции, seed-данные, связи между сущностями, индексы и базовая оптимизация запросов.",
          en:
            "Databases: PostgreSQL, SQLite, Microsoft SQL Server, Prisma ORM, ER diagrams, normalization, migrations, seed data, entity relationships, indexes, and basic query optimization.",
        },
      },
      "devops-infrastructure": {
        type: "text",
        filename: { ru: "devops-инфраструктура.txt", en: "devops-and-infrastructure.txt" },
        content: {
          ru:
            "Инфраструктура: Ubuntu Server, Docker, Docker Compose, Nginx, Certbot, Let’s Encrypt, SSH, SFTP, WinSCP, VNC, переменные окружения, логи, PostgreSQL в Docker, Redis, reverse proxy, домены, DNS-записи и базовая диагностика серверов.",
          en:
            "Infrastructure: Ubuntu Server, Docker, Docker Compose, Nginx, Certbot, Let’s Encrypt, SSH, SFTP, WinSCP, VNC, environment variables, logs, PostgreSQL in Docker, Redis, reverse proxy, domains, DNS records, and basic server diagnostics.",
        },
      },
      "ai-integrations": {
        type: "text",
        filename: { ru: "ai-интеграции.txt", en: "ai-integrations.txt" },
        content: {
          ru:
            "AI-интеграции: LM Studio, Ollama, OpenAI-compatible API, локальные LLM endpoint’ы, Mistral 7B Instruct, chat completions API, интерфейсы AI-ассистентов, логика контекста и подключение AI-функций к данным приложения.",
          en:
            "AI integrations: LM Studio, Ollama, OpenAI-compatible APIs, local LLM endpoints, Mistral 7B Instruct, chat completions APIs, AI assistant interfaces, context logic, and connecting AI features to application data.",
        },
      },
      testing: {
        type: "text",
        filename: { ru: "тестирование.txt", en: "testing.txt" },
        content: {
          ru:
            "Тестирование: Jest, React Testing Library, ESLint, k6, ручное тестирование, API-тестирование, компонентное тестирование, нагрузочные проверки, проверка поведения интерфейса и подготовка отчетов по тестированию.",
          en:
            "Testing: Jest, React Testing Library, ESLint, k6, manual testing, API testing, component testing, load checks, interface behavior verification, and test report preparation.",
        },
      },
      "design-media": {
        type: "text",
        filename: { ru: "дизайн-и-медиа.txt", en: "design-and-media.txt" },
        content: {
          ru:
            "Дизайн и медиа: Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, дизайн презентаций, визуальная айдентика, инфографика, диаграммы, технические схемы, упаковка проектов и визуальный сторителлинг.",
          en:
            "Design and media: Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, presentation design, visual identity, infographics, diagrams, technical schemes, project packaging, and visual storytelling.",
        },
      },
      "motion-design": {
        type: "text",
        filename: { ru: "motion-design.txt", en: "motion-design.txt" },
        content: {
          ru:
            "Motion design и 3D: Adobe After Effects, Cinema 4D, анимация, переходы, титры, 3D-сцены, визуальные эффекты, анимированные презентации, интерфейсные анимации и превращение технических идей в сильные визуальные материалы.",
          en:
            "Motion design and 3D: Adobe After Effects, Cinema 4D, animation, transitions, titles, 3D scenes, visual effects, animated presentations, interface animations, and turning technical ideas into strong visual materials.",
        },
      },
      tools: {
        type: "text",
        filename: { ru: "инструменты.txt", en: "tools.txt" },
        content: {
          ru:
            "Инструменты и ПО: Visual Studio Code, Visual Studio, SQL Server Management Studio, Git, GitHub, Docker, Nginx, Prisma, WinSCP, Adobe After Effects, Cinema 4D, Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, TouchDesigner, Unity, Android Studio, Microsoft Office и PowerPoint.",
          en:
            "Tools and software: Visual Studio Code, Visual Studio, SQL Server Management Studio, Git, GitHub, Docker, Nginx, Prisma, WinSCP, Adobe After Effects, Cinema 4D, Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, TouchDesigner, Unity, Android Studio, Microsoft Office, and PowerPoint.",
        },
      },
      "soft-skills": {
        type: "text",
        filename: { ru: "soft-skills.txt", en: "soft-skills.txt" },
        content: {
          ru:
            "Soft skills: публичные выступления, презентация проектов, наставничество, студсовет, волонтёрство, участие в мероприятиях, документация, объяснение сложных технических идей простым языком, командная работа и самостоятельное ведение проекта.",
          en:
            "Soft skills: public speaking, project presentation, mentoring, student council work, volunteering, event participation, documentation, explaining complex technical ideas in simple language, teamwork, and independent project ownership.",
        },
      },
    },
  },
  achievements: {
    type: "folder",
    icon: "achievements",
    label: { ru: "Достижения", en: "Achievements" },
    files: {
      "student-council": {
        type: "text",
        filename: { ru: "студсовет.txt", en: "student-council.txt" },
        content: {
          ru:
            "У меня есть опыт участия в студенческом совете и студенческих инициативах: организационная работа, коммуникация, мероприятия и взаимодействие со студентами.",
          en:
            "I have experience in the student council and student initiatives: organizational work, communication, events, and interaction with students.",
        },
      },
      volunteering: {
        type: "text",
        filename: { ru: "волонтёрство.txt", en: "volunteering.txt" },
        content: {
          ru:
            "У меня есть волонтёрский опыт на образовательных и публичных мероприятиях. Он помог развить коммуникацию, ответственность, командную работу и понимание организации мероприятий.",
          en:
            "I have volunteer experience at educational and public events. It helped me develop communication, responsibility, teamwork, and an understanding of event organization.",
        },
      },
      contests: {
        type: "text",
        filename: { ru: "конкурсы.txt", en: "contests.txt" },
        content: {
          ru:
            "Я участвовал в конкурсах и студенческих активностях, связанных с творчеством, технологиями, медиа и презентацией проектов. Этот раздел можно расширить конкретными наградами позже.",
          en:
            "I have participated in contests and student activities related to creativity, technology, media, and project presentation. This section can later be expanded with specific awards.",
        },
      },
      "public-speaking": {
        type: "text",
        filename: { ru: "публичные-выступления.txt", en: "public-speaking.txt" },
        content: {
          ru:
            "У меня есть опыт выступлений перед аудиторией, презентации проектов, объяснения технических идей и участия в образовательных или студенческих мероприятиях.",
          en:
            "I have experience speaking to audiences, presenting projects, explaining technical ideas, and participating in educational or student events.",
        },
      },
      "project-presentations": {
        type: "text",
        filename: {
          ru: "презентации-проектов.txt",
          en: "project-presentations.txt",
        },
        content: {
          ru:
            "Я умею готовить и презентовать проекты: от технической документации и диаграмм до визуальных слайдов, демо, видео и финальной защиты.",
          en:
            "I can prepare and present projects: from technical documentation and diagrams to visual slides, demos, videos, and final defense presentations.",
        },
      },
    },
  },
  certificates: {
    type: "folder",
    icon: "certificate",
    label: { ru: "Сертификаты и бейджи", en: "Certificates & Badges" },
    certificates: true,
    files: {
      "certificates-readme": {
        type: "text",
        filename: {
          ru: "readme-сертификатов.txt",
          en: "certificates-readme.txt",
        },
        content: {
          ru:
            "Эта папка предназначена для сертификатов, грамот, дипломов, бейджей курсов, достижений NetAcad, Credly-бейджей и других подтверждений навыков. Добавьте файлы в assets/certificates/ и зарегистрируйте их в массиве certificates внутри script.js.",
          en:
            "This folder is intended for certificates, awards, diplomas, course badges, NetAcad achievements, Credly badges, and other skill confirmations. Add files to assets/certificates/ and register them in the certificates array inside script.js.",
        },
      },
      "netacad-badges": {
        type: "text",
        filename: { ru: "netacad-бейджи.txt", en: "netacad-badges.txt" },
        content: {
          ru:
            "Поместите сертификаты или изображения бейджей Cisco NetAcad в assets/certificates/. Затем добавьте их в массив certificates в script.js: title, issuer, date, type, file path и description.",
          en:
            "Place Cisco NetAcad certificates or badge images in assets/certificates/. Then add them to the certificates array in script.js: title, issuer, date, type, file path, and description.",
        },
      },
      "credly-badges": {
        type: "text",
        filename: { ru: "credly-бейджи.txt", en: "credly-badges.txt" },
        content: {
          ru:
            "Поместите изображения бейджей Credly или экспортированные сертификаты в assets/certificates/. Затем добавьте их в массив certificates в script.js. Сайт должен отображать их внутри папки «Сертификаты и бейджи».",
          en:
            "Place Credly badge images or exported certificates in assets/certificates/. Then add them to the certificates array in script.js. The site will display them inside the “Certificates & Badges” folder.",
        },
      },
      "uploaded-certificates-folder": {
        type: "text",
        filename: {
          ru: "как-добавить-файлы.txt",
          en: "uploaded-certificates-folder.txt",
        },
        content: {
          ru:
            "Физическая папка для файлов: assets/certificates/. Поддерживаемые примеры: .png, .jpg, .jpeg, .webp, .gif, .pdf. Так как сайт статический, каждый сертификат нужно вручную добавить в массив certificates в script.js.",
          en:
            "Physical file folder: assets/certificates/. Supported examples: .png, .jpg, .jpeg, .webp, .gif, .pdf. Because the site is static, every certificate must be manually added to the certificates array in script.js.",
        },
      },
    },
  },
  contacts: {
    type: "folder",
    icon: "contacts",
    label: { ru: "Контакты", en: "Contacts" },
    files: {
      email: {
        type: "text",
        filename: { ru: "email.txt", en: "email.txt" },
        content: {
          ru:
            "Основная почта: gdemid0v.work@outlook.com\nДополнительная почта: gdemid0v.work@yandex.ru",
          en:
            "Primary email: gdemid0v.work@outlook.com\nSecondary email: gdemid0v.work@yandex.ru",
        },
      },
      telegram: {
        type: "text",
        filename: { ru: "telegram.txt", en: "telegram.txt" },
        content: {
          ru: "Telegram: t.me/gdemid0v",
          en: "Telegram: t.me/gdemid0v",
        },
      },
      github: {
        type: "text",
        filename: { ru: "github.txt", en: "github.txt" },
        content: {
          ru: "Ссылка на GitHub-профиль будет добавлена позже.",
          en: "GitHub profile link can be added here.",
        },
      },
    },
  },
};

const rootFiles = {
  readme: {
    type: "text",
    filename: { ru: "README.txt", en: "README.txt" },
    content: {
      ru:
        "Добро пожаловать в мое Windows 98-style портфолио.\n\nОткрывайте папки, изучайте файлы и смотрите мои навыки, проекты, образование, достижения, сертификаты и контакты.\n\nЭтот сайт — статическое портфолио для GitHub Pages, созданное на plain HTML, CSS и JavaScript.\n\nИконки: SE98 / Win98SE icon theme by nestoris, лицензия GPL-2.0.",
      en:
        "Welcome to my Windows 98-style portfolio.\n\nOpen folders, explore files, and view my skills, projects, education, achievements, certificates, and contacts.\n\nThis site is a static portfolio for GitHub Pages, built with plain HTML, CSS, and JavaScript.\n\nIcons: SE98 / Win98SE icon theme by nestoris, licensed under GPL-2.0.",
    },
  },
};

const desktopItems = [
  { type: "folder", id: "about" },
  { type: "folder", id: "education" },
  { type: "folder", id: "projects" },
  { type: "folder", id: "skills" },
  { type: "folder", id: "achievements" },
  { type: "folder", id: "certificates" },
  { type: "folder", id: "contacts" },
  { type: "rootText", id: "readme" },
];

// Central icon registry. Replace files in assets/icons/16 and assets/icons/32
// or update paths here to change icons without touching rendering logic.
const iconMap = {
  about: {
    small: "assets/icons/16/about.png",
    large: "assets/icons/32/about.png",
  },
  education: {
    small: "assets/icons/16/education.png",
    large: "assets/icons/32/education.png",
  },
  projects: {
    small: "assets/icons/16/projects.png",
    large: "assets/icons/32/projects.png",
  },
  skills: {
    small: "assets/icons/16/skills.png",
    large: "assets/icons/32/skills.png",
  },
  achievements: {
    small: "assets/icons/16/achievements.png",
    large: "assets/icons/32/achievements.png",
  },
  certificates: {
    small: "assets/icons/16/certificates.png",
    large: "assets/icons/32/certificates.png",
  },
  contacts: {
    small: "assets/icons/16/contacts.png",
    large: "assets/icons/32/contacts.png",
  },
  readme: {
    small: "assets/icons/16/readme.png",
    large: "assets/icons/32/readme.png",
  },
  folder: {
    small: "assets/icons/16/folder.png",
    large: "assets/icons/32/folder.png",
  },
  text: {
    small: "assets/icons/16/text-file.png",
    large: "assets/icons/32/text-file.png",
  },
  email: {
    small: "assets/icons/16/email.png",
    large: "assets/icons/32/email.png",
  },
  telegram: {
    small: "assets/icons/16/telegram.png",
    large: "assets/icons/32/telegram.png",
  },
  github: {
    small: "assets/icons/16/github.png",
    large: "assets/icons/32/github.png",
  },
  computer: {
    small: "assets/icons/16/computer.png",
    large: "assets/icons/32/computer.png",
  },
  language: {
    small: "assets/icons/16/language.png",
  },
  clock: {
    small: "assets/icons/16/clock.png",
  },
  start: {
    small: "assets/icons/16/start.png",
  },
  document: {
    small: "assets/icons/16/text-file.png",
    large: "assets/icons/32/text-file.png",
  },
  certificate: {
    small: "assets/icons/16/certificates.png",
    large: "assets/icons/32/certificates.png",
  },
  network: {
    small: "assets/icons/16/contacts.png",
    large: "assets/icons/32/contacts.png",
  },
  shutdown: {
    small: "assets/icons/16/start.png",
    large: "assets/icons/32/computer.png",
  },
};

// GitHub Pages cannot list folder contents. Add every real certificate here manually.
const certificates = [
  {
    id: "netacad-example",
    title: {
      ru: "Пример бейджа Cisco NetAcad",
      en: "Cisco NetAcad Badge Example",
    },
    issuer: {
      ru: "Cisco Networking Academy",
      en: "Cisco Networking Academy",
    },
    date: {
      ru: "Добавить дату",
      en: "Add date here",
    },
    type: {
      ru: "Бейдж",
      en: "Badge",
    },
    file: "assets/certificates/netacad-example.png",
    previewAvailable: false,
    description: {
      ru:
        "Замените этот элемент на реальный бейдж или сертификат NetAcad.",
      en: "Replace this item with a real NetAcad badge or certificate.",
    },
  },
  {
    id: "credly-example",
    title: {
      ru: "Пример бейджа Credly",
      en: "Credly Badge Example",
    },
    issuer: {
      ru: "Credly",
      en: "Credly",
    },
    date: {
      ru: "Добавить дату",
      en: "Add date here",
    },
    type: {
      ru: "Бейдж",
      en: "Badge",
    },
    file: "assets/certificates/credly-example.png",
    previewAvailable: false,
    description: {
      ru: "Замените этот элемент на реальный бейдж Credly.",
      en: "Replace this item with a real Credly badge.",
    },
  },
];

const desktop = document.getElementById("desktop");
const desktopIconsEl = document.getElementById("desktop-icons");
const windowLayer = document.getElementById("window-layer");
const taskbarItems = document.getElementById("taskbar-items");
const startButton = document.getElementById("start-button");
const startButtonLabel = document.getElementById("start-button-label");
const startMenu = document.getElementById("start-menu");
const startMenuItems = document.getElementById("start-menu-items");
const languageButton = document.getElementById("language-button");
const clockIcon = document.getElementById("clock-icon");
const clock = document.getElementById("clock");

const openWindows = new Map();
let zIndexCounter = 10;
let cascadeOffset = 0;
let activeWindowId = null;

function initDesktop() {
  renderDesktopIcons();
  renderStartMenu();
  updateStaticLabels();
  updateLanguageButton();
  updateClock();
  setInterval(updateClock, 1000 * 30);

  startButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (startMenu.hidden) {
      openStartMenu();
    } else {
      closeStartMenu();
    }
  });

  languageButton.addEventListener("click", toggleLanguage);

  desktop.addEventListener("pointerdown", (event) => {
    if (!event.target.closest(".start-menu") && !event.target.closest(".start-button")) {
      closeStartMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeStartMenu();
    }
  });
}

function getStoredLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === "en" || saved === "ru" ? saved : "ru";
  } catch {
    return "ru";
  }
}

function setLanguage(language) {
  if (language !== "ru" && language !== "en") return;
  currentLanguage = language;

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // The site still works if localStorage is unavailable.
  }

  updateAllLocalizedText();
}

function toggleLanguage() {
  setLanguage(currentLanguage === "ru" ? "en" : "ru");
}

function t(path) {
  return path.split(".").reduce((value, key) => value?.[key], i18n[currentLanguage]) || path;
}

function getLocalized(value) {
  if (value && typeof value === "object" && ("ru" in value || "en" in value)) {
    return value[currentLanguage] || value.ru || value.en || "";
  }

  return value;
}

function updateAllLocalizedText() {
  updateStaticLabels();
  renderDesktopIcons();
  renderStartMenu();
  updateLanguageButton();
  updateClock();
  updateOpenWindows();
}

function updateStaticLabels() {
  document.documentElement.lang = currentLanguage;
  document.title =
    currentLanguage === "ru"
      ? "Георгий Демидов - Windows 98 Portfolio"
      : "George Demidov - Windows 98 Portfolio";
  desktop.setAttribute("aria-label", t("ui.desktopLabel"));
  desktopIconsEl.setAttribute("aria-label", t("ui.desktopShortcuts"));
  taskbarItems.setAttribute("aria-label", t("ui.openWindows"));
  clock.parentElement.setAttribute("aria-label", t("ui.systemClock"));
  languageButton.parentElement.setAttribute("aria-label", t("ui.systemTray"));
  document.querySelector(".start-button__mark").innerHTML = getMiniIconMarkup("start");
  clockIcon.innerHTML = getMiniIconMarkup("clock");
  startButtonLabel.textContent = t("ui.start");
}

function renderDesktopIcons() {
  desktopIconsEl.innerHTML = "";

  desktopItems.forEach((item) => {
    const label = getDesktopItemLabel(item);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "desktop-icon";
    button.dataset.itemType = item.type;
    button.dataset.itemId = item.id;
    button.setAttribute("aria-label", `${t("ui.open")} ${label}`);
    button.innerHTML = `
      ${getLargeIconMarkup(getDesktopItemIcon(item))}
      <span class="desktop-icon__label">${escapeHtml(label)}</span>
    `;

    button.addEventListener("click", () => openDesktopItem(item));
    button.addEventListener("dblclick", () => openDesktopItem(item));
    desktopIconsEl.appendChild(button);
  });
}

function renderStartMenu() {
  const items = [
    { kind: "folder", id: "about", label: { ru: "Георгий Демидов", en: "George Demidov" }, icon: "about" },
    { separator: true },
    { kind: "folder", id: "projects", label: { ru: t("ui.programs"), en: t("ui.programs") }, icon: "folder" },
    { kind: "folder", id: "projects", label: { ru: t("ui.projects"), en: t("ui.projects") }, icon: "projects" },
    { kind: "folder", id: "skills", label: { ru: t("ui.skills"), en: t("ui.skills") }, icon: "skills" },
    { kind: "folder", id: "certificates", label: { ru: t("ui.certificates"), en: t("ui.certificates") }, icon: "certificates" },
    { kind: "folder", id: "contacts", label: { ru: t("ui.contacts"), en: t("ui.contacts") }, icon: "contacts" },
    { kind: "text", id: "readme", label: { ru: t("ui.readme"), en: t("ui.readme") }, icon: "readme" },
    { separator: true },
    { kind: "shutdown", label: { ru: t("ui.shutdown"), en: t("ui.shutdown") }, icon: "shutdown" },
  ];

  startMenuItems.innerHTML = "";

  items.forEach((item) => {
    if (item.separator) {
      const separator = document.createElement("div");
      separator.className = "start-menu__separator";
      startMenuItems.appendChild(separator);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "start-menu__item";
    button.innerHTML = `
      ${getMiniIconMarkup(item.icon)}
      <span>${escapeHtml(getLocalized(item.label))}</span>
    `;

    if (item.kind === "folder") {
      button.addEventListener("click", () => {
        openFolder(item.id);
        closeStartMenu();
      });
    } else if (item.kind === "text") {
      button.addEventListener("click", () => {
        openTextFile("root", item.id);
        closeStartMenu();
      });
    } else {
      button.addEventListener("click", () => {
        openShutdownDialog();
        closeStartMenu();
      });
    }

    startMenuItems.appendChild(button);
  });
}

function updateLanguageButton() {
  languageButton.innerHTML = `
    ${getMiniIconMarkup("language")}
    <span class="language-button__text">${currentLanguage.toUpperCase()}</span>
  `;
  languageButton.title = t("ui.languageTitle");
  languageButton.setAttribute("aria-label", t("ui.changeLanguage"));
}

function openStartMenu() {
  startMenu.hidden = false;
  startButton.classList.add("is-active");
  startButton.setAttribute("aria-expanded", "true");
}

function closeStartMenu() {
  startMenu.hidden = true;
  startButton.classList.remove("is-active");
  startButton.setAttribute("aria-expanded", "false");
}

function openDesktopItem(item) {
  if (item.type === "folder") {
    openFolder(item.id);
  } else {
    openTextFile("root", item.id);
  }
}

function openFolder(folderId) {
  const folder = fileSystem[folderId];
  if (!folder) return;

  const windowId = `folder:${folderId}`;
  if (focusExistingWindow(windowId)) return;

  createWindow({
    id: windowId,
    kind: "folder",
    iconType: folder.icon || "folder",
    width: folderId === "certificates" ? 620 : 500,
    height: folderId === "certificates" ? 420 : 350,
    meta: { folderId },
    getTitle: () => getLocalized(folder.label),
    renderBody: () => renderFolderBody(folderId),
  });
}

function openTextFile(parentId, fileId) {
  const file = getTextFile(parentId, fileId);
  if (!file) return;

  const windowId = `text:${parentId}:${fileId}`;
  if (focusExistingWindow(windowId)) return;

  createWindow({
    id: windowId,
    kind: "text",
    iconType: "document",
    width: 540,
    height: 380,
    meta: { parentId, fileId },
    getTitle: () => getTextFileTitle(file),
    renderBody: () => renderTextBody(parentId, fileId),
  });
}

function openCertificatePreview(certificateId) {
  const certificate = certificates.find((item) => item.id === certificateId);
  if (!certificate) return;

  const windowId = `certificate:${certificateId}`;
  if (focusExistingWindow(windowId)) return;

  createWindow({
    id: windowId,
    kind: "certificate",
    iconType: "certificate",
    width: 560,
    height: 430,
    meta: { certificateId },
    getTitle: () => `${getLocalized(certificate.title)} - ${t("ui.certificatePreview")}`,
    renderBody: () => renderCertificatePreviewBody(certificateId),
  });
}

function openShutdownDialog() {
  const windowId = "dialog:shutdown";
  if (focusExistingWindow(windowId)) return;

  createWindow({
    id: windowId,
    kind: "dialog",
    iconType: "shutdown",
    width: 390,
    height: 170,
    hasMenu: false,
    getTitle: () => t("ui.shutdownTitle"),
    renderBody: () => renderShutdownDialogBody(),
  });
}

function createWindow(options) {
  const win = document.createElement("section");
  win.className = "window";
  win.dataset.windowId = options.id;
  win.dataset.windowKind = options.kind;
  win.setAttribute("role", "dialog");

  const position = getInitialWindowPosition(options.width || 420, options.height || 300);
  Object.assign(win.style, {
    left: `${position.left}px`,
    top: `${position.top}px`,
    width: `${position.width}px`,
    height: `${position.height}px`,
  });

  const titleBar = document.createElement("div");
  titleBar.className = "title-bar";
  titleBar.innerHTML = `
    <div class="title-bar-text"></div>
    <div class="title-bar-controls">
      <button type="button" class="minimize"></button>
      <button type="button" class="maximize"></button>
      <button type="button" class="close"></button>
    </div>
  `;

  const menuBar = document.createElement("div");
  menuBar.className = "portfolio-menu-bar";

  const bodySlot = document.createElement("div");
  bodySlot.className = "window-body window-body-slot";

  win.appendChild(titleBar);
  win.appendChild(bodySlot);
  windowLayer.appendChild(win);

  const record = {
    id: options.id,
    kind: options.kind,
    iconType: options.iconType || "folder",
    getTitle: options.getTitle,
    renderBody: options.renderBody,
    hasMenu: options.hasMenu !== false,
    element: win,
    titleBar,
    menuBar,
    bodySlot,
    minimized: false,
    maximized: false,
    restoreRect: null,
    taskbarButton: null,
    meta: options.meta || {},
  };

  openWindows.set(record.id, record);

  titleBar.querySelector(".minimize").addEventListener("click", (event) => {
    event.stopPropagation();
    minimizeWindow(record.id);
  });

  titleBar.querySelector(".maximize").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMaximizeWindow(record.id);
  });

  titleBar.querySelector(".close").addEventListener("click", (event) => {
    event.stopPropagation();
    closeWindow(record.id);
  });

  titleBar.addEventListener("dblclick", () => toggleMaximizeWindow(record.id));
  win.addEventListener("pointerdown", () => focusWindow(record.id));
  makeWindowDraggable(record, titleBar);
  createTaskbarButton(record);
  updateWindowRecord(record);
  focusWindow(record.id);

  return record;
}

function renderFolderBody(folderId) {
  const folder = fileSystem[folderId];
  const body = document.createElement("div");
  body.className = "window-panel explorer-panel";

  const fileIds = Object.keys(folder.files);
  const certificateCount = folder.certificates ? certificates.length : 0;
  const itemCount = fileIds.length + certificateCount;

  body.innerHTML = `
    <div class="explorer-toolbar" aria-label="${escapeHtml(t("ui.explorer"))}">
      <button type="button" class="win-button">${escapeHtml(t("ui.back"))}</button>
      <button type="button" class="win-button">${escapeHtml(t("ui.up"))}</button>
      <button type="button" class="win-button">${escapeHtml(t("ui.views"))}</button>
    </div>
    <div class="address-row">
      <span class="address-label">${escapeHtml(t("ui.address"))}</span>
      <div class="address-field">C:\\Portfolio\\${escapeHtml(getLocalized(folder.label))}</div>
    </div>
    <div class="folder-view">
      <div class="folder-files"></div>
    </div>
    <div class="status-bar">
      <p class="status-bar-field">${itemCount} ${escapeHtml(t("ui.items"))}</p>
      <p class="status-bar-field">${escapeHtml(t("ui.portfolioFolder"))}</p>
    </div>
  `;

  const filesEl = body.querySelector(".folder-files");
  fileIds.forEach((fileId) => {
    const file = folder.files[fileId];
    filesEl.appendChild(createFileButton({
      label: getLocalized(file.filename),
      iconType: getFileIconType(folderId, fileId),
      onOpen: () => openTextFile(folderId, fileId),
    }));
  });

  if (folder.certificates) {
    certificates.forEach((certificate) => {
      filesEl.appendChild(createCertificateCard(certificate));
    });
  }

  return body;
}

function createFileButton({ label, iconType, onOpen }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "file-icon";
  button.setAttribute("aria-label", `${t("ui.open")} ${label}`);
  button.innerHTML = `
    ${getLargeIconMarkup(iconType)}
    <span class="file-icon__label">${escapeHtml(label)}</span>
  `;
  button.addEventListener("click", onOpen);
  button.addEventListener("dblclick", onOpen);
  return button;
}

function createCertificateCard(certificate) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "certificate-card";
  button.setAttribute("aria-label", `${t("ui.open")} ${getLocalized(certificate.title)}`);
  button.innerHTML = `
    <span class="certificate-card__preview">
      ${renderCertificateThumbnail(certificate)}
    </span>
    <span class="certificate-card__text">
      <strong>${escapeHtml(getLocalized(certificate.title))}</strong>
      <span>${escapeHtml(getLocalized(certificate.issuer))}</span>
      <span>${escapeHtml(getLocalized(certificate.type))} · ${escapeHtml(getLocalized(certificate.date))}</span>
    </span>
  `;
  button.addEventListener("click", () => openCertificatePreview(certificate.id));
  button.addEventListener("dblclick", () => openCertificatePreview(certificate.id));
  return button;
}

function renderTextBody(parentId, fileId) {
  const file = getTextFile(parentId, fileId);
  const body = document.createElement("div");
  body.className = "window-panel notepad-panel";

  const textarea = document.createElement("textarea");
  textarea.className = "notepad-editor";
  textarea.spellcheck = false;
  textarea.value = getLocalized(file.content);
  textarea.setAttribute(
    "aria-label",
    `${getLocalized(file.filename)} ${t("ui.contents")}`,
  );
  body.appendChild(textarea);

  return body;
}

function renderCertificatePreviewBody(certificateId) {
  const certificate = certificates.find((item) => item.id === certificateId);
  const body = document.createElement("div");
  body.className = "window-panel certificate-preview-window";

  const isPdf = certificate.file.toLowerCase().endsWith(".pdf");
  const isImage = /\.(png|jpe?g|webp|gif)$/i.test(certificate.file);

  let previewMarkup = `
    <div class="certificate-placeholder">
      ${getLargeIconMarkup("certificate")}
      <strong>${escapeHtml(t("ui.previewUnavailable"))}</strong>
      <span>${escapeHtml(t("ui.previewHint"))}</span>
    </div>
  `;

  if (certificate.previewAvailable && isImage) {
    previewMarkup = `
      <img class="certificate-preview-image" src="${escapeHtml(certificate.file)}" alt="${escapeHtml(t("ui.imagePreviewAlt"))}" />
    `;
  } else if (certificate.previewAvailable && isPdf) {
    previewMarkup = `
      <iframe class="certificate-preview-pdf" src="${escapeHtml(certificate.file)}" title="${escapeHtml(t("ui.pdfPreviewTitle"))}"></iframe>
      <a class="win-link-button" href="${escapeHtml(certificate.file)}" target="_blank" rel="noreferrer">${escapeHtml(t("ui.openInNewTab"))}</a>
    `;
  }

  body.innerHTML = `
    <div class="certificate-preview">
      <div class="certificate-preview__media">${previewMarkup}</div>
      <div class="certificate-preview__details">
        <h2>${escapeHtml(getLocalized(certificate.title))}</h2>
        <dl>
          <div><dt>${escapeHtml(t("ui.issuer"))}</dt><dd>${escapeHtml(getLocalized(certificate.issuer))}</dd></div>
          <div><dt>${escapeHtml(t("ui.date"))}</dt><dd>${escapeHtml(getLocalized(certificate.date))}</dd></div>
          <div><dt>${escapeHtml(t("ui.type"))}</dt><dd>${escapeHtml(getLocalized(certificate.type))}</dd></div>
          <div><dt>${escapeHtml(t("ui.filePath"))}</dt><dd>${escapeHtml(certificate.file)}</dd></div>
        </dl>
        <p>${escapeHtml(getLocalized(certificate.description))}</p>
      </div>
    </div>
  `;

  return body;
}

function renderShutdownDialogBody() {
  const body = document.createElement("div");
  body.className = "window-panel dialog-body";
  body.innerHTML = `
    <div class="dialog-message">
      ${getLargeIconMarkup("shutdown")}
      <p>${escapeHtml(t("ui.shutdownMessage"))}</p>
    </div>
    <div class="dialog-actions">
      <button type="button" class="win-button dialog-ok">${escapeHtml(t("ui.ok"))}</button>
    </div>
  `;

  body.querySelector(".dialog-ok").addEventListener("click", () => closeWindow("dialog:shutdown"));
  return body;
}

function renderCertificateThumbnail(certificate) {
  const isImage = /\.(png|jpe?g|webp|gif)$/i.test(certificate.file);

  if (certificate.previewAvailable && isImage) {
    return `<img src="${escapeHtml(certificate.file)}" alt="${escapeHtml(t("ui.imagePreviewAlt"))}" />`;
  }

  return `
    <span class="certificate-card__placeholder">
      ${getLargeIconMarkup("certificate")}
      <span>${escapeHtml(t("ui.noPreview"))}</span>
    </span>
  `;
}

function updateOpenWindows() {
  openWindows.forEach((record) => {
    updateWindowRecord(record);
  });
}

function updateWindowRecord(record) {
  const title = record.getTitle();
  record.element.setAttribute("aria-label", title);
  record.titleBar.querySelector(".title-bar-text").innerHTML = `
    <span class="title-bar-icon" aria-hidden="true">${getMiniIconMarkup(record.iconType)}</span>
    <span class="title-bar-label">${escapeHtml(title)}</span>
  `;

  const minimizeButton = record.titleBar.querySelector(".minimize");
  const maximizeButton = record.titleBar.querySelector(".maximize, .restore");
  const closeButton = record.titleBar.querySelector(".close");
  minimizeButton.setAttribute("aria-label", "Minimize");
  minimizeButton.title = t("ui.minimize");
  maximizeButton.setAttribute("aria-label", record.maximized ? "Restore" : "Maximize");
  maximizeButton.title = record.maximized ? t("ui.restore") : t("ui.maximize");
  maximizeButton.classList.toggle("restore", record.maximized);
  maximizeButton.classList.toggle("maximize", !record.maximized);
  closeButton.setAttribute("aria-label", "Close");
  closeButton.title = t("ui.close");

  record.bodySlot.innerHTML = "";
  if (record.hasMenu) {
    record.menuBar.setAttribute("aria-label", t("ui.windowMenu"));
    record.menuBar.innerHTML = "";
    [t("ui.file"), t("ui.edit"), t("ui.view"), t("ui.help")].forEach((item) => {
      const span = document.createElement("span");
      span.textContent = item;
      record.menuBar.appendChild(span);
    });
    record.bodySlot.appendChild(record.menuBar);
  }

  record.bodySlot.appendChild(record.renderBody());

  if (record.taskbarButton) {
    record.taskbarButton.querySelector(".taskbar-button__label").textContent = title;
    record.taskbarButton.setAttribute("aria-label", title);
  }
}

function createTaskbarButton(record) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "taskbar-button";
  button.dataset.windowId = record.id;
  button.innerHTML = `
    <span class="mini-icon-wrapper" aria-hidden="true"></span>
    <span class="taskbar-button__label"></span>
  `;
  button.querySelector(".mini-icon-wrapper").innerHTML = getMiniIconMarkup(record.iconType);
  button.addEventListener("click", () => {
    if (record.minimized) {
      restoreWindow(record.id);
      return;
    }

    if (activeWindowId === record.id) {
      minimizeWindow(record.id);
    } else {
      focusWindow(record.id);
    }
  });

  record.taskbarButton = button;
  taskbarItems.appendChild(button);
}

function focusExistingWindow(id) {
  if (!openWindows.has(id)) return false;
  const record = openWindows.get(id);
  if (record.minimized) restoreWindow(id);
  focusWindow(id);
  return true;
}

function focusWindow(id) {
  const record = openWindows.get(id);
  if (!record) return;

  activeWindowId = id;
  zIndexCounter += 1;
  record.element.style.zIndex = zIndexCounter;

  openWindows.forEach((item) => {
    const isActive = item.id === id && !item.minimized;
    item.element.classList.toggle("is-active", isActive);
    item.titleBar.classList.toggle("inactive", !isActive);
    if (item.taskbarButton) {
      item.taskbarButton.classList.toggle("is-active", isActive);
    }
  });
}

function minimizeWindow(id) {
  const record = openWindows.get(id);
  if (!record) return;

  record.minimized = true;
  record.element.classList.add("is-minimized");
  record.element.classList.remove("is-active");
  if (record.taskbarButton) record.taskbarButton.classList.remove("is-active");

  if (activeWindowId === id) {
    activeWindowId = null;
    focusTopVisibleWindow();
  }
}

function restoreWindow(id) {
  const record = openWindows.get(id);
  if (!record) return;

  record.minimized = false;
  record.element.classList.remove("is-minimized");
  focusWindow(id);
}

function toggleMaximizeWindow(id) {
  const record = openWindows.get(id);
  if (!record) return;

  if (record.maximized) {
    record.maximized = false;
    record.element.classList.remove("is-maximized");
    if (record.restoreRect) {
      Object.assign(record.element.style, record.restoreRect);
    }
  } else {
    record.restoreRect = {
      left: record.element.style.left,
      top: record.element.style.top,
      width: record.element.style.width,
      height: record.element.style.height,
    };
    record.maximized = true;
    record.element.classList.add("is-maximized");
  }

  updateWindowRecord(record);
  focusWindow(id);
}

function closeWindow(id) {
  const record = openWindows.get(id);
  if (!record) return;

  record.element.remove();
  if (record.taskbarButton) record.taskbarButton.remove();
  openWindows.delete(id);

  if (activeWindowId === id) {
    activeWindowId = null;
    focusTopVisibleWindow();
  }
}

function focusTopVisibleWindow() {
  let topRecord = null;
  openWindows.forEach((record) => {
    if (record.minimized) return;
    if (!topRecord || Number(record.element.style.zIndex) > Number(topRecord.element.style.zIndex)) {
      topRecord = record;
    }
  });

  if (topRecord) {
    focusWindow(topRecord.id);
  }
}

function makeWindowDraggable(record, titleBar) {
  titleBar.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".title-bar-controls button") || record.maximized) return;

    focusWindow(record.id);
    titleBar.setPointerCapture(event.pointerId);

    const rect = record.element.getBoundingClientRect();
    const layerRect = windowLayer.getBoundingClientRect();
    const shiftX = event.clientX - rect.left;
    const shiftY = event.clientY - rect.top;

    const onPointerMove = (moveEvent) => {
      const maxLeft = Math.max(0, layerRect.width - rect.width);
      const maxTop = Math.max(0, layerRect.height - rect.height);
      const left = clamp(moveEvent.clientX - layerRect.left - shiftX, 0, maxLeft);
      const top = clamp(moveEvent.clientY - layerRect.top - shiftY, 0, maxTop);
      record.element.style.left = `${left}px`;
      record.element.style.top = `${top}px`;
    };

    const onPointerUp = () => {
      titleBar.releasePointerCapture(event.pointerId);
      titleBar.removeEventListener("pointermove", onPointerMove);
      titleBar.removeEventListener("pointerup", onPointerUp);
      titleBar.removeEventListener("pointercancel", onPointerUp);
    };

    titleBar.addEventListener("pointermove", onPointerMove);
    titleBar.addEventListener("pointerup", onPointerUp);
    titleBar.addEventListener("pointercancel", onPointerUp);
  });
}

function getInitialWindowPosition(requestedWidth, requestedHeight) {
  const layerRect = windowLayer.getBoundingClientRect();
  const maxWidth = Math.max(220, layerRect.width - 8);
  const maxHeight = Math.max(170, layerRect.height - 8);
  const width = Math.min(requestedWidth, maxWidth);
  const height = Math.min(requestedHeight, maxHeight);
  const baseLeft = window.innerWidth <= 520 ? 4 : 114;
  const baseTop = window.innerWidth <= 520 ? 4 : 34;

  cascadeOffset = (cascadeOffset + 24) % 144;
  const left = Math.min(baseLeft + cascadeOffset, Math.max(4, layerRect.width - width - 4));
  const top = Math.min(baseTop + cascadeOffset, Math.max(4, layerRect.height - height - 4));

  return { left, top, width, height };
}

function getDesktopItemLabel(item) {
  if (item.type === "folder") return getLocalized(fileSystem[item.id].label);
  return getLocalized(rootFiles[item.id].filename);
}

function getDesktopItemIcon(item) {
  if (item.type === "folder") return fileSystem[item.id].icon || "folder";
  return item.id === "readme" ? "readme" : "document";
}

function getFileIconType(parentId, fileId) {
  if (parentId === "contacts") {
    if (fileId === "email") return "email";
    if (fileId === "telegram") return "telegram";
    if (fileId === "github") return "github";
  }

  if (fileId === "overview") return "skills";
  return "document";
}

function getTextFile(parentId, fileId) {
  if (parentId === "root") {
    return rootFiles[fileId] || null;
  }

  return fileSystem[parentId]?.files?.[fileId] || null;
}

function getTextFileTitle(file) {
  return `${getLocalized(file.filename)} - ${t("ui.notepad")}`;
}

function getLargeIconMarkup(type) {
  return getIconMarkup(type, "large");
}

function getMiniIconMarkup(type) {
  return getIconMarkup(type, "small");
}

function getIcon(iconId, size = "large") {
  const normalizedId = normalizeIconId(iconId);
  const fallback = iconMap.text?.large || "assets/icons/32/text-file.png";
  const icon = iconMap[normalizedId];

  if (!icon) return fallback;

  return icon[size] || icon.large || icon.small || fallback;
}

function getIconMarkup(iconId, size = "large") {
  const src = getIcon(iconId, size);
  const className = size === "small" ? "icon-image icon-image--small" : "icon-image icon-image--large";
  return `<img class="${className}" src="${escapeHtml(src)}" alt="" aria-hidden="true" draggable="false" />`;
}

function normalizeIconId(iconId) {
  if (iconId === "text-file") return "text";
  if (iconId === "document") return "text";
  if (iconId === "certificate") return "certificates";
  if (iconId === "network") return "contacts";
  return iconId || "text";
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString(currentLanguage === "ru" ? "ru-RU" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

window.addEventListener("resize", () => {
  const layerRect = windowLayer.getBoundingClientRect();

  openWindows.forEach((record) => {
    if (record.maximized) return;

    const rect = record.element.getBoundingClientRect();
    const width = Math.min(rect.width, Math.max(220, layerRect.width - 8));
    const height = Math.min(rect.height, Math.max(170, layerRect.height - 8));
    const left = clamp(rect.left - layerRect.left, 0, Math.max(0, layerRect.width - width));
    const top = clamp(rect.top - layerRect.top, 0, Math.max(0, layerRect.height - height));

    Object.assign(record.element.style, {
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}px`,
      top: `${top}px`,
    });
  });
});

initDesktop();
