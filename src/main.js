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
import { initScrollSpy } from "./components/header/header.js";
import { initStatsAnimation } from "./components/stats/stats.js";
import { initProjects } from "./components/projects/projects.js";

function initScrollAnimations() {
    // 1. Клиенты (можно оставить как есть или через селектор)
    const clientsSection = document.querySelector(".clients");
    if (clientsSection) {
        const clientsObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.8 },
        );

        clientsObserver.observe(clientsSection);
    }

    // 2. Контакты: следим именно за КАРТОЧКОЙ, а не за всей секцией с картой
    const contactsCard = document.querySelector(".contacts__card");
    if (contactsCard) {
        const contactsObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Добавляем класс всей секции contacts, чтобы сработал стилизованный CSS
                        const section = entry.target.closest(".contacts");
                        if (section) {
                            section.classList.add("is-visible");
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5, // Сработает, когда карточка появится на экране на 20%
            },
        );

        contactsObserver.observe(contactsCard);
    }
}

// Инициализируем генерацию карточек при загрузке DOM
document.addEventListener("DOMContentLoaded", () => {
    initScrollSpy();
    initStatsAnimation();
    initScrollAnimations();
    initProjects();
});
