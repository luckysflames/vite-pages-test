export function initStatsAnimation() {
    const statsSection = document.querySelector(".stats");
    if (!statsSection) return;

    // Функция анимации счета от 0 до целевого числа
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute("data-target"), 10);
        const duration = 1500; // Длительность анимации в миллисекундах
        const frameRate = 1000 / 60; // 60 кадров в секунду
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;

        const counterInterval = setInterval(() => {
            currentFrame++;
            // Используем плавное замедление к концу (easeOutQuad)
            const progress = currentFrame / totalFrames;
            const easeProgress = progress * (2 - progress);

            const currentCount = Math.round(target * easeProgress);

            if (currentFrame >= totalFrames) {
                el.textContent = target; // Гарантируем точное финальное число
                clearInterval(counterInterval);
            } else {
                el.textContent = currentCount;
            }
        }, frameRate);
    };

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

                // Запускаем счетчик для каждого элемента с цифрой
                const numberElements = entry.target.querySelectorAll(".stats__number");
                numberElements.forEach((el) => animateCounter(el));

                // Отключаем наблюдение, чтобы анимация проигралась один раз
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(statsSection);
}
