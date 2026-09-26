export function initStatsAnimation() {
    const statsSection = document.querySelector(".stats");
    if (!statsSection) return;

    const observerOptions = {
        root: null, // относительно окна браузера
        rootMargin: "0px",
        threshold: 1, // анимация сработает, когда блок появится на 80% в зоне видимости
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Добавляем класс, запускающий анимацию
                entry.target.classList.add("is-visible");
                // Отключаем наблюдение, чтобы анимация проигралась один раз
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(statsSection);
}
