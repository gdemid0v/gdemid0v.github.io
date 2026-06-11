"use strict";

const LANGUAGE_STORAGE_KEY = "portfolioLanguage";
const SOUND_STORAGE_KEY = "portfolioSoundMuted";
const DRAG_VISIBLE_WIDTH = 72;
const DRAG_VISIBLE_TITLE_HEIGHT = 22;
const DEFAULT_MIN_WINDOW_WIDTH = 230;
const DEFAULT_MIN_WINDOW_HEIGHT = 150;
const DESKTOP_ICON_WIDTH = 96;
const DESKTOP_ICON_HEIGHT = 70;
const DESKTOP_GRID_X = 98;
const DESKTOP_GRID_Y = 78;
const VIEW_MODES = ["large", "small", "list", "details"];
const PORTRAIT_IMAGE = {
  src: "assets/Portret.png",
  filename: "Portret.png",
};
const SNAKE_BEST_STORAGE_KEY = "portfolioSnakeBestScore";
const SNAKE_GRID_SIZE = 20;
const SNAKE_CELL_SIZE = 14;
const SNAKE_TICK_MS = 140;
const MINESWEEPER_ROWS = 9;
const MINESWEEPER_COLS = 9;
const MINESWEEPER_MINES = 10;

const soundManifest = {
  startup: { src: "assets/sounds/startup.wav", volume: 0.16 },
  open: { src: "assets/sounds/open.wav", volume: 0.12 },
  close: { src: "assets/sounds/close.wav", volume: 0.12 },
  click: { src: "assets/sounds/click.wav", volume: 0.14 },
  warning: { src: "assets/sounds/warning.wav", volume: 0.13 },
  error: { src: "assets/sounds/error.wav", volume: 0.12 },
  minimize: { src: "assets/sounds/minimize.wav", volume: 0.13 },
  restore: { src: "assets/sounds/restore.wav", volume: 0.13 },
};

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
      games: "Игры",
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
      application: "Приложение",
      open: "Открыть",
      newExplorerWindow: "Новое окно Проводника",
      openFile: "Открыть файл",
      openInNewTab: "Открыть в новой вкладке",
      close: "Закрыть",
      minimize: "Свернуть",
      maximize: "Развернуть",
      restore: "Восстановить",
      rename: "Переименовать",
      delete: "Удалить",
      cut: "Вырезать",
      copy: "Копировать",
      paste: "Вставить",
      selectAll: "Выделить всё",
      properties: "Свойства",
      refresh: "Обновить",
      restoreItem: "Восстановить",
      emptyRecycleBin: "Очистить корзину",
      snapToGrid: "Выровнять по сетке",
      largeIcons: "Крупные значки",
      smallIcons: "Мелкие значки",
      list: "Список",
      details: "Таблица",
      modified: "Изменён",
      size: "Размер",
      name: "Имя",
      location: "Расположение",
      emptyFolder: "Папка пуста",
      selected: "выбрано",
      recycleBinEmpty: "Корзина пуста",
      confirmDeleteTitle: "Подтверждение удаления",
      confirmDeleteMessage: "Переместить выбранные элементы в корзину?",
      confirmEmptyRecycleBin: "Безвозвратно удалить все элементы из корзины?",
      cannotDeleteRecycleBin: "Корзину нельзя удалить.",
      commandUnavailable: "Команда сейчас недоступна.",
      aboutTitle: "О Windows 98 Portfolio",
      aboutMessage: "Windows 98-style портфолио Георгия Демидова. Это лёгкая in-memory симуляция рабочего стола, созданная на HTML, CSS и JavaScript.",
      contents: "содержимое",
      changeLanguage: "Сменить язык",
      languageTitle: "Сменить язык / Change language",
      systemClock: "Системные часы",
      systemTray: "Область уведомлений",
      soundOn: "Звук включен",
      soundOff: "Звук выключен",
      muteSound: "Выключить звук",
      unmuteSound: "Включить звук",
      openWindows: "Открытые окна",
      desktopShortcuts: "Ярлыки рабочего стола",
      desktopLabel: "Windows 98-style рабочий стол портфолио",
      windowMenu: "Меню окна",
      imageViewer: "Просмотр изображений",
      portraitTitle: "Портрет",
      imagePath: "Файл изображения",
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
      recycleBin: "Корзина",
      games: "Игры",
    },
    games: {
      snake: {
        title: "Змейка",
        score: "Счёт",
        best: "Рекорд",
        start: "Старт",
        pause: "Пауза",
        reset: "Сброс",
        pressStart: "Нажмите Старт или Enter",
        paused: "Пауза",
        gameOver: "Игра окончена",
      },
      minesweeper: {
        title: "Сапёр",
        mines: "Мины",
        time: "Время",
        newGame: "Новая игра",
        win: "Победа",
        gameOver: "Игра окончена",
      },
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
      games: "Games",
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
      application: "Application",
      open: "Open",
      newExplorerWindow: "New Explorer Window",
      openFile: "Open file",
      openInNewTab: "Open in new tab",
      close: "Close",
      minimize: "Minimize",
      maximize: "Maximize",
      restore: "Restore",
      rename: "Rename",
      delete: "Delete",
      cut: "Cut",
      copy: "Copy",
      paste: "Paste",
      selectAll: "Select All",
      properties: "Properties",
      refresh: "Refresh",
      restoreItem: "Restore",
      emptyRecycleBin: "Empty Recycle Bin",
      snapToGrid: "Snap to Grid",
      largeIcons: "Large Icons",
      smallIcons: "Small Icons",
      list: "List",
      details: "Details",
      modified: "Modified",
      size: "Size",
      name: "Name",
      location: "Location",
      emptyFolder: "Folder is empty",
      selected: "selected",
      recycleBinEmpty: "Recycle Bin is empty",
      confirmDeleteTitle: "Confirm Delete",
      confirmDeleteMessage: "Move the selected item(s) to the Recycle Bin?",
      confirmEmptyRecycleBin: "Permanently delete all items from the Recycle Bin?",
      cannotDeleteRecycleBin: "The Recycle Bin cannot be deleted.",
      commandUnavailable: "This command is not available right now.",
      aboutTitle: "About Windows 98 Portfolio",
      aboutMessage: "George Demidov's Windows 98-style portfolio. This is a lightweight in-memory desktop simulation built with HTML, CSS, and JavaScript.",
      contents: "contents",
      changeLanguage: "Change language",
      languageTitle: "Change language / Сменить язык",
      systemClock: "System clock",
      systemTray: "System tray",
      soundOn: "Sound on",
      soundOff: "Sound muted",
      muteSound: "Mute sound",
      unmuteSound: "Unmute sound",
      openWindows: "Open windows",
      desktopShortcuts: "Desktop shortcuts",
      desktopLabel: "Windows 98-style portfolio desktop",
      windowMenu: "Window menu",
      imageViewer: "Image Viewer",
      portraitTitle: "Portrait",
      imagePath: "Image file",
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
      recycleBin: "Recycle Bin",
      games: "Games",
    },
    games: {
      snake: {
        title: "Snake",
        score: "Score",
        best: "Best",
        start: "Start",
        pause: "Pause",
        reset: "Reset",
        pressStart: "Press Start or Enter",
        paused: "Paused",
        gameOver: "Game over",
      },
      minesweeper: {
        title: "Minesweeper",
        mines: "Mines",
        time: "Time",
        newGame: "New game",
        win: "You won",
        gameOver: "Game over",
      },
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
      portrait: {
        type: "image",
        filename: { ru: "портрет.png", en: "portrait.png" },
        file: PORTRAIT_IMAGE.src,
        title: { ru: "Портрет", en: "Portrait" },
        size: "1.7 MB",
        modified: "2026-06-11",
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
  games: {
    type: "folder",
    icon: "games",
    label: { ru: "Игры", en: "Games" },
    files: {
      snake: {
        type: "app",
        app: "snake",
        icon: "snake",
        filename: { ru: "Змейка.exe", en: "Snake.exe" },
        size: "18 KB",
        modified: "1998-06-25",
      },
      minesweeper: {
        type: "app",
        app: "minesweeper",
        icon: "minesweeper",
        filename: { ru: "Сапёр.exe", en: "Minesweeper.exe" },
        size: "24 KB",
        modified: "1998-06-25",
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
  { type: "folder", id: "games" },
  { type: "folder", id: "skills" },
  { type: "folder", id: "achievements" },
  { type: "folder", id: "certificates" },
  { type: "folder", id: "contacts" },
  { type: "rootText", id: "readme" },
  { type: "systemFolder", id: "recycle-bin" },
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
  games: {
    small: "assets/icons/16/games.png",
    large: "assets/icons/32/games.png",
  },
  snake: {
    small: "assets/icons/16/snake.png",
    large: "assets/icons/32/snake.png",
  },
  minesweeper: {
    small: "assets/icons/16/minesweeper.png",
    large: "assets/icons/32/minesweeper.png",
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
  recycleBin: {
    small: "assets/icons/16/recycle-bin.png",
    large: "assets/icons/32/recycle-bin.png",
  },
  recycleFull: {
    small: "assets/icons/16/recycle-bin-full.png",
    large: "assets/icons/32/recycle-bin-full.png",
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
  portrait: {
    small: "assets/icons/16/about.png",
    large: "assets/icons/32/about.png",
  },
  image: {
    small: "assets/icons/16/about.png",
    large: "assets/icons/32/about.png",
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

const audioManager = {
  cache: new Map(),
  muted: getStoredSoundMuted(),
  unlocked: false,
  startupPlayed: false,
  skipActionSoundOnce: false,

  getAudio(name) {
    const sound = soundManifest[name];
    if (!sound) return null;

    if (!this.cache.has(name)) {
      const audio = new Audio(sound.src);
      audio.preload = "auto";
      this.cache.set(name, audio);
    }

    return this.cache.get(name);
  },

  unlock(options = {}) {
    if (this.unlocked) return false;

    const shouldPlayStartup = options.playStartup !== false;
    this.unlocked = true;
    if (shouldPlayStartup && !this.muted && !this.startupPlayed) {
      this.startupPlayed = true;
      this.skipActionSoundOnce = true;
      this.play("startup");
    }

    return true;
  },

  play(name) {
    if (!this.unlocked || this.muted) return;
    if (this.skipActionSoundOnce && name !== "startup") {
      this.skipActionSoundOnce = false;
      return;
    }

    const sound = soundManifest[name];
    const audio = this.getAudio(name);
    if (!sound || !audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.volume = sound.volume;
    audio.play().catch(() => {
      // Some browsers still reject audio until the next user gesture.
    });
  },

  toggleMute() {
    this.muted = !this.muted;

    try {
      localStorage.setItem(SOUND_STORAGE_KEY, this.muted ? "true" : "false");
    } catch {
      // The sound toggle remains usable even when storage is unavailable.
    }

    updateSoundButton();
    if (!this.muted) {
      this.play("click");
    }
  },
};

const desktop = document.getElementById("desktop");
const desktopIconsEl = document.getElementById("desktop-icons");
const windowLayer = document.getElementById("window-layer");
const taskbarItems = document.getElementById("taskbar-items");
const startButton = document.getElementById("start-button");
const startButtonLabel = document.getElementById("start-button-label");
const startMenu = document.getElementById("start-menu");
const startMenuItems = document.getElementById("start-menu-items");
const soundButton = document.getElementById("sound-button");
const languageButton = document.getElementById("language-button");
const clockIcon = document.getElementById("clock-icon");
const clock = document.getElementById("clock");

const openWindows = new Map();
const desktopSelection = new Set();
const desktopIconPositions = new Map();
const hiddenDesktopItems = new Set();
const recycleBin = [];
let zIndexCounter = 10;
let cascadeOffset = 0;
let activeWindowId = null;
let activeExplorerId = null;
let contextMenuEl = null;
let selectionRectEl = null;
let suppressNextDesktopClick = false;
let snapDesktopIcons = true;
let virtualClipboard = null;
const gameStates = new Map();

function initDesktop() {
  renderDesktopIcons();
  renderStartMenu();
  updateStaticLabels();
  updateLanguageButton();
  updateSoundButton();
  updateClock();
  setInterval(updateClock, 1000 * 30);
  setupAudioInteractions();

  startButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (startMenu.hidden) {
      openStartMenu();
    } else {
      closeStartMenu();
    }
  });

  soundButton.addEventListener("click", () => {
    audioManager.toggleMute();
  });

  languageButton.addEventListener("click", toggleLanguage);

  desktop.addEventListener("pointerdown", (event) => {
    if (!event.target.closest(".start-menu") && !event.target.closest(".start-button")) {
      closeStartMenu();
    }
    if (!event.target.closest(".context-menu") && !event.target.closest(".window-menu-dropdown")) {
      closeTransientMenus();
    }
    startDesktopSelection(event);
  });

  desktop.addEventListener("contextmenu", handleDesktopContextMenu);
  desktop.addEventListener("click", (event) => {
    if (event.target === desktop || event.target === desktopIconsEl || event.target === windowLayer) {
      clearDesktopSelection();
    }
  });
  document.addEventListener("keydown", handleGlobalKeydown);
  document.addEventListener("pointerdown", (event) => {
    if (!event.target.closest(".context-menu") && !event.target.closest(".window-menu-dropdown") && !event.target.closest(".portfolio-menu-bar")) {
      closeTransientMenus();
    }
  });

  openInitialWindows();
}

function getStoredLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === "en" || saved === "ru" ? saved : "ru";
  } catch {
    return "ru";
  }
}

function getStoredSoundMuted() {
  try {
    return localStorage.getItem(SOUND_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function setupAudioInteractions() {
  document.addEventListener(
    "pointerdown",
    (event) => {
      const willMuteNow = Boolean(event.target.closest?.("#sound-button")) && !audioManager.muted;
      const unlockedNow = audioManager.unlock({ playStartup: !willMuteNow });
      if (!unlockedNow && shouldPlayClickSound(event.target)) {
        audioManager.play("click");
      }
    },
    { capture: true },
  );

  document.addEventListener(
    "keydown",
    (event) => {
      const willMuteNow =
        event.target.closest?.("#sound-button") &&
        !audioManager.muted &&
        (event.key === "Enter" || event.key === " ");
      const unlockedNow = audioManager.unlock({ playStartup: !willMuteNow });
      if (!unlockedNow && shouldPlayKeyboardClickSound(event)) {
        audioManager.play("click");
      }
    },
    { capture: true },
  );
}

function shouldPlayClickSound(target) {
  const button = target.closest?.("button, .win-link-button");
  if (!button) return false;
  if (button.closest(".title-bar-controls")) return false;
  if (button.id === "sound-button") return false;
  return true;
}

function shouldPlayKeyboardClickSound(event) {
  if (event.key !== "Enter" && event.key !== " ") return false;
  if (isEditableTarget(event.target)) return false;
  return Boolean(event.target.closest?.("button, .win-link-button"));
}

function handleGlobalKeydown(event) {
  if (isEditableTarget(event.target)) return;

  if (handleActiveGameKeydown(event)) {
    event.preventDefault();
    return;
  }

  if (event.key === "Escape") {
    if (closeTransientMenus()) {
      event.preventDefault();
      return;
    }

    if (!startMenu.hidden) {
      closeStartMenu();
      event.preventDefault();
      return;
    }

    const topWindow = getTopVisibleWindow();
    if (topWindow) {
      closeWindow(topWindow.id);
      event.preventDefault();
    }
    return;
  }

  if (event.key === "Delete") {
    event.preventDefault();
    deleteCurrentSelection();
    return;
  }

  if (event.key === "Enter") {
    const handled = openCurrentSelection();
    if (handled) event.preventDefault();
    return;
  }

  if (event.key === "F2") {
    const handled = renameCurrentSelection();
    if (handled) event.preventDefault();
    return;
  }

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
    const handled = selectAllCurrentArea();
    if (handled) event.preventDefault();
  }
}

function isEditableTarget(target) {
  if (!(target instanceof Element)) return false;

  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true'], [contenteditable='']"),
  );
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
  updateSoundButton();
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

  desktopItems.filter(isDesktopItemVisible).forEach((item, index) => {
    const label = getDesktopItemLabel(item);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "desktop-icon";
    button.dataset.itemType = item.type;
    button.dataset.itemId = item.id;
    button.style.left = `${getDesktopIconPosition(item.id, index).left}px`;
    button.style.top = `${getDesktopIconPosition(item.id, index).top}px`;
    button.classList.toggle("is-selected", desktopSelection.has(item.id));
    button.setAttribute("aria-label", `${t("ui.open")} ${label}`);
    button.innerHTML = `
      ${getLargeIconMarkup(getDesktopItemIcon(item))}
      <span class="desktop-icon__label">${escapeHtml(label)}</span>
    `;

    button.addEventListener("pointerdown", (event) => startDesktopIconDrag(event, item));
    button.addEventListener("click", (event) => {
      if (suppressNextDesktopClick) {
        suppressNextDesktopClick = false;
        return;
      }
      selectDesktopItem(item.id, event.ctrlKey || event.metaKey);
    });
    button.addEventListener("dblclick", (event) => {
      event.preventDefault();
      openDesktopItem(item);
    });
    button.addEventListener("contextmenu", (event) => showDesktopIconContextMenu(event, item));
    desktopIconsEl.appendChild(button);
  });
}

function renderStartMenu() {
  const items = [
    { kind: "folder", id: "about", label: { ru: "Георгий Демидов", en: "George Demidov" }, icon: "about" },
    { separator: true },
    { kind: "folder", id: "root", label: { ru: t("ui.programs"), en: t("ui.programs") }, icon: "computer" },
    { kind: "folder", id: "projects", label: { ru: t("ui.projects"), en: t("ui.projects") }, icon: "projects" },
    { kind: "folder", id: "games", label: { ru: t("ui.games"), en: t("ui.games") }, icon: "games" },
    { kind: "folder", id: "skills", label: { ru: t("ui.skills"), en: t("ui.skills") }, icon: "skills" },
    { kind: "folder", id: "certificates", label: { ru: t("ui.certificates"), en: t("ui.certificates") }, icon: "certificates" },
    { kind: "folder", id: "contacts", label: { ru: t("ui.contacts"), en: t("ui.contacts") }, icon: "contacts" },
    { kind: "text", id: "readme", label: { ru: t("ui.readme"), en: t("ui.readme") }, icon: "readme" },
    { kind: "folder", id: "recycle-bin", label: { ru: t("desktop.recycleBin"), en: t("desktop.recycleBin") }, icon: recycleBin.length ? "recycleFull" : "recycleBin" },
    { kind: "about", label: { ru: t("ui.aboutPortfolio"), en: t("ui.aboutPortfolio") }, icon: "computer" },
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
    } else if (item.kind === "about") {
      button.addEventListener("click", () => {
        showAboutDialog();
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

function updateSoundButton() {
  soundButton.textContent = audioManager.muted ? "MUT" : "SND";
  soundButton.title = audioManager.muted ? t("ui.unmuteSound") : t("ui.muteSound");
  soundButton.setAttribute("aria-label", audioManager.muted ? t("ui.soundOff") : t("ui.soundOn"));
  soundButton.classList.toggle("is-muted", audioManager.muted);
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
  } else if (item.type === "systemFolder" && item.id === "recycle-bin") {
    openFolder("recycle-bin");
  } else {
    openTextFile("root", item.id);
  }
}

function openFolder(folderId, options = {}) {
  const folder = getVirtualFolder(folderId);
  if (!folder) {
    audioManager.play("error");
    return;
  }

  const windowId = options.newWindow ? `folder:${folderId}:${Date.now()}` : `folder:${folderId}`;
  if (focusExistingWindow(windowId)) return;

  createWindow({
    id: windowId,
    kind: "folder",
    iconType: folder.icon || "folder",
    width: folderId === "certificates" ? 620 : 500,
    height: folderId === "certificates" ? 420 : 350,
    meta: {
      folderId,
      currentFolderId: folderId,
      history: [],
      viewMode: "large",
      selectedItems: new Set(),
    },
    getTitle: () => getLocalized(getVirtualFolder(openWindows.get(windowId)?.meta.currentFolderId || folderId)?.label || folder.label),
    renderBody: () => renderFolderBody(windowId),
    ...options,
  });
}

function openTextFile(parentId, fileId, options = {}) {
  const file = getTextFile(parentId, fileId);
  if (!file) {
    audioManager.play("error");
    return;
  }

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
    ...options,
  });
}

function openApp(appId, options = {}) {
  if (appId === "snake") {
    openSnakeGame(options);
    return;
  }

  if (appId === "minesweeper") {
    openMinesweeperGame(options);
    return;
  }

  audioManager.play("error");
}

function openSnakeGame(options = {}) {
  const windowId = "app:snake";
  if (focusExistingWindow(windowId)) return;

  gameStates.set(windowId, createSnakeState(windowId));
  createWindow({
    id: windowId,
    kind: "game",
    iconType: "snake",
    width: 390,
    height: 470,
    minWidth: 320,
    minHeight: 410,
    hasMenu: false,
    meta: { appId: "snake" },
    getTitle: () => t("games.snake.title"),
    renderBody: () => renderSnakeBody(windowId),
    ...options,
  });
}

function openMinesweeperGame(options = {}) {
  const windowId = "app:minesweeper";
  if (focusExistingWindow(windowId)) return;

  gameStates.set(windowId, createMinesweeperState(windowId));
  createWindow({
    id: windowId,
    kind: "game",
    iconType: "minesweeper",
    width: 292,
    height: 360,
    minWidth: 260,
    minHeight: 330,
    hasMenu: false,
    meta: { appId: "minesweeper" },
    getTitle: () => t("games.minesweeper.title"),
    renderBody: () => renderMinesweeperBody(windowId),
    ...options,
  });
}

function openCertificatePreview(certificateId, options = {}) {
  const certificate = certificates.find((item) => item.id === certificateId);
  if (!certificate) {
    audioManager.play("error");
    return;
  }

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
    ...options,
  });
}

function openPortraitWindow(options = {}) {
  const windowId = "image:portrait";
  if (focusExistingWindow(windowId)) return;

  createWindow({
    id: windowId,
    kind: "image",
    iconType: "portrait",
    width: 340,
    height: 430,
    minWidth: 250,
    minHeight: 230,
    getTitle: () => `${PORTRAIT_IMAGE.filename} - ${t("ui.imageViewer")}`,
    renderBody: renderPortraitBody,
    ...options,
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
    sound: "warning",
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

  const minWidth = options.minWidth || DEFAULT_MIN_WINDOW_WIDTH;
  const minHeight = options.minHeight || DEFAULT_MIN_WINDOW_HEIGHT;
  const position = options.position
    ? getPositionedWindowRect(options.position, options.width || 420, options.height || 300, minWidth, minHeight)
    : getInitialWindowPosition(options.width || 420, options.height || 300, minWidth, minHeight);
  Object.assign(win.style, {
    left: `${position.left}px`,
    top: `${position.top}px`,
    width: `${position.width}px`,
    height: `${position.height}px`,
    minWidth: `${minWidth}px`,
    minHeight: `${minHeight}px`,
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

  const resizeHandle = document.createElement("div");
  resizeHandle.className = "window-resize-handle";
  resizeHandle.setAttribute("aria-hidden", "true");

  win.appendChild(titleBar);
  win.appendChild(bodySlot);
  win.appendChild(resizeHandle);
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
    resizeHandle,
    minWidth,
    minHeight,
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
  makeWindowResizable(record, resizeHandle);
  createTaskbarButton(record);
  updateWindowRecord(record);
  focusWindow(record.id);
  if (!options.silent && options.sound !== false) {
    audioManager.play(options.sound || "open");
  }

  return record;
}

function renderFolderBody(windowId) {
  const record = openWindows.get(windowId);
  const folderId = record?.meta.currentFolderId || record?.meta.folderId;
  const folder = getVirtualFolder(folderId);
  const body = document.createElement("div");
  body.className = "window-panel explorer-panel";

  const items = getFolderItems(folderId);
  const selectedCount = record?.meta.selectedItems?.size || 0;
  const selectedLabel =
    selectedCount === 1
      ? getExplorerItemLabel(items.find((item) => record.meta.selectedItems.has(item.key)))
      : `${selectedCount} ${t("ui.selected")}`;
  const address = getFolderPath(folderId);
  const viewMode = record?.meta.viewMode || "large";

  body.innerHTML = `
    <div class="explorer-toolbar" aria-label="${escapeHtml(t("ui.explorer"))}">
      <button type="button" class="win-button explorer-back"${record.meta.history.length ? "" : " disabled"}>${escapeHtml(t("ui.back"))}</button>
      <button type="button" class="win-button explorer-up"${getParentFolderId(folderId) ? "" : " disabled"}>${escapeHtml(t("ui.up"))}</button>
      <button type="button" class="win-button explorer-view">${escapeHtml(getViewModeLabel(viewMode))}</button>
      ${folderId === "recycle-bin" ? `<button type="button" class="win-button explorer-empty">${escapeHtml(t("ui.emptyRecycleBin"))}</button>` : ""}
    </div>
    <div class="address-row">
      <span class="address-label">${escapeHtml(t("ui.address"))}</span>
      <div class="address-field">${escapeHtml(address)}</div>
    </div>
    <div class="explorer-main">
      <div class="explorer-tree" aria-label="${escapeHtml(t("ui.explorer"))}"></div>
      <div class="folder-view">
        <div class="folder-files folder-files--${escapeHtml(viewMode)}"></div>
      </div>
    </div>
    <div class="status-bar">
      <p class="status-bar-field">${items.length} ${escapeHtml(t("ui.items"))}</p>
      <p class="status-bar-field">${selectedCount ? escapeHtml(selectedLabel) : escapeHtml(t("ui.portfolioFolder"))}</p>
    </div>
  `;

  body.querySelector(".explorer-back").addEventListener("click", () => navigateExplorerBack(record.id));
  body.querySelector(".explorer-up").addEventListener("click", () => navigateExplorerUp(record.id));
  body.querySelector(".explorer-view").addEventListener("click", () => cycleExplorerView(record.id));
  body.querySelector(".folder-view").addEventListener("contextmenu", (event) => showExplorerEmptyContextMenu(event, record.id));
  body.querySelector(".folder-view").addEventListener("click", (event) => {
    if (event.target.classList.contains("folder-view")) {
      clearExplorerSelection(record.id);
    }
  });

  const emptyButton = body.querySelector(".explorer-empty");
  if (emptyButton) {
    emptyButton.disabled = recycleBin.length === 0;
    emptyButton.addEventListener("click", confirmEmptyRecycleBin);
  }

  const treeEl = body.querySelector(".explorer-tree");
  getExplorerTreeItems().forEach((treeItem) => {
    const treeButton = document.createElement("button");
    treeButton.type = "button";
    treeButton.className = "explorer-tree__item";
    treeButton.classList.toggle("is-selected", treeItem.id === folderId);
    treeButton.innerHTML = `${getMiniIconMarkup(treeItem.icon)}<span>${escapeHtml(getLocalized(treeItem.label))}</span>`;
    treeButton.addEventListener("click", () => navigateExplorerTo(record.id, treeItem.id));
    treeEl.appendChild(treeButton);
  });

  const filesEl = body.querySelector(".folder-files");
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "folder-empty-message";
    empty.textContent = folderId === "recycle-bin" ? t("ui.recycleBinEmpty") : t("ui.emptyFolder");
    filesEl.appendChild(empty);
  } else if (viewMode === "details") {
    filesEl.appendChild(createDetailsTable(record, folderId, items));
  } else {
    items.forEach((item) => {
      if (item.kind === "certificate") {
        filesEl.appendChild(createCertificateCard(item.item, record, item));
      } else {
        filesEl.appendChild(createFileButton({
          item,
          record,
          folderId,
          viewMode,
        }));
      }
    });
  }

  return body;
}

function createFileButton({ item, record, folderId, viewMode }) {
  const label = getExplorerItemLabel(item);
  const button = document.createElement("button");
  button.type = "button";
  button.className = `file-icon file-icon--${viewMode}`;
  button.dataset.itemKey = item.key;
  button.classList.toggle("is-selected", record.meta.selectedItems.has(item.key));
  button.setAttribute("aria-label", `${t("ui.open")} ${label}`);
  button.innerHTML = `
    ${viewMode === "small" || viewMode === "list" ? getMiniIconMarkup(item.icon) : getLargeIconMarkup(item.icon)}
    <span class="file-icon__label">${escapeHtml(label)}</span>
  `;
  button.addEventListener("click", (event) => {
    selectExplorerItem(record.id, item.key, event.ctrlKey || event.metaKey);
    if (item.kind === "app" && !event.ctrlKey && !event.metaKey) {
      openExplorerItem(record.id, item);
    }
  });
  button.addEventListener("dblclick", () => openExplorerItem(record.id, item));
  button.addEventListener("contextmenu", (event) => showExplorerItemContextMenu(event, record.id, item));
  return button;
}

function createDetailsTable(record, folderId, items) {
  const table = document.createElement("table");
  table.className = "details-table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>${escapeHtml(t("ui.name"))}</th>
        <th>${escapeHtml(t("ui.type"))}</th>
        <th>${escapeHtml(t("ui.size"))}</th>
        <th>${escapeHtml(t("ui.modified"))}</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");
  items.forEach((item) => {
    const row = document.createElement("tr");
    row.dataset.itemKey = item.key;
    row.classList.toggle("is-selected", record.meta.selectedItems.has(item.key));
    row.innerHTML = `
      <td>${getMiniIconMarkup(item.icon)}<span>${escapeHtml(getExplorerItemLabel(item))}</span></td>
      <td>${escapeHtml(getExplorerItemType(item))}</td>
      <td>${escapeHtml(item.size || "1 KB")}</td>
      <td>${escapeHtml(item.modified || "2026-06-11")}</td>
    `;
    row.addEventListener("click", (event) => {
      selectExplorerItem(record.id, item.key, event.ctrlKey || event.metaKey);
      if (item.kind === "app" && !event.ctrlKey && !event.metaKey) {
        openExplorerItem(record.id, item);
      }
    });
    row.addEventListener("dblclick", () => openExplorerItem(record.id, item));
    row.addEventListener("contextmenu", (event) => showExplorerItemContextMenu(event, record.id, item));
    tbody.appendChild(row);
  });

  return table;
}

function createCertificateCard(certificate, record = null, item = null) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "certificate-card";
  if (item && record) {
    button.dataset.itemKey = item.key;
    button.classList.toggle("is-selected", record.meta.selectedItems.has(item.key));
  }
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
  button.addEventListener("click", (event) => {
    if (record && item) {
      selectExplorerItem(record.id, item.key, event.ctrlKey || event.metaKey);
    } else {
      openCertificatePreview(certificate.id);
    }
  });
  button.addEventListener("dblclick", () => {
    if (record && item) openExplorerItem(record.id, item);
    else openCertificatePreview(certificate.id);
  });
  button.addEventListener("contextmenu", (event) => {
    if (record && item) showExplorerItemContextMenu(event, record.id, item);
  });
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

function renderPortraitBody() {
  const body = document.createElement("div");
  body.className = "window-panel image-viewer-panel";

  body.innerHTML = `
    <div class="image-viewer-toolbar">
      <button type="button" class="win-button">${escapeHtml(t("ui.openFile"))}</button>
      <button type="button" class="win-button">${escapeHtml(t("ui.views"))}</button>
    </div>
    <div class="image-viewer-frame">
      <img class="portrait-image" src="${escapeHtml(PORTRAIT_IMAGE.src)}" alt="${escapeHtml(t("ui.portraitTitle"))}" />
    </div>
    <div class="status-bar">
      <p class="status-bar-field">${escapeHtml(t("ui.imagePath"))}: ${escapeHtml(PORTRAIT_IMAGE.src)}</p>
    </div>
  `;

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
    buildWindowMenuBar(record);
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
  if (record.kind === "folder") {
    activeExplorerId = id;
  }
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

function minimizeWindow(id, options = {}) {
  const record = openWindows.get(id);
  if (!record) return;

  pauseGameOnMinimize(record);
  record.minimized = true;
  record.element.classList.add("is-minimized");
  record.element.classList.remove("is-active");
  if (record.taskbarButton) record.taskbarButton.classList.remove("is-active");
  if (!options.silent) audioManager.play("minimize");

  if (activeWindowId === id) {
    activeWindowId = null;
    focusTopVisibleWindow();
  }
  if (activeExplorerId === id) {
    activeExplorerId = null;
  }
}

function restoreWindow(id, options = {}) {
  const record = openWindows.get(id);
  if (!record) return;

  record.minimized = false;
  record.element.classList.remove("is-minimized");
  focusWindow(id);
  if (!options.silent) audioManager.play("restore");
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
  audioManager.play("restore");
}

function closeWindow(id, options = {}) {
  const record = openWindows.get(id);
  if (!record) return;

  cleanupGameWindow(id);
  record.element.remove();
  if (record.taskbarButton) record.taskbarButton.remove();
  openWindows.delete(id);
  if (!options.silent) audioManager.play("close");

  if (activeWindowId === id) {
    activeWindowId = null;
    focusTopVisibleWindow();
  }
  if (activeExplorerId === id) {
    activeExplorerId = null;
  }
}

function focusTopVisibleWindow() {
  const topRecord = getTopVisibleWindow();

  if (topRecord) {
    focusWindow(topRecord.id);
  }
}

function getTopVisibleWindow() {
  let topRecord = null;
  openWindows.forEach((record) => {
    if (record.minimized) return;
    if (!topRecord || Number(record.element.style.zIndex) > Number(topRecord.element.style.zIndex)) {
      topRecord = record;
    }
  });

  return topRecord;
}

function makeWindowDraggable(record, titleBar) {
  titleBar.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".title-bar-controls button") || record.maximized) return;

    event.preventDefault();
    focusWindow(record.id);
    titleBar.setPointerCapture(event.pointerId);

    const rect = record.element.getBoundingClientRect();
    const layerRect = windowLayer.getBoundingClientRect();
    const shiftX = event.clientX - rect.left;
    const shiftY = event.clientY - rect.top;

    const onPointerMove = (moveEvent) => {
      const position = keepTitleBarReachable(
        moveEvent.clientX - layerRect.left - shiftX,
        moveEvent.clientY - layerRect.top - shiftY,
        rect.width,
        rect.height,
        layerRect,
      );
      record.element.style.left = `${position.left}px`;
      record.element.style.top = `${position.top}px`;
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

function makeWindowResizable(record, resizeHandle) {
  resizeHandle.addEventListener("pointerdown", (event) => {
    if (record.maximized) return;

    event.preventDefault();
    event.stopPropagation();
    focusWindow(record.id);
    resizeHandle.setPointerCapture(event.pointerId);

    const startX = event.clientX;
    const startY = event.clientY;
    const startRect = record.element.getBoundingClientRect();
    const layerRect = windowLayer.getBoundingClientRect();
    const maxWidth = isCompactViewport() ? Math.max(record.minWidth, layerRect.width - 8) : Infinity;
    const maxHeight = isCompactViewport() ? Math.max(record.minHeight, layerRect.height - 8) : Infinity;

    const onPointerMove = (moveEvent) => {
      const width = clamp(startRect.width + moveEvent.clientX - startX, record.minWidth, maxWidth);
      const height = clamp(startRect.height + moveEvent.clientY - startY, record.minHeight, maxHeight);
      record.element.style.width = `${width}px`;
      record.element.style.height = `${height}px`;
    };

    const onPointerUp = () => {
      resizeHandle.releasePointerCapture(event.pointerId);
      resizeHandle.removeEventListener("pointermove", onPointerMove);
      resizeHandle.removeEventListener("pointerup", onPointerUp);
      resizeHandle.removeEventListener("pointercancel", onPointerUp);
    };

    resizeHandle.addEventListener("pointermove", onPointerMove);
    resizeHandle.addEventListener("pointerup", onPointerUp);
    resizeHandle.addEventListener("pointercancel", onPointerUp);
  });
}

function getInitialWindowPosition(requestedWidth, requestedHeight, minWidth = DEFAULT_MIN_WINDOW_WIDTH, minHeight = DEFAULT_MIN_WINDOW_HEIGHT) {
  const layerRect = windowLayer.getBoundingClientRect();
  const compact = isCompactViewport();
  const gutter = compact ? 6 : 8;
  const maxWidth = Math.max(minWidth, layerRect.width - gutter * 2);
  const maxHeight = Math.max(minHeight, layerRect.height - gutter * 2);
  const width = Math.min(Math.max(requestedWidth, minWidth), maxWidth);
  const height = Math.min(Math.max(requestedHeight, minHeight), maxHeight);
  const baseLeft = compact ? gutter : 114;
  const baseTop = compact ? gutter : 34;

  cascadeOffset = (cascadeOffset + 24) % 144;
  const left = clamp(baseLeft + cascadeOffset, gutter, Math.max(gutter, layerRect.width - width - gutter));
  const top = clamp(baseTop + cascadeOffset, gutter, Math.max(gutter, layerRect.height - height - gutter));

  return { left, top, width, height };
}

function getPositionedWindowRect(position, requestedWidth, requestedHeight, minWidth, minHeight) {
  const layerRect = windowLayer.getBoundingClientRect();
  const compact = isCompactViewport();
  const gutter = compact ? 6 : 0;
  const maxWidth = compact ? Math.max(minWidth, layerRect.width - gutter * 2) : Infinity;
  const maxHeight = compact ? Math.max(minHeight, layerRect.height - gutter * 2) : Infinity;
  const width = clamp(position.width || requestedWidth, minWidth, maxWidth);
  const height = clamp(position.height || requestedHeight, minHeight, maxHeight);
  const left = compact
    ? clamp(position.left || gutter, gutter, Math.max(gutter, layerRect.width - width - gutter))
    : position.left || 0;
  const top = compact
    ? clamp(position.top || gutter, gutter, Math.max(gutter, layerRect.height - height - gutter))
    : position.top || 0;

  return { left, top, width, height };
}

function keepTitleBarReachable(left, top, width, height, layerRect) {
  const visibleWidth = Math.min(DRAG_VISIBLE_WIDTH, Math.max(32, width));
  const minLeft = Math.min(0, visibleWidth - width);
  const maxLeft = Math.max(0, layerRect.width - visibleWidth);
  const maxTop = Math.max(0, layerRect.height - DRAG_VISIBLE_TITLE_HEIGHT);

  return {
    left: clamp(left, minLeft, maxLeft),
    top: clamp(top, 0, maxTop),
  };
}

function isCompactViewport() {
  return window.innerWidth <= 720 || windowLayer.getBoundingClientRect().width <= 720;
}

function openInitialWindows() {
  const layout = getInitialStartupLayout();
  openFolder("about", { position: layout.about, silent: true });
  openTextFile("root", "readme", { position: layout.readme, silent: true });
  openPortraitWindow({ position: layout.portrait, silent: true });
}

function getInitialStartupLayout() {
  const layerRect = windowLayer.getBoundingClientRect();

  if (window.innerWidth <= 520) {
    const width = Math.max(250, layerRect.width - 12);
    const height = Math.max(210, Math.min(280, layerRect.height - 46));

    return {
      about: { left: 6, top: 6, width, height },
      readme: { left: 6, top: 34, width, height },
      portrait: { left: 6, top: 62, width, height: Math.max(250, Math.min(360, layerRect.height - 78)) },
    };
  }

  if (window.innerWidth <= 900) {
    const width = Math.min(470, Math.max(320, layerRect.width - 54));
    const left = Math.max(22, layerRect.width - width - 18);

    return {
      about: { left, top: 20, width, height: Math.min(310, layerRect.height - 42) },
      readme: { left: Math.max(12, left - 24), top: 70, width, height: Math.min(290, layerRect.height - 96) },
      portrait: { left: Math.max(12, left - 48), top: 120, width: Math.min(360, width), height: Math.min(390, layerRect.height - 140) },
    };
  }

  const rightEdge = Math.max(540, layerRect.width - 24);
  const aboutWidth = 500;
  const readmeWidth = 430;
  const portraitWidth = 340;

  return {
    about: {
      left: Math.max(118, rightEdge - aboutWidth),
      top: 34,
      width: aboutWidth,
      height: Math.min(340, layerRect.height - 68),
    },
    readme: {
      left: Math.max(144, rightEdge - readmeWidth - 38),
      top: 218,
      width: readmeWidth,
      height: Math.min(290, layerRect.height - 240),
    },
    portrait: {
      left: Math.max(178, rightEdge - portraitWidth - 84),
      top: 86,
      width: portraitWidth,
      height: Math.min(430, layerRect.height - 118),
    },
  };
}

function isDesktopItemVisible(item) {
  return !hiddenDesktopItems.has(item.id);
}

function getDesktopIconPosition(itemId, index) {
  if (!desktopIconPositions.has(itemId)) {
    desktopIconPositions.set(itemId, getDefaultDesktopIconPosition(index));
  }

  return desktopIconPositions.get(itemId);
}

function getDefaultDesktopIconPosition(index) {
  const usableHeight = Math.max(DESKTOP_GRID_Y, windowLayer.getBoundingClientRect().height - 12);
  const rows = Math.max(1, Math.floor(usableHeight / DESKTOP_GRID_Y));
  const column = Math.floor(index / rows);
  const row = index % rows;

  return {
    left: 8 + column * DESKTOP_GRID_X,
    top: 10 + row * DESKTOP_GRID_Y,
  };
}

function selectDesktopItem(itemId, additive = false) {
  if (!additive) desktopSelection.clear();
  if (additive && desktopSelection.has(itemId)) {
    desktopSelection.delete(itemId);
  } else {
    desktopSelection.add(itemId);
  }
  renderDesktopIcons();
}

function clearDesktopSelection() {
  if (!desktopSelection.size) return;
  desktopSelection.clear();
  renderDesktopIcons();
}

function selectAllDesktopIcons() {
  desktopSelection.clear();
  desktopItems.filter(isDesktopItemVisible).forEach((item) => desktopSelection.add(item.id));
  renderDesktopIcons();
}

function startDesktopIconDrag(event, item) {
  if (event.button !== 0) return;
  event.stopPropagation();

  if (!desktopSelection.has(item.id)) {
    selectDesktopItem(item.id, event.ctrlKey || event.metaKey);
  }

  const selectedIds = desktopSelection.has(item.id) ? Array.from(desktopSelection) : [item.id];
  const startPositions = new Map(selectedIds.map((id) => [id, { ...desktopIconPositions.get(id) }]));
  const startX = event.clientX;
  const startY = event.clientY;
  let moved = false;
  const button = event.currentTarget;
  button.setPointerCapture(event.pointerId);

  const onPointerMove = (moveEvent) => {
    const dx = moveEvent.clientX - startX;
    const dy = moveEvent.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    if (!moved) return;

    selectedIds.forEach((id) => {
      const start = startPositions.get(id);
      desktopIconPositions.set(id, {
        left: Math.max(0, start.left + dx),
        top: clamp(start.top + dy, 0, Math.max(0, windowLayer.getBoundingClientRect().height - DESKTOP_ICON_HEIGHT)),
      });
    });
    updateDesktopIconElementPositions();
  };

  const onPointerUp = () => {
    button.releasePointerCapture(event.pointerId);
    button.removeEventListener("pointermove", onPointerMove);
    button.removeEventListener("pointerup", onPointerUp);
    button.removeEventListener("pointercancel", onPointerUp);

    if (moved) {
      if (snapDesktopIcons) snapSelectedDesktopIcons(selectedIds);
      suppressNextDesktopClick = true;
      renderDesktopIcons();
    }
  };

  button.addEventListener("pointermove", onPointerMove);
  button.addEventListener("pointerup", onPointerUp);
  button.addEventListener("pointercancel", onPointerUp);
}

function updateDesktopIconElementPositions() {
  document.querySelectorAll(".desktop-icon").forEach((icon) => {
    const position = desktopIconPositions.get(icon.dataset.itemId);
    if (!position) return;
    icon.style.left = `${position.left}px`;
    icon.style.top = `${position.top}px`;
  });
}

function snapSelectedDesktopIcons(itemIds = Array.from(desktopSelection)) {
  itemIds.forEach((id) => {
    const position = desktopIconPositions.get(id);
    if (!position) return;
    desktopIconPositions.set(id, {
      left: Math.max(0, Math.round((position.left - 8) / DESKTOP_GRID_X) * DESKTOP_GRID_X + 8),
      top: Math.max(0, Math.round((position.top - 10) / DESKTOP_GRID_Y) * DESKTOP_GRID_Y + 10),
    });
  });
}

function startDesktopSelection(event) {
  if (event.button !== 0) return;
  if (event.target.closest(".desktop-icon, .window, .taskbar, .start-menu, .context-menu")) return;

  const desktopRect = desktop.getBoundingClientRect();
  const startX = event.clientX - desktopRect.left;
  const startY = event.clientY - desktopRect.top;

  selectionRectEl = document.createElement("div");
  selectionRectEl.className = "selection-rectangle";
  desktop.appendChild(selectionRectEl);

  const onPointerMove = (moveEvent) => {
    const currentX = moveEvent.clientX - desktopRect.left;
    const currentY = moveEvent.clientY - desktopRect.top;
    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    Object.assign(selectionRectEl.style, {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
    });

    const rect = selectionRectEl.getBoundingClientRect();
    desktopSelection.clear();
    document.querySelectorAll(".desktop-icon").forEach((icon) => {
      const iconRect = icon.getBoundingClientRect();
      if (rectsIntersect(rect, iconRect)) desktopSelection.add(icon.dataset.itemId);
    });
    renderDesktopIcons();
  };

  const onPointerUp = () => {
    desktop.removeEventListener("pointermove", onPointerMove);
    desktop.removeEventListener("pointerup", onPointerUp);
    desktop.removeEventListener("pointercancel", onPointerUp);
    selectionRectEl?.remove();
    selectionRectEl = null;
  };

  desktop.addEventListener("pointermove", onPointerMove);
  desktop.addEventListener("pointerup", onPointerUp);
  desktop.addEventListener("pointercancel", onPointerUp);
}

function rectsIntersect(a, b) {
  return a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top;
}

function getVirtualFolder(folderId) {
  if (folderId === "root") {
    return { icon: "computer", label: { ru: "Рабочий стол", en: "Desktop" }, files: {} };
  }
  if (folderId === "recycle-bin") {
    return { icon: recycleBin.length ? "recycleFull" : "recycleBin", label: { ru: "Корзина", en: "Recycle Bin" }, files: {} };
  }

  return fileSystem[folderId] || null;
}

function getFolderItems(folderId) {
  if (folderId === "root") {
    return desktopItems.filter(isDesktopItemVisible).map((item) => ({
      key: `desktop:${item.id}`,
      id: item.id,
      kind: item.type === "folder" ? "folder" : item.type === "systemFolder" ? "systemFolder" : "rootText",
      source: "desktop",
      item,
      icon: getDesktopItemIcon(item),
      size: item.type === "folder" || item.type === "systemFolder" ? "" : "2 KB",
      modified: "2026-06-11",
    }));
  }

  if (folderId === "recycle-bin") {
    return recycleBin.map((entry) => ({
      key: entry.recycleId,
      id: entry.recycleId,
      kind: "recycle",
      icon: entry.icon,
      label: entry.label,
      typeLabel: entry.typeLabel,
      size: entry.size || "1 KB",
      modified: entry.modified || "2026-06-11",
      entry,
    }));
  }

  const folder = fileSystem[folderId];
  if (!folder) return [];

  const items = Object.entries(folder.files || {}).map(([fileId, file]) => ({
    key: `file:${folderId}:${fileId}`,
    id: fileId,
    kind: file.type === "image" ? "image" : file.type === "app" ? "app" : "text",
    parentId: folderId,
    item: file,
    icon: file.icon || (file.type === "image" ? "image" : getFileIconType(folderId, fileId)),
    size: file.size || "1 KB",
    modified: file.modified || "2026-06-11",
  }));

  if (folder.certificates) {
    certificates.forEach((certificate) => {
      items.push({
        key: `certificate:${certificate.id}`,
        id: certificate.id,
        kind: "certificate",
        parentId: folderId,
        item: certificate,
        icon: "certificates",
        size: certificate.previewAvailable ? "File" : "0 KB",
        modified: getLocalized(certificate.date),
      });
    });
  }

  return items;
}

function getExplorerTreeItems() {
  return [
    { id: "root", icon: "computer", label: { ru: "Рабочий стол", en: "Desktop" } },
    ...desktopItems
      .filter((item) => item.type === "folder" && isDesktopItemVisible(item))
      .map((item) => ({ id: item.id, icon: getDesktopItemIcon(item), label: fileSystem[item.id].label })),
    { id: "recycle-bin", icon: recycleBin.length ? "recycleFull" : "recycleBin", label: { ru: "Корзина", en: "Recycle Bin" } },
  ];
}

function getFolderPath(folderId) {
  const folder = getVirtualFolder(folderId);
  if (folderId === "root") return "C:\\Portfolio\\Desktop";
  return `C:\\Portfolio\\${getLocalized(folder?.label || folderId)}`;
}

function getParentFolderId(folderId) {
  if (folderId === "root") return null;
  return "root";
}

function getViewModeLabel(viewMode) {
  if (viewMode === "small") return t("ui.smallIcons");
  if (viewMode === "list") return t("ui.list");
  if (viewMode === "details") return t("ui.details");
  return t("ui.largeIcons");
}

function getExplorerItemLabel(item) {
  if (!item) return "";
  if (item.kind === "folder" || item.kind === "systemFolder" || item.kind === "rootText") {
    return getDesktopItemLabel(item.item);
  }
  if (item.kind === "recycle") return getLocalized(item.label);
  if (item.kind === "certificate") return getLocalized(item.item.title);
  return getLocalized(item.item.filename);
}

function getExplorerItemType(item) {
  if (!item) return "";
  if (item.kind === "folder") return t("ui.explorer");
  if (item.kind === "systemFolder") return t("desktop.recycleBin");
  if (item.kind === "rootText" || item.kind === "text") return t("ui.notepad");
  if (item.kind === "app") return t("ui.application");
  if (item.kind === "image") return t("ui.imageViewer");
  if (item.kind === "certificate") return t("ui.certificatePreview");
  if (item.kind === "recycle") return getLocalized(item.typeLabel);
  return t("ui.filePath");
}

function navigateExplorerTo(windowId, folderId, pushHistory = true) {
  const record = openWindows.get(windowId);
  if (!record || !getVirtualFolder(folderId)) return;
  if (pushHistory && record.meta.currentFolderId !== folderId) {
    record.meta.history.push(record.meta.currentFolderId);
  }
  record.meta.currentFolderId = folderId;
  record.meta.selectedItems = new Set();
  updateWindowRecord(record);
  focusWindow(windowId);
}

function navigateExplorerBack(windowId) {
  const record = openWindows.get(windowId);
  if (!record || !record.meta.history.length) return;
  const previous = record.meta.history.pop();
  navigateExplorerTo(windowId, previous, false);
}

function navigateExplorerUp(windowId) {
  const record = openWindows.get(windowId);
  if (!record) return;
  const parentId = getParentFolderId(record.meta.currentFolderId);
  if (parentId) navigateExplorerTo(windowId, parentId);
}

function cycleExplorerView(windowId) {
  const record = openWindows.get(windowId);
  if (!record) return;
  const index = VIEW_MODES.indexOf(record.meta.viewMode || "large");
  record.meta.viewMode = VIEW_MODES[(index + 1) % VIEW_MODES.length];
  updateWindowRecord(record);
}

function setExplorerView(windowId, viewMode) {
  const record = openWindows.get(windowId);
  if (!record || !VIEW_MODES.includes(viewMode)) return;
  record.meta.viewMode = viewMode;
  updateWindowRecord(record);
}

function selectExplorerItem(windowId, itemKey, additive = false) {
  const record = openWindows.get(windowId);
  if (!record) return;
  if (!additive) record.meta.selectedItems.clear();
  if (additive && record.meta.selectedItems.has(itemKey)) {
    record.meta.selectedItems.delete(itemKey);
  } else {
    record.meta.selectedItems.add(itemKey);
  }
  activeExplorerId = windowId;
  updateWindowRecord(record);
  focusWindow(windowId);
}

function clearExplorerSelection(windowId) {
  const record = openWindows.get(windowId);
  if (!record || !record.meta.selectedItems.size) return;
  record.meta.selectedItems.clear();
  updateWindowRecord(record);
}

function selectAllExplorerItems(windowId) {
  const record = openWindows.get(windowId);
  if (!record) return false;
  record.meta.selectedItems = new Set(getFolderItems(record.meta.currentFolderId).map((item) => item.key));
  updateWindowRecord(record);
  return true;
}

function getSelectedExplorerItems(record) {
  const items = getFolderItems(record.meta.currentFolderId);
  return items.filter((item) => record.meta.selectedItems.has(item.key));
}

function openExplorerItem(windowId, item) {
  const record = openWindows.get(windowId);
  if (!record || !item) return;

  if (item.kind === "folder") {
    navigateExplorerTo(windowId, item.id);
  } else if (item.kind === "systemFolder") {
    navigateExplorerTo(windowId, "recycle-bin");
  } else if (item.kind === "rootText") {
    openTextFile("root", item.id);
  } else if (item.kind === "text") {
    openTextFile(item.parentId, item.id);
  } else if (item.kind === "app") {
    openApp(item.item.app);
  } else if (item.kind === "image") {
    openImageFile(item.parentId, item.id, item.item);
  } else if (item.kind === "certificate") {
    openCertificatePreview(item.id);
  } else if (item.kind === "recycle") {
    showPropertiesDialog(item);
  }
}

function openImageFile(parentId, fileId, file, options = {}) {
  const windowId = `image:${parentId}:${fileId}`;
  if (focusExistingWindow(windowId)) return;

  createWindow({
    id: windowId,
    kind: "image",
    iconType: "image",
    width: 340,
    height: 430,
    minWidth: 250,
    minHeight: 230,
    getTitle: () => `${getLocalized(file.filename)} - ${t("ui.imageViewer")}`,
    renderBody: () => renderImageBody(file),
    ...options,
  });
}

function renderImageBody(file) {
  const body = document.createElement("div");
  body.className = "window-panel image-viewer-panel";
  body.innerHTML = `
    <div class="image-viewer-toolbar">
      <button type="button" class="win-button">${escapeHtml(t("ui.openFile"))}</button>
      <button type="button" class="win-button">${escapeHtml(t("ui.views"))}</button>
    </div>
    <div class="image-viewer-frame">
      <img class="portrait-image" src="${escapeHtml(file.file)}" alt="${escapeHtml(getLocalized(file.title || file.filename))}" />
    </div>
    <div class="status-bar">
      <p class="status-bar-field">${escapeHtml(t("ui.imagePath"))}: ${escapeHtml(file.file)}</p>
    </div>
  `;
  return body;
}

function renderSnakeBody(windowId) {
  const state = gameStates.get(windowId);
  const body = document.createElement("div");
  body.className = "window-panel game-panel snake-panel";

  body.innerHTML = `
    <div class="game-toolbar">
      <div class="game-stat"><span>${escapeHtml(t("games.snake.score"))}</span><strong class="snake-score">0</strong></div>
      <div class="game-stat"><span>${escapeHtml(t("games.snake.best"))}</span><strong class="snake-best">0</strong></div>
      <button type="button" class="win-button snake-start">${escapeHtml(t("games.snake.start"))}</button>
      <button type="button" class="win-button snake-pause">${escapeHtml(t("games.snake.pause"))}</button>
      <button type="button" class="win-button snake-reset">${escapeHtml(t("games.snake.reset"))}</button>
    </div>
    <div class="snake-stage">
      <canvas class="snake-canvas" width="${SNAKE_GRID_SIZE * SNAKE_CELL_SIZE}" height="${SNAKE_GRID_SIZE * SNAKE_CELL_SIZE}" aria-label="${escapeHtml(t("games.snake.title"))}"></canvas>
      <div class="snake-message"></div>
    </div>
    <div class="snake-controls" aria-label="${escapeHtml(t("games.snake.title"))}">
      <span></span>
      <button type="button" class="snake-control-button" data-direction="up">↑</button>
      <span></span>
      <button type="button" class="snake-control-button" data-direction="left">←</button>
      <button type="button" class="snake-control-button" data-direction="down">↓</button>
      <button type="button" class="snake-control-button" data-direction="right">→</button>
    </div>
  `;

  if (!state) return body;

  state.elements = {
    score: body.querySelector(".snake-score"),
    best: body.querySelector(".snake-best"),
    canvas: body.querySelector(".snake-canvas"),
    message: body.querySelector(".snake-message"),
    pauseButton: body.querySelector(".snake-pause"),
  };

  body.querySelector(".snake-start").addEventListener("click", () => startSnakeGame(state));
  body.querySelector(".snake-pause").addEventListener("click", () => toggleSnakePause(state));
  body.querySelector(".snake-reset").addEventListener("click", () => resetSnakeGame(state));
  body.querySelectorAll(".snake-control-button").forEach((button) => {
    button.addEventListener("click", () => {
      setSnakeDirection(state, button.dataset.direction);
      if (state.status === "idle") startSnakeGame(state);
    });
  });

  updateSnakeHud(state);
  drawSnakeGame(state);
  return body;
}

function createSnakeState(windowId) {
  const state = {
    type: "snake",
    windowId,
    gridSize: SNAKE_GRID_SIZE,
    cellSize: SNAKE_CELL_SIZE,
    snake: [],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: { x: 0, y: 0 },
    score: 0,
    best: getStoredSnakeBestScore(),
    status: "idle",
    intervalId: null,
    elements: {},
  };
  resetSnakeGame(state, { render: false });
  return state;
}

function resetSnakeGame(state, options = {}) {
  clearSnakeInterval(state);
  const center = Math.floor(state.gridSize / 2);
  state.snake = [
    { x: center, y: center },
    { x: center - 1, y: center },
    { x: center - 2, y: center },
  ];
  state.direction = { x: 1, y: 0 };
  state.nextDirection = { x: 1, y: 0 };
  state.score = 0;
  state.status = "idle";
  state.food = spawnSnakeFood(state);
  if (options.render !== false) updateGameWindow(state.windowId);
}

function startSnakeGame(state) {
  if (state.status === "game-over") {
    resetSnakeGame(state, { render: false });
  }
  state.status = "running";
  ensureSnakeInterval(state);
  updateGameWindow(state.windowId);
}

function toggleSnakePause(state) {
  if (state.status === "running") {
    pauseSnakeGame(state);
  } else if (state.status === "paused") {
    startSnakeGame(state);
  }
}

function pauseSnakeGame(state, options = {}) {
  if (state.status !== "running") return;
  state.status = "paused";
  clearSnakeInterval(state);
  if (options.render !== false) updateGameWindow(state.windowId);
}

function ensureSnakeInterval(state) {
  if (state.intervalId) return;
  state.intervalId = window.setInterval(() => tickSnakeGame(state), SNAKE_TICK_MS);
}

function clearSnakeInterval(state) {
  if (!state.intervalId) return;
  window.clearInterval(state.intervalId);
  state.intervalId = null;
}

function tickSnakeGame(state) {
  if (state.status !== "running") return;

  state.direction = { ...state.nextDirection };
  const head = state.snake[0];
  const nextHead = {
    x: head.x + state.direction.x,
    y: head.y + state.direction.y,
  };
  const hitWall =
    nextHead.x < 0 ||
    nextHead.y < 0 ||
    nextHead.x >= state.gridSize ||
    nextHead.y >= state.gridSize;
  const hitSelf = state.snake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);

  if (hitWall || hitSelf) {
    state.status = "game-over";
    clearSnakeInterval(state);
    updateGameWindow(state.windowId);
    return;
  }

  state.snake.unshift(nextHead);

  if (nextHead.x === state.food.x && nextHead.y === state.food.y) {
    state.score += 10;
    if (state.score > state.best) {
      state.best = state.score;
      saveSnakeBestScore(state.best);
    }
    state.food = spawnSnakeFood(state);
  } else {
    state.snake.pop();
  }

  updateSnakeHud(state);
  drawSnakeGame(state);
}

function setSnakeDirection(state, directionName) {
  const directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };
  const next = directions[directionName];
  if (!next) return;
  if (state.snake.length > 1 && next.x + state.direction.x === 0 && next.y + state.direction.y === 0) {
    return;
  }
  state.nextDirection = next;
}

function spawnSnakeFood(state) {
  const occupied = new Set(state.snake.map((segment) => `${segment.x}:${segment.y}`));
  const emptyCells = [];

  for (let y = 0; y < state.gridSize; y += 1) {
    for (let x = 0; x < state.gridSize; x += 1) {
      if (!occupied.has(`${x}:${y}`)) emptyCells.push({ x, y });
    }
  }

  return emptyCells[Math.floor(Math.random() * emptyCells.length)] || { x: 0, y: 0 };
}

function updateSnakeHud(state) {
  if (!state.elements?.score) return;
  state.elements.score.textContent = String(state.score);
  state.elements.best.textContent = String(state.best);
  state.elements.message.textContent = getSnakeMessage(state);
  state.elements.message.hidden = state.status === "running";
  state.elements.pauseButton.disabled = state.status === "idle" || state.status === "game-over";
}

function drawSnakeGame(state) {
  const canvas = state.elements?.canvas;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const size = state.cellSize;
  context.imageSmoothingEnabled = false;
  context.fillStyle = "#001c10";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#184830";

  for (let line = 0; line <= state.gridSize; line += 1) {
    context.beginPath();
    context.moveTo(line * size + 0.5, 0);
    context.lineTo(line * size + 0.5, canvas.height);
    context.moveTo(0, line * size + 0.5);
    context.lineTo(canvas.width, line * size + 0.5);
    context.stroke();
  }

  context.fillStyle = "#ff3030";
  context.fillRect(state.food.x * size + 2, state.food.y * size + 2, size - 4, size - 4);

  state.snake.forEach((segment, index) => {
    context.fillStyle = index === 0 ? "#c8ff50" : "#20c050";
    context.fillRect(segment.x * size + 1, segment.y * size + 1, size - 2, size - 2);
    context.strokeStyle = "#003000";
    context.strokeRect(segment.x * size + 1.5, segment.y * size + 1.5, size - 3, size - 3);
  });
}

function getSnakeMessage(state) {
  if (state.status === "paused") return t("games.snake.paused");
  if (state.status === "game-over") return t("games.snake.gameOver");
  if (state.status === "idle") return t("games.snake.pressStart");
  return "";
}

function getStoredSnakeBestScore() {
  try {
    return Number(localStorage.getItem(SNAKE_BEST_STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveSnakeBestScore(score) {
  try {
    localStorage.setItem(SNAKE_BEST_STORAGE_KEY, String(score));
  } catch {
    // Best score is optional; the game still works without storage access.
  }
}

function renderMinesweeperBody(windowId) {
  const state = gameStates.get(windowId);
  const body = document.createElement("div");
  body.className = "window-panel game-panel minesweeper-panel";
  body.innerHTML = `
    <div class="minesweeper-header">
      <div class="minesweeper-counter"><span>${escapeHtml(t("games.minesweeper.mines"))}</span><strong class="minesweeper-mines">010</strong></div>
      <button type="button" class="minesweeper-face" aria-label="${escapeHtml(t("games.minesweeper.newGame"))}">:)</button>
      <div class="minesweeper-counter"><span>${escapeHtml(t("games.minesweeper.time"))}</span><strong class="minesweeper-time">000</strong></div>
    </div>
    <div class="minesweeper-message"></div>
    <div class="minesweeper-grid" role="grid" aria-label="${escapeHtml(t("games.minesweeper.title"))}"></div>
  `;

  if (!state) return body;

  state.elements = {
    mineCounter: body.querySelector(".minesweeper-mines"),
    timer: body.querySelector(".minesweeper-time"),
    face: body.querySelector(".minesweeper-face"),
    message: body.querySelector(".minesweeper-message"),
    grid: body.querySelector(".minesweeper-grid"),
  };
  state.elements.face.addEventListener("click", () => resetMinesweeper(state));
  renderMinesweeperGrid(state);
  updateMinesweeperHeader(state);
  return body;
}

function createMinesweeperState(windowId) {
  const state = {
    type: "minesweeper",
    windowId,
    rows: MINESWEEPER_ROWS,
    cols: MINESWEEPER_COLS,
    mineCount: MINESWEEPER_MINES,
    cells: [],
    generated: false,
    status: "ready",
    flags: 0,
    opened: 0,
    seconds: 0,
    timerId: null,
    elements: {},
  };
  resetMinesweeper(state, { render: false });
  return state;
}

function resetMinesweeper(state, options = {}) {
  stopMinesweeperTimer(state);
  state.cells = Array.from({ length: state.rows * state.cols }, () => ({
    mine: false,
    open: false,
    flagged: false,
    adjacent: 0,
  }));
  state.generated = false;
  state.status = "ready";
  state.flags = 0;
  state.opened = 0;
  state.seconds = 0;
  if (options.render !== false) updateGameWindow(state.windowId);
}

function generateMinesweeperBoard(state, firstRow, firstCol) {
  const safeIndex = firstRow * state.cols + firstCol;
  const minePositions = new Set();

  while (minePositions.size < state.mineCount) {
    const index = Math.floor(Math.random() * state.cells.length);
    if (index !== safeIndex) minePositions.add(index);
  }

  minePositions.forEach((index) => {
    state.cells[index].mine = true;
  });

  state.cells.forEach((cell, index) => {
    if (cell.mine) return;
    const row = Math.floor(index / state.cols);
    const col = index % state.cols;
    cell.adjacent = getMinesweeperNeighbors(state, row, col).filter((neighbor) => neighbor.mine).length;
  });

  state.generated = true;
}

function getMinesweeperNeighbors(state, row, col) {
  const neighbors = [];
  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      if (!rowOffset && !colOffset) continue;
      const nextRow = row + rowOffset;
      const nextCol = col + colOffset;
      if (nextRow < 0 || nextCol < 0 || nextRow >= state.rows || nextCol >= state.cols) continue;
      neighbors.push(state.cells[nextRow * state.cols + nextCol]);
    }
  }
  return neighbors;
}

function openMinesweeperCell(state, row, col) {
  if (state.status === "lost" || state.status === "won") return;
  const cell = state.cells[row * state.cols + col];
  if (!cell || cell.open || cell.flagged) return;

  if (!state.generated) {
    generateMinesweeperBoard(state, row, col);
    state.status = "playing";
    startMinesweeperTimer(state);
  }

  if (cell.mine) {
    cell.open = true;
    finishMinesweeper(state, "lost");
    return;
  }

  revealMinesweeperFrom(state, row, col);
  checkMinesweeperWin(state);
  renderMinesweeperGrid(state);
  updateMinesweeperHeader(state);
}

function revealMinesweeperFrom(state, row, col) {
  const stack = [{ row, col }];
  const visited = new Set();

  while (stack.length) {
    const current = stack.pop();
    const key = `${current.row}:${current.col}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const cell = state.cells[current.row * state.cols + current.col];
    if (!cell || cell.open || cell.flagged || cell.mine) continue;

    cell.open = true;
    state.opened += 1;

    if (cell.adjacent === 0) {
      for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
        for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
          if (!rowOffset && !colOffset) continue;
          const nextRow = current.row + rowOffset;
          const nextCol = current.col + colOffset;
          if (nextRow < 0 || nextCol < 0 || nextRow >= state.rows || nextCol >= state.cols) continue;
          stack.push({ row: nextRow, col: nextCol });
        }
      }
    }
  }
}

function toggleMinesweeperFlag(state, row, col) {
  if (state.status === "lost" || state.status === "won") return;
  const cell = state.cells[row * state.cols + col];
  if (!cell || cell.open) return;
  cell.flagged = !cell.flagged;
  state.flags += cell.flagged ? 1 : -1;
  renderMinesweeperGrid(state);
  updateMinesweeperHeader(state);
}

function checkMinesweeperWin(state) {
  if (state.opened >= state.cells.length - state.mineCount) {
    finishMinesweeper(state, "won");
  }
}

function finishMinesweeper(state, status) {
  state.status = status;
  stopMinesweeperTimer(state);
  if (status === "won") {
    state.flags = state.mineCount;
    state.cells.forEach((cell) => {
      if (cell.mine) cell.flagged = true;
    });
  }
  renderMinesweeperGrid(state);
  updateMinesweeperHeader(state);
}

function startMinesweeperTimer(state) {
  if (state.timerId) return;
  state.timerId = window.setInterval(() => {
    state.seconds += 1;
    updateMinesweeperHeader(state);
  }, 1000);
}

function stopMinesweeperTimer(state) {
  if (!state.timerId) return;
  window.clearInterval(state.timerId);
  state.timerId = null;
}

function updateMinesweeperHeader(state) {
  if (!state.elements?.mineCounter) return;
  const remaining = state.mineCount - state.flags;
  state.elements.mineCounter.textContent = formatMinesweeperNumber(remaining);
  state.elements.timer.textContent = formatMinesweeperNumber(state.seconds);
  state.elements.face.textContent = getMinesweeperFace(state);
  state.elements.message.textContent = getMinesweeperMessage(state);
  state.elements.message.hidden = state.status === "ready" || state.status === "playing";
}

function renderMinesweeperGrid(state) {
  const grid = state.elements?.grid;
  if (!grid) return;
  grid.innerHTML = "";
  grid.style.setProperty("--cols", state.cols);

  state.cells.forEach((cell, index) => {
    const row = Math.floor(index / state.cols);
    const col = index % state.cols;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "minesweeper-cell";
    button.dataset.row = String(row);
    button.dataset.col = String(col);
    button.setAttribute("role", "gridcell");
    button.setAttribute("aria-label", `${row + 1}, ${col + 1}`);
    button.classList.toggle("is-open", cell.open || (state.status === "lost" && cell.mine));
    button.classList.toggle("is-flagged", cell.flagged);
    button.classList.toggle("is-mine", state.status === "lost" && cell.mine);
    if (cell.open && cell.adjacent) button.classList.add(`value-${cell.adjacent}`);

    if (cell.flagged && !cell.open) {
      button.textContent = "⚑";
    } else if (state.status === "lost" && cell.mine) {
      button.textContent = "*";
    } else if (cell.open && cell.adjacent) {
      button.textContent = String(cell.adjacent);
    }

    let longPressTimer = null;
    let longPressed = false;
    button.addEventListener("pointerdown", (event) => {
      if (event.button && event.button !== 0) return;
      longPressed = false;
      longPressTimer = window.setTimeout(() => {
        longPressed = true;
        toggleMinesweeperFlag(state, row, col);
      }, 520);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => {
      button.addEventListener(eventName, () => {
        if (longPressTimer) window.clearTimeout(longPressTimer);
        longPressTimer = null;
      });
    });
    button.addEventListener("click", (event) => {
      if (longPressed) {
        event.preventDefault();
        return;
      }
      openMinesweeperCell(state, row, col);
    });
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      toggleMinesweeperFlag(state, row, col);
    });
    grid.appendChild(button);
  });
}

function formatMinesweeperNumber(value) {
  const sign = value < 0 ? "-" : "";
  return `${sign}${String(Math.abs(value)).padStart(3, "0").slice(-3)}`;
}

function getMinesweeperFace(state) {
  if (state.status === "won") return "B)";
  if (state.status === "lost") return "X(";
  return ":)";
}

function getMinesweeperMessage(state) {
  if (state.status === "won") return t("games.minesweeper.win");
  if (state.status === "lost") return t("games.minesweeper.gameOver");
  return t("games.minesweeper.newGame");
}

function handleActiveGameKeydown(event) {
  const record = activeWindowId ? openWindows.get(activeWindowId) : null;
  if (!record || record.kind !== "game" || record.minimized) return false;
  const state = gameStates.get(record.id);
  if (!state || state.type !== "snake") return false;

  const key = event.key.toLowerCase();
  const keyDirections = {
    arrowup: "up",
    w: "up",
    arrowdown: "down",
    s: "down",
    arrowleft: "left",
    a: "left",
    arrowright: "right",
    d: "right",
  };

  if (keyDirections[key]) {
    setSnakeDirection(state, keyDirections[key]);
    if (state.status === "idle") startSnakeGame(state);
    return true;
  }

  if (event.key === " ") {
    toggleSnakePause(state);
    return true;
  }

  if (event.key === "Enter") {
    startSnakeGame(state);
    return true;
  }

  return false;
}

function pauseGameOnMinimize(record) {
  if (record?.kind !== "game" || record.meta?.appId !== "snake") return;
  const state = gameStates.get(record.id);
  if (state?.type === "snake") pauseSnakeGame(state);
}

function cleanupGameWindow(windowId) {
  const state = gameStates.get(windowId);
  if (!state) return;
  if (state.type === "snake") clearSnakeInterval(state);
  if (state.type === "minesweeper") stopMinesweeperTimer(state);
  gameStates.delete(windowId);
}

function updateGameWindow(windowId) {
  const record = openWindows.get(windowId);
  if (record) updateWindowRecord(record);
}

function deleteCurrentSelection() {
  const record = activeExplorerId ? openWindows.get(activeExplorerId) : null;
  if (record?.kind === "folder" && record.meta.selectedItems?.size) {
    confirmDeleteItems(getSelectedExplorerItems(record), () => deleteExplorerSelection(record.id));
    return true;
  }

  if (desktopSelection.size) {
    const items = Array.from(desktopSelection)
      .map((id) => desktopItems.find((item) => item.id === id))
      .filter(Boolean);
    confirmDeleteItems(items, deleteSelectedDesktopItems);
    return true;
  }

  return false;
}

function openCurrentSelection() {
  const record = activeExplorerId ? openWindows.get(activeExplorerId) : null;
  if (record?.kind === "folder" && record.meta.selectedItems?.size === 1) {
    openExplorerItem(record.id, getSelectedExplorerItems(record)[0]);
    return true;
  }

  if (desktopSelection.size === 1) {
    const id = Array.from(desktopSelection)[0];
    const item = desktopItems.find((desktopItem) => desktopItem.id === id);
    if (item) openDesktopItem(item);
    return true;
  }

  return false;
}

function renameCurrentSelection() {
  const record = activeExplorerId ? openWindows.get(activeExplorerId) : null;
  if (record?.kind === "folder" && record.meta.selectedItems?.size === 1) {
    showRenameDialog(getSelectedExplorerItems(record)[0], record.id);
    return true;
  }

  if (desktopSelection.size === 1) {
    const id = Array.from(desktopSelection)[0];
    const item = desktopItems.find((desktopItem) => desktopItem.id === id);
    if (item?.id === "recycle-bin") {
      showWarningDialog(t("ui.cannotDeleteRecycleBin"));
    } else if (item) {
      showRenameDialog({ kind: item.type === "folder" ? "folder" : "rootText", source: "desktop", item, id, key: `desktop:${id}` });
    }
    return true;
  }

  return false;
}

function selectAllCurrentArea() {
  const record = activeExplorerId ? openWindows.get(activeExplorerId) : null;
  if (record?.kind === "folder") return selectAllExplorerItems(record.id);
  selectAllDesktopIcons();
  return true;
}

function deleteSelectedDesktopItems() {
  Array.from(desktopSelection).forEach((id) => {
    const item = desktopItems.find((desktopItem) => desktopItem.id === id);
    if (!item || id === "recycle-bin" || hiddenDesktopItems.has(id)) return;
    hiddenDesktopItems.add(id);
    recycleBin.push({
      recycleId: `recycle:${Date.now()}:${id}:${Math.random().toString(16).slice(2)}`,
      source: { type: "desktop", id },
      label: getDesktopItemLabel(item),
      icon: getDesktopItemIcon(item),
      typeLabel: item.type === "folder" ? t("ui.explorer") : t("ui.notepad"),
      size: item.type === "folder" ? "" : "2 KB",
      modified: "2026-06-11",
    });
  });
  desktopSelection.clear();
  refreshAllExplorerWindows();
  renderDesktopIcons();
}

function deleteExplorerSelection(windowId) {
  const record = openWindows.get(windowId);
  if (!record) return;

  getSelectedExplorerItems(record).forEach((item) => moveExplorerItemToRecycle(item));
  record.meta.selectedItems.clear();
  refreshAllExplorerWindows();
  renderDesktopIcons();
}

function moveExplorerItemToRecycle(item) {
  if (!item || item.id === "recycle-bin") {
    showWarningDialog(t("ui.cannotDeleteRecycleBin"));
    return;
  }

  if (item.source === "desktop") {
    const desktopItem = item.item;
    hiddenDesktopItems.add(desktopItem.id);
    recycleBin.push({
      recycleId: `recycle:${Date.now()}:${desktopItem.id}:${Math.random().toString(16).slice(2)}`,
      source: { type: "desktop", id: desktopItem.id },
      label: getDesktopItemLabel(desktopItem),
      icon: getDesktopItemIcon(desktopItem),
      typeLabel: getExplorerItemType(item),
      size: item.size,
      modified: item.modified,
    });
    return;
  }

  if (item.kind === "text" || item.kind === "image" || item.kind === "app") {
    const file = fileSystem[item.parentId]?.files?.[item.id];
    if (!file) return;
    delete fileSystem[item.parentId].files[item.id];
    recycleBin.push({
      recycleId: `recycle:${Date.now()}:${item.parentId}:${item.id}:${Math.random().toString(16).slice(2)}`,
      source: { type: "folderFile", parentId: item.parentId, id: item.id, file },
      label: getExplorerItemLabel(item),
      icon: item.icon,
      typeLabel: getExplorerItemType(item),
      size: item.size,
      modified: item.modified,
    });
  } else if (item.kind === "certificate") {
    const index = certificates.findIndex((certificate) => certificate.id === item.id);
    if (index < 0) return;
    const [certificate] = certificates.splice(index, 1);
    recycleBin.push({
      recycleId: `recycle:${Date.now()}:certificate:${item.id}:${Math.random().toString(16).slice(2)}`,
      source: { type: "certificate", index, certificate },
      label: getExplorerItemLabel(item),
      icon: item.icon,
      typeLabel: getExplorerItemType(item),
      size: item.size,
      modified: item.modified,
    });
  } else if (item.kind === "recycle") {
    const index = recycleBin.findIndex((entry) => entry.recycleId === item.entry.recycleId);
    if (index >= 0) recycleBin.splice(index, 1);
  }
}

function confirmDeleteItems(items, onConfirm) {
  if (!items.length) {
    showWarningDialog(t("ui.commandUnavailable"));
    return;
  }
  if (items.some((item) => item?.id === "recycle-bin")) {
    showWarningDialog(t("ui.cannotDeleteRecycleBin"));
    return;
  }
  openConfirmDialog(t("ui.confirmDeleteTitle"), t("ui.confirmDeleteMessage"), onConfirm);
}

function restoreRecycleItem(recycleId) {
  const index = recycleBin.findIndex((entry) => entry.recycleId === recycleId);
  if (index < 0) return;
  const [entry] = recycleBin.splice(index, 1);

  if (entry.source.type === "desktop") {
    hiddenDesktopItems.delete(entry.source.id);
  } else if (entry.source.type === "folderFile") {
    fileSystem[entry.source.parentId].files[entry.source.id] = entry.source.file;
  } else if (entry.source.type === "certificate") {
    certificates.splice(Math.min(entry.source.index, certificates.length), 0, entry.source.certificate);
  }

  refreshAllExplorerWindows();
  renderDesktopIcons();
}

function confirmEmptyRecycleBin() {
  if (!recycleBin.length) return;
  openConfirmDialog(t("ui.confirmDeleteTitle"), t("ui.confirmEmptyRecycleBin"), () => {
    recycleBin.length = 0;
    refreshAllExplorerWindows();
    renderDesktopIcons();
  });
}

function refreshAllExplorerWindows() {
  openWindows.forEach((record) => {
    if (record.kind === "folder") {
      record.meta.selectedItems = new Set(
        Array.from(record.meta.selectedItems || []).filter((key) =>
          getFolderItems(record.meta.currentFolderId).some((item) => item.key === key),
        ),
      );
      updateWindowRecord(record);
    }
  });
}

function showPropertiesDialog(item) {
  const title = item ? `${getExplorerItemLabel(item)} - ${t("ui.properties")}` : t("ui.properties");
  const windowId = `dialog:properties:${Date.now()}`;
  createWindow({
    id: windowId,
    kind: "dialog",
    iconType: item?.icon || "document",
    width: 360,
    height: 250,
    hasMenu: false,
    getTitle: () => title,
    renderBody: () => renderPropertiesBody(item, windowId),
  });
}

function renderPropertiesBody(item, windowId) {
  const body = document.createElement("div");
  body.className = "window-panel dialog-body properties-dialog";
  const location =
    item?.kind === "recycle"
      ? t("desktop.recycleBin")
      : item?.parentId
        ? getFolderPath(item.parentId)
        : "C:\\Portfolio\\Desktop";

  body.innerHTML = `
    <div class="properties-summary">
      ${getLargeIconMarkup(item?.icon || "document")}
      <strong>${escapeHtml(getExplorerItemLabel(item) || t("ui.properties"))}</strong>
    </div>
    <dl class="properties-list">
      <div><dt>${escapeHtml(t("ui.type"))}</dt><dd>${escapeHtml(getExplorerItemType(item))}</dd></div>
      <div><dt>${escapeHtml(t("ui.location"))}</dt><dd>${escapeHtml(location)}</dd></div>
      <div><dt>${escapeHtml(t("ui.size"))}</dt><dd>${escapeHtml(item?.size || "1 KB")}</dd></div>
      <div><dt>${escapeHtml(t("ui.modified"))}</dt><dd>${escapeHtml(item?.modified || "2026-06-11")}</dd></div>
    </dl>
    <div class="dialog-actions">
      <button type="button" class="win-button dialog-ok">${escapeHtml(t("ui.ok"))}</button>
    </div>
  `;
  body.querySelector(".dialog-ok").addEventListener("click", () => closeWindow(windowId));
  return body;
}

function showRenameDialog(item, sourceWindowId = null) {
  if (!item || item.kind === "recycle" || item.id === "recycle-bin") {
    showWarningDialog(t("ui.commandUnavailable"));
    return;
  }

  const windowId = `dialog:rename:${Date.now()}`;
  const currentName = getExplorerItemLabel(item);
  createWindow({
    id: windowId,
    kind: "dialog",
    iconType: item.icon || "document",
    width: 330,
    height: 160,
    hasMenu: false,
    getTitle: () => t("ui.rename"),
    renderBody: () => {
      const body = document.createElement("div");
      body.className = "window-panel dialog-body";
      body.innerHTML = `
        <label class="rename-field">
          <span>${escapeHtml(t("ui.name"))}</span>
          <input class="rename-input" type="text" value="${escapeHtml(currentName)}" />
        </label>
        <div class="dialog-actions">
          <button type="button" class="win-button rename-ok">${escapeHtml(t("ui.ok"))}</button>
          <button type="button" class="win-button rename-cancel">${escapeHtml(t("ui.close"))}</button>
        </div>
      `;
      body.querySelector(".rename-ok").addEventListener("click", () => {
        applyRename(item, body.querySelector(".rename-input").value.trim());
        closeWindow(windowId);
        renderDesktopIcons();
        if (sourceWindowId) updateWindowRecord(openWindows.get(sourceWindowId));
        refreshAllExplorerWindows();
      });
      body.querySelector(".rename-cancel").addEventListener("click", () => closeWindow(windowId));
      setTimeout(() => body.querySelector(".rename-input")?.select(), 0);
      return body;
    },
  });
}

function applyRename(item, newName) {
  if (!newName) return;
  if (item.source === "desktop" || item.kind === "folder" || item.kind === "rootText") {
    const desktopItem = item.item || desktopItems.find((entry) => entry.id === item.id);
    if (desktopItem?.type === "folder" && fileSystem[desktopItem.id]) {
      fileSystem[desktopItem.id].label = { ru: newName, en: newName };
    } else if (desktopItem?.id === "readme") {
      rootFiles.readme.filename = { ru: newName, en: newName };
    }
  } else if (item.kind === "text" || item.kind === "image" || item.kind === "app") {
    item.item.filename = { ru: newName, en: newName };
  } else if (item.kind === "certificate") {
    item.item.title = { ru: newName, en: newName };
  }
}

function openConfirmDialog(title, message, onConfirm) {
  const windowId = `dialog:confirm:${Date.now()}`;
  createWindow({
    id: windowId,
    kind: "dialog",
    iconType: "shutdown",
    width: 390,
    height: 170,
    hasMenu: false,
    sound: "warning",
    getTitle: () => title,
    renderBody: () => {
      const body = document.createElement("div");
      body.className = "window-panel dialog-body";
      body.innerHTML = `
        <div class="dialog-message">
          ${getLargeIconMarkup("shutdown")}
          <p>${escapeHtml(message)}</p>
        </div>
        <div class="dialog-actions">
          <button type="button" class="win-button confirm-ok">${escapeHtml(t("ui.ok"))}</button>
          <button type="button" class="win-button confirm-cancel">${escapeHtml(t("ui.close"))}</button>
        </div>
      `;
      body.querySelector(".confirm-ok").addEventListener("click", () => {
        onConfirm();
        closeWindow(windowId);
      });
      body.querySelector(".confirm-cancel").addEventListener("click", () => closeWindow(windowId));
      return body;
    },
  });
}

function showWarningDialog(message) {
  const windowId = `dialog:warning:${Date.now()}`;
  createWindow({
    id: windowId,
    kind: "dialog",
    iconType: "shutdown",
    width: 360,
    height: 150,
    hasMenu: false,
    sound: "error",
    getTitle: () => t("ui.commandUnavailable"),
    renderBody: () => {
      const body = document.createElement("div");
      body.className = "window-panel dialog-body";
      body.innerHTML = `
        <div class="dialog-message">${getLargeIconMarkup("shutdown")}<p>${escapeHtml(message)}</p></div>
        <div class="dialog-actions"><button type="button" class="win-button dialog-ok">${escapeHtml(t("ui.ok"))}</button></div>
      `;
      body.querySelector(".dialog-ok").addEventListener("click", () => closeWindow(windowId));
      return body;
    },
  });
}

function showAboutDialog() {
  const windowId = "dialog:about";
  if (focusExistingWindow(windowId)) return;

  createWindow({
    id: windowId,
    kind: "dialog",
    iconType: "computer",
    width: 420,
    height: 190,
    hasMenu: false,
    getTitle: () => t("ui.aboutTitle"),
    renderBody: () => {
      const body = document.createElement("div");
      body.className = "window-panel dialog-body";
      body.innerHTML = `
        <div class="dialog-message">${getLargeIconMarkup("computer")}<p>${escapeHtml(t("ui.aboutMessage"))}</p></div>
        <div class="dialog-actions"><button type="button" class="win-button dialog-ok">${escapeHtml(t("ui.ok"))}</button></div>
      `;
      body.querySelector(".dialog-ok").addEventListener("click", () => closeWindow(windowId));
      return body;
    },
  });
}

function copyExplorerSelection(record, cut = false) {
  const items = getSelectedExplorerItems(record);
  if (!items.length) {
    showWarningDialog(t("ui.commandUnavailable"));
    return;
  }
  virtualClipboard = { cut, items: items.filter((item) => item.kind === "text" || item.kind === "image" || item.kind === "app") };
  if (!virtualClipboard.items.length) showWarningDialog(t("ui.commandUnavailable"));
}

function pasteIntoExplorer(record) {
  if (!virtualClipboard?.items?.length || record.meta.currentFolderId === "recycle-bin" || record.meta.currentFolderId === "root") {
    showWarningDialog(t("ui.commandUnavailable"));
    return;
  }

  const targetFolder = fileSystem[record.meta.currentFolderId];
  virtualClipboard.items.forEach((item) => {
    const sourceFile = item.item;
    const newId = getAvailableFileId(record.meta.currentFolderId, item.id);
    targetFolder.files[newId] = {
      ...sourceFile,
      filename: {
        ru: `${getLocalized(sourceFile.filename)} - copy`,
        en: `${getLocalized(sourceFile.filename)} - copy`,
      },
    };
    if (virtualClipboard.cut && item.parentId !== record.meta.currentFolderId) {
      delete fileSystem[item.parentId].files[item.id];
    }
  });
  if (virtualClipboard.cut) virtualClipboard = null;
  refreshAllExplorerWindows();
}

function getAvailableFileId(folderId, baseId) {
  let index = 1;
  let candidate = `${baseId}-copy`;
  while (fileSystem[folderId].files[candidate]) {
    index += 1;
    candidate = `${baseId}-copy-${index}`;
  }
  return candidate;
}

function buildWindowMenuBar(record) {
  record.menuBar.innerHTML = "";
  const menus = [
    { id: "file", label: t("ui.file"), items: getWindowMenuItems(record, "file") },
    { id: "edit", label: t("ui.edit"), items: getWindowMenuItems(record, "edit") },
    { id: "view", label: t("ui.view"), items: getWindowMenuItems(record, "view") },
    { id: "help", label: t("ui.help"), items: getWindowMenuItems(record, "help") },
  ];

  menus.forEach((menu) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-bar-button";
    button.textContent = menu.label;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      showWindowMenuDropdown(record, button, menu.items);
    });
    record.menuBar.appendChild(button);
  });
}

function getWindowMenuItems(record, menuId) {
  const explorer = record.kind === "folder";
  const selectedItems = explorer ? getSelectedExplorerItems(record) : [];

  if (menuId === "file") {
    return [
      { label: t("ui.open"), disabled: explorer && selectedItems.length !== 1, action: () => explorer ? openExplorerItem(record.id, selectedItems[0]) : showWarningDialog(t("ui.commandUnavailable")) },
      { label: t("ui.newExplorerWindow"), action: () => openFolder(record.meta?.currentFolderId || "root", { newWindow: true }) },
      { label: t("ui.properties"), disabled: explorer && selectedItems.length !== 1, action: () => selectedItems[0] ? showPropertiesDialog(selectedItems[0]) : showWarningDialog(t("ui.commandUnavailable")) },
      { separator: true },
      { label: t("ui.close"), action: () => closeWindow(record.id) },
    ];
  }

  if (menuId === "edit") {
    return [
      { label: t("ui.cut"), disabled: !explorer || !selectedItems.length, action: () => copyExplorerSelection(record, true) },
      { label: t("ui.copy"), disabled: !explorer || !selectedItems.length, action: () => copyExplorerSelection(record, false) },
      { label: t("ui.paste"), disabled: !explorer, action: () => pasteIntoExplorer(record) },
      { label: t("ui.delete"), disabled: !explorer || !selectedItems.length, action: () => confirmDeleteItems(selectedItems, () => deleteExplorerSelection(record.id)) },
      { separator: true },
      { label: t("ui.selectAll"), disabled: !explorer, action: () => selectAllExplorerItems(record.id) },
    ];
  }

  if (menuId === "view") {
    return [
      { label: t("ui.largeIcons"), disabled: !explorer, action: () => setExplorerView(record.id, "large") },
      { label: t("ui.smallIcons"), disabled: !explorer, action: () => setExplorerView(record.id, "small") },
      { label: t("ui.list"), disabled: !explorer, action: () => setExplorerView(record.id, "list") },
      { label: t("ui.details"), disabled: !explorer, action: () => setExplorerView(record.id, "details") },
      { separator: true },
      { label: t("ui.refresh"), action: () => updateWindowRecord(record) },
    ];
  }

  return [
    { label: t("ui.aboutPortfolio"), action: showAboutDialog },
  ];
}

function showWindowMenuDropdown(record, anchor, items) {
  closeTransientMenus();
  const menu = document.createElement("div");
  menu.className = "window-menu-dropdown";
  menu.appendChild(createMenuList(items));
  record.element.appendChild(menu);
  const anchorRect = anchor.getBoundingClientRect();
  const windowRect = record.element.getBoundingClientRect();
  menu.style.left = `${anchorRect.left - windowRect.left}px`;
  menu.style.top = `${anchorRect.bottom - windowRect.top}px`;
  contextMenuEl = menu;
}

function handleDesktopContextMenu(event) {
  if (!event.target.closest(".desktop")) return;
  if (event.target.closest(".window, .taskbar, .start-menu")) return;
  if (event.target.closest(".window textarea")) return;
  event.preventDefault();

  if (event.target.closest(".desktop-icon")) return;
  showContextMenu(event.clientX, event.clientY, [
    { label: t("ui.newExplorerWindow"), action: () => openFolder("root", { newWindow: true }) },
    { label: t("ui.refresh"), action: () => renderDesktopIcons() },
    { separator: true },
    { label: t("ui.selectAll"), action: selectAllDesktopIcons },
    { label: t("ui.snapToGrid"), action: () => {
      snapDesktopIcons = !snapDesktopIcons;
      if (snapDesktopIcons) snapSelectedDesktopIcons(Array.from(desktopIconPositions.keys()));
      renderDesktopIcons();
    } },
    { separator: true },
    { label: t("ui.properties"), action: showAboutDialog },
  ]);
}

function showDesktopIconContextMenu(event, item) {
  event.preventDefault();
  event.stopPropagation();
  if (!desktopSelection.has(item.id)) selectDesktopItem(item.id);

  const isRecycle = item.id === "recycle-bin";
  showContextMenu(event.clientX, event.clientY, [
    { label: t("ui.open"), action: () => openDesktopItem(item) },
    { label: t("ui.rename"), disabled: isRecycle, action: () => showRenameDialog({ kind: item.type === "folder" ? "folder" : item.type, source: "desktop", item, id: item.id, key: `desktop:${item.id}`, icon: getDesktopItemIcon(item) }) },
    { label: t("ui.delete"), disabled: isRecycle, action: () => confirmDeleteItems([item], deleteSelectedDesktopItems) },
    { label: t("ui.properties"), action: () => showPropertiesDialog({ kind: item.type === "folder" ? "folder" : item.type, source: "desktop", item, id: item.id, key: `desktop:${item.id}`, icon: getDesktopItemIcon(item), size: item.type === "folder" ? "" : "2 KB", modified: "2026-06-11" }) },
    ...(isRecycle ? [{ separator: true }, { label: t("ui.emptyRecycleBin"), disabled: recycleBin.length === 0, action: confirmEmptyRecycleBin }] : []),
  ]);
}

function showExplorerEmptyContextMenu(event, windowId) {
  event.preventDefault();
  event.stopPropagation();
  const record = openWindows.get(windowId);
  if (!record) return;
  showContextMenu(event.clientX, event.clientY, [
    { label: t("ui.refresh"), action: () => updateWindowRecord(record) },
    { label: t("ui.paste"), action: () => pasteIntoExplorer(record) },
    { separator: true },
    { label: t("ui.largeIcons"), action: () => setExplorerView(windowId, "large") },
    { label: t("ui.smallIcons"), action: () => setExplorerView(windowId, "small") },
    { label: t("ui.list"), action: () => setExplorerView(windowId, "list") },
    { label: t("ui.details"), action: () => setExplorerView(windowId, "details") },
    ...(record.meta.currentFolderId === "recycle-bin" ? [{ separator: true }, { label: t("ui.emptyRecycleBin"), disabled: recycleBin.length === 0, action: confirmEmptyRecycleBin }] : []),
  ]);
}

function showExplorerItemContextMenu(event, windowId, item) {
  event.preventDefault();
  event.stopPropagation();
  selectExplorerItem(windowId, item.key);

  const inRecycle = item.kind === "recycle";
  showContextMenu(event.clientX, event.clientY, [
    { label: inRecycle ? t("ui.restoreItem") : t("ui.open"), action: () => inRecycle ? restoreRecycleItem(item.entry.recycleId) : openExplorerItem(windowId, item) },
    { label: t("ui.rename"), disabled: inRecycle || item.id === "recycle-bin", action: () => showRenameDialog(item, windowId) },
    { label: t("ui.delete"), disabled: item.id === "recycle-bin", action: () => {
      if (inRecycle) {
        const recycleIndex = recycleBin.findIndex((entry) => entry.recycleId === item.entry.recycleId);
        if (recycleIndex >= 0) recycleBin.splice(recycleIndex, 1);
        refreshAllExplorerWindows();
        renderDesktopIcons();
      } else {
        confirmDeleteItems([item], () => deleteExplorerSelection(windowId));
      }
    } },
    { separator: true },
    { label: t("ui.properties"), action: () => showPropertiesDialog(item) },
  ]);
}

function showContextMenu(x, y, items) {
  closeTransientMenus();
  const menu = document.createElement("div");
  menu.className = "context-menu";
  menu.appendChild(createMenuList(items));
  desktop.appendChild(menu);
  const rect = menu.getBoundingClientRect();
  menu.style.left = `${Math.min(x, window.innerWidth - rect.width - 4)}px`;
  menu.style.top = `${Math.min(y, window.innerHeight - rect.height - 4)}px`;
  contextMenuEl = menu;
}

function createMenuList(items) {
  const list = document.createElement("div");
  list.className = "menu-list";
  items.forEach((item) => {
    if (item.separator) {
      const separator = document.createElement("div");
      separator.className = "menu-separator";
      list.appendChild(separator);
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-item";
    button.textContent = item.label;
    button.disabled = Boolean(item.disabled);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      closeTransientMenus();
      if (item.disabled) {
        showWarningDialog(t("ui.commandUnavailable"));
      } else {
        item.action?.();
      }
    });
    list.appendChild(button);
  });
  return list;
}

function closeTransientMenus() {
  let closed = false;
  if (contextMenuEl) {
    contextMenuEl.remove();
    contextMenuEl = null;
    closed = true;
  }
  return closed;
}

function getDesktopItemLabel(item) {
  if (item.type === "folder") return getLocalized(fileSystem[item.id].label);
  if (item.type === "systemFolder") return t("desktop.recycleBin");
  return getLocalized(rootFiles[item.id].filename);
}

function getDesktopItemIcon(item) {
  if (item.type === "folder") return fileSystem[item.id].icon || "folder";
  if (item.type === "systemFolder") return recycleBin.length ? "recycleFull" : "recycleBin";
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

function fitOpenWindowsToViewport() {
  const layerRect = windowLayer.getBoundingClientRect();

  openWindows.forEach((record) => {
    if (record.maximized) return;

    const rect = record.element.getBoundingClientRect();
    const compact = isCompactViewport();
    const maxWidth = compact ? Math.max(record.minWidth, layerRect.width - 8) : Math.max(record.minWidth, rect.width);
    const maxHeight = compact ? Math.max(record.minHeight, layerRect.height - 8) : Math.max(record.minHeight, rect.height);
    const width = clamp(rect.width, record.minWidth, maxWidth);
    const height = clamp(rect.height, record.minHeight, maxHeight);
    const rawLeft = rect.left - layerRect.left;
    const rawTop = rect.top - layerRect.top;
    const position = compact
      ? {
          left: clamp(rawLeft, 4, Math.max(4, layerRect.width - width - 4)),
          top: clamp(rawTop, 4, Math.max(4, layerRect.height - height - 4)),
        }
      : keepTitleBarReachable(rawLeft, rawTop, width, height, layerRect);

    Object.assign(record.element.style, {
      width: `${width}px`,
      height: `${height}px`,
      left: `${position.left}px`,
      top: `${position.top}px`,
    });
  });
}

window.addEventListener("resize", fitOpenWindowsToViewport);
window.visualViewport?.addEventListener("resize", fitOpenWindowsToViewport);
window.addEventListener("orientationchange", () => window.setTimeout(fitOpenWindowsToViewport, 0));

initDesktop();
