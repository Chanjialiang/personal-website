
const menuButton = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const languageButton = document.getElementById("languageToggle");
const languageButtonText = languageButton.querySelector("span");
const languageStorageKey = "devportfolio-language";

// One dictionary powers the language switch for the entire page.
// Add both versions here when adding text with a new data-i18n key.
const translations = {
    en: {
        pageTitle: "DevPortfolio | Personal Website",
        pageDescription: "My developer portfolio",
        navigationLabel: "Main navigation",
        menuOpen: "Open navigation menu",
        menuClose: "Close navigation menu",
        switchLanguage: "中文",
        switchLabel: "Switch to Chinese",
        navAbout: "About",
        navProjects: "Projects",
        navSkills: "Skills",
        navContact: "Contact",
        heroGreeting: "Hello, welcome to my website",
        heroTitle: "Building things",
        heroAccent: "for the web.",
        heroDescription: "I'm a software engineering student learning web development, backend systems, and financial technology.",
        viewProjects: "View Projects",
        contactMe: "Contact Me",
        currentlyBuilding: "Currently building",
        portfolioSummary: "A personal website built with HTML, CSS, and JavaScript.",
        inProgress: "● In Progress",
        aboutTitle: "About Me",
        aboutDescription: "I'm studying software engineering and improving my programming skills by building real projects. I'm especially interested in backend development and fintech systems.",
        projectsTitle: "Featured Projects",
        projectsDescription: "Projects I'm building and planning.",
        webDevelopment: "Web Development",
        portfolioDescription: "My personal developer website featuring responsive design and bilingual support.",
        viewCode: "View Code →",
        plannedJava: "Planned · Java",
        miniBankDescription: "A planned Java backend project to practice financial transactions and account management.",
        comingSoon: "Coming Soon",
        plannedLearning: "Planned · Learning",
        codingNotesTitle: "Coding Notes",
        codingNotesDescription: "A planned collection of notes about Java, databases, and software engineering.",
        calculatorTitle: "Java Calculator",
        calculatorDescription: "A simple Java calculator to practice variables, methods, input handling, and basic arithmetic.",
        skillsTitle: "My Skills",
        contactTitle: "Get In Touch",
        contactDescription: "Interested in my projects? You can find my code on GitHub.",
        visitGitHub: "Visit My GitHub",
        footerText: "Built with HTML, CSS, and JavaScript."
    },
    "zh-CN": {
        pageTitle: "DevPortfolio | 个人网站",
        pageDescription: "我的开发者作品集",
        navigationLabel: "主导航",
        menuOpen: "打开导航菜单",
        menuClose: "关闭导航菜单",
        switchLanguage: "English",
        switchLabel: "切换为英文",
        navAbout: "关于我",
        navProjects: "项目",
        navSkills: "技能",
        navContact: "联系我",
        heroGreeting: "你好，欢迎来到我的网站",
        heroTitle: "用代码创造，",
        heroAccent: "为网络添彩。",
        heroDescription: "我是一名软件工程专业的学生，正在学习 Web 开发、后端系统和金融科技。",
        viewProjects: "查看项目",
        contactMe: "联系我",
        currentlyBuilding: "正在开发",
        portfolioSummary: "一个使用 HTML、CSS 和 JavaScript 构建的个人网站。",
        inProgress: "● 开发中",
        aboutTitle: "关于我",
        aboutDescription: "我正在学习软件工程，并通过实际项目提升编程技能。我尤其对后端开发和金融科技系统感兴趣。",
        projectsTitle: "精选项目",
        projectsDescription: "我正在开发和计划中的项目。",
        webDevelopment: "Web 开发",
        portfolioDescription: "我的个人开发者网站，支持响应式布局和中英文双语切换。",
        viewCode: "查看代码 →",
        plannedJava: "计划中 · Java",
        miniBankDescription: "一个计划中的 Java 后端项目，用于练习金融交易和账户管理。",
        comingSoon: "即将推出",
        plannedLearning: "计划中 · 学习",
        codingNotesTitle: "编程笔记",
        codingNotesDescription: "计划整理的 Java、数据库和软件工程学习笔记。",
        calculatorTitle: "Java 计算器",
        calculatorDescription: "一个简单的 Java 计算器，用于练习变量、方法、输入处理和基本算术运算。",
        skillsTitle: "我的技能",
        contactTitle: "联系我",
        contactDescription: "对我的项目感兴趣？你可以在 GitHub 上查看我的代码。",
        visitGitHub: "访问我的 GitHub",
        footerText: "使用 HTML、CSS 和 JavaScript 构建。"
    }
};

// English is the default; restore a saved choice when storage is available.
let currentLanguage = "en";

try {
    const savedLanguage = localStorage.getItem(languageStorageKey);
    if (savedLanguage === "en" || savedLanguage === "zh-CN") {
        currentLanguage = savedLanguage;
    }
} catch {
    // The page still works when the browser blocks local storage.
}

function setMenuOpen(isOpen) {
    navLinks.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? translations[currentLanguage].menuClose : translations[currentLanguage].menuOpen
    );
}

function setLanguage(language) {
    currentLanguage = language;
    const copy = translations[language];

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
        element.textContent = copy[element.dataset.i18n];
    });

    document.documentElement.lang = language;
    document.title = copy.pageTitle;
    document.querySelector('meta[name="description"]').setAttribute("content", copy.pageDescription);
    document.querySelector(".nav").setAttribute("aria-label", copy.navigationLabel);
    languageButtonText.textContent = copy.switchLanguage;
    languageButtonText.lang = language === "en" ? "zh-CN" : "en";
    languageButton.setAttribute("aria-label", copy.switchLabel);

    // Keep the mobile menu's current state and translate its accessible label.
    setMenuOpen(navLinks.classList.contains("is-open"));
}

languageButton.addEventListener("click", function () {
    setLanguage(currentLanguage === "en" ? "zh-CN" : "en");

    try {
        localStorage.setItem(languageStorageKey, currentLanguage);
    } catch {
        // Switching languages does not depend on saving the preference.
    }
});

// Open or close the mobile menu.
menuButton.addEventListener("click", function () {
    setMenuOpen(!navLinks.classList.contains("is-open"));
});

// Close the menu when a navigation link is clicked
const links = navLinks.querySelectorAll("a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        setMenuOpen(false);
    });
});

// Automatically update the year in the footer
const yearElement = document.getElementById("year");
yearElement.textContent = new Date().getFullYear();

setLanguage(currentLanguage);
languageButton.hidden = false;
