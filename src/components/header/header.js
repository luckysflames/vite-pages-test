// Логика работы мобильного бургера
document.addEventListener("DOMContentLoaded", () => {
    const burgerBtn = document.getElementById("burger-btn");
    const headerNav = document.getElementById("header-nav");
    const navLinks = document.querySelectorAll(".header__link");

    if (burgerBtn && headerNav) {
        // Открытие/закрытие при клике на бургер
        burgerBtn.addEventListener("click", () => {
            const isOpen = headerNav.classList.toggle("is-open");
            burgerBtn.classList.toggle("is-active");
            burgerBtn.setAttribute("aria-expanded", isOpen);

            // Блокируем скролл страницы, когда меню открыто
            document.body.style.overflow = isOpen ? "hidden" : "";
        });

        // Автоматическое закрытие меню при клике на любую ссылку
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                headerNav.classList.remove("is-open");
                burgerBtn.classList.remove("is-active");
                burgerBtn.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            });
        });
    }
});

export function initScrollSpy() {
    const navLinks = document.querySelectorAll(".header__link");

    if (!document.getElementById("hero")) {
        navLinks.forEach((link) => {
            link.classList.remove("header__link--active");
        });
        return;
    }

    // 2. Логика для главной страницы
    const sections = document.querySelectorAll("section[id], main > section");
    if (!sections.length || !navLinks.length) return;

    const updateActiveSection = () => {
        let currentActiveId = null;
        const scrollPosition = window.scrollY + window.innerHeight * 0.3; // Точка фокуса (30% от верха экрана)

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentActiveId = section.getAttribute("id");
            }
        });

        // Если скролл в самом верху (hero)
        if (window.scrollY < 100) {
            currentActiveId = "hero";
        }

        if (currentActiveId) {
            navLinks.forEach((link) => {
                link.classList.remove("header__link--active");
                const linkUrl = new URL(link.href);
                if (linkUrl.pathname === window.location.pathname && linkUrl.hash === `#${currentActiveId}`) {
                    link.classList.add("header__link--active");
                }
            });
        }
    };

    // Слушаем скролл с оптимизацией через requestAnimationFrame
    let ticking = false;
    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        },
        { passive: true },
    );

    // Первичный запуск при загрузке
    updateActiveSection();
}
