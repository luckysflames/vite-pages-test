// Глобальные стили и переменные
import "./styles/global.css";

// Модульные стили компонентов
import "./components/header/header.css";
import "./components/hero/hero.css";
import "./components/about/about.css";
import "./components/stats/stats.css";
import "./components/services/services.css";
import "./components/clients/clients.css";
import "./components/projects/projects.css";
import "./components/contacts/contacts.css";
import "./components/footer/footer.css";

// Подключение скриптов компонентов
import "./components/header/header.js";
import { initStatsAnimation } from "./components/stats/stats.js";
import { initProjects } from "./components/projects/projects.js";

// Инициализируем генерацию карточек при загрузке DOM
document.addEventListener("DOMContentLoaded", () => {
    initStatsAnimation();
    initProjects();
});
