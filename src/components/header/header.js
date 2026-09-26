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
