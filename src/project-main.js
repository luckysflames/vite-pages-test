// Глобальные стили и переменные
import "./styles/global.css";

// Модульные стили компонентов
import "./components/header/header.css";
import "./components/footer/footer.css";
import "./components/projects/project-detail.css";

// Подключение скриптов компонентов
import "./components/header/header.js";
import { initProjectDetail } from "./pages/project-detail.js";

// Инициализируем генерацию деталей проекта при загрузке DOM
document.addEventListener("DOMContentLoaded", () => {
    initProjectDetail();
});
