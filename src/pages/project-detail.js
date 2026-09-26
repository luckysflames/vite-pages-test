import projectsData from "../components/projects/projects.json";

export function initProjectDetail() {
    const headerEl = document.querySelector(".section-header");
    const titleEl = document.getElementById("project-title");
    const contentEl = document.getElementById("project-content");
    if (!contentEl) return;

    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get("id"), 10) || 1;

    const project = projectsData.find((item) => item.id === projectId) || projectsData[0];

    if (titleEl) {
        titleEl.textContent = project.title;
        document.title = `${project.title} — ООО «РСК»`;
    }

    // === СПЕЦИАЛЬНЫЙ ШАБЛОН ДЛЯ 9-ГО ОБЪЕКТА ===
    if (project.id === 9) {
        const items = project.completedItems || [];

        contentEl.innerHTML = `
            <div class="project-detail__completed-list">
                ${items
                    .map(
                        (item) => `
                    <div class="completed-item">
                        <div class="completed-item__text">
                            <p>${item.text}</p>
                        </div>
                        <div class="completed-item__image-wrapper">
                            <img src="${item.image}" alt="" loading="lazy" />
                        </div>
                    </div>
                `,
                    )
                    .join("")}
                
                <div style="margin-top: 40px;">
                    <a href="/#projects" class="project-detail__back-btn">НАЗАД К ПРОЕКТАМ</a>
                </div>
            </div>
        `;

        if (headerEl) headerEl.classList.add("is-loaded");
        contentEl.classList.add("is-loaded");
        return;
    }
    // ===========================================

    const gallery = project.gallery && project.gallery.length ? project.gallery : [project.image];

    contentEl.innerHTML = `
        <div class="project-detail__grid">
            <div class="project-detail__info">
                ${project.address ? `<p class="project-detail__address"><strong>${project.address}</strong></p>` : ""}
                
                ${
                    project.description
                        ? `
                    <div class="project-detail__text">
                        <p>${project.description}</p>
                    </div>
                `
                        : ""
                }

                ${
                    project.features && project.features.length
                        ? `
                    <div class="project-detail__features">
                        <h4>Ключевые особенности ${project.title}</h4>
                        <ul>
                            ${project.features.map((item) => `<li>- ${item}</li>`).join("")}
                        </ul>
                    </div>
                `
                        : ""
                }

                ${
                    project.dates
                        ? `
                    <div class="project-detail__dates">
                        <p><strong>Сроки строительства:</strong></p>
                        <p>Начало строительства: ${project.dates.start}</p>
                        <p>Окончание строительства: ${project.dates.end}</p>
                    </div>
                `
                        : ""
                }

                <a href="/#projects" class="project-detail__back-btn">НАЗАД К ПРОЕКТАМ</a>
            </div>

            <div class="project-detail__gallery">
                <div class="project-detail__slider">
                    ${
                        gallery.length > 1
                            ? `<button class="project-detail__nav project-detail__nav--prev" aria-label="Назад">&#10094;</button>`
                            : ""
                    }
                    <div class="project-detail__main-wrapper">
                        <img src="${gallery[0]}" alt="${project.title}" id="gallery-main-img" class="gallery-fade-img" />
                    </div>
                    ${
                        gallery.length > 1
                            ? `<button class="project-detail__nav project-detail__nav--next" aria-label="Вперед">&#10095;</button>`
                            : ""
                    }
                </div>
                
                ${
                    gallery.length > 1
                        ? `
                    <div class="project-detail__thumbs">
                        ${gallery
                            .map(
                                (img, idx) => `
                            <button class="project-detail__thumb ${idx === 0 ? "is-active" : ""}" data-src="${img}">
                                <img src="${img}" alt="" />
                            </button>
                        `,
                            )
                            .join("")}
                    </div>
                `
                        : ""
                }
            </div>
        </div>
    `;

    // Логика слайдера и автопрокрутки
    let currentIndex = 0;
    let autoPlayTimer = null;
    const mainImg = document.getElementById("gallery-main-img");
    const sliderContainer = contentEl.querySelector(".project-detail__slider");
    const prevBtn = contentEl.querySelector(".project-detail__nav--prev");
    const nextBtn = contentEl.querySelector(".project-detail__nav--next");
    const thumbs = contentEl.querySelectorAll(".project-detail__thumb");

    function updateGallery(index) {
        if (!mainImg) return;

        // Плавное затухание текущей картинки
        mainImg.style.opacity = "0";

        setTimeout(() => {
            currentIndex = (index + gallery.length) % gallery.length;
            mainImg.src = gallery[currentIndex];
            thumbs.forEach((t, i) => t.classList.toggle("is-active", i === currentIndex));

            // Плавное появление новой картинки
            mainImg.style.opacity = "1";
        }, 150);
    }

    // Функции автопрокрутки
    function startAutoPlay() {
        if (gallery.length <= 1) return;

        // Предотвращаем создание нескольких интервалов сразу
        stopAutoPlay();

        autoPlayTimer = setInterval(() => {
            updateGallery(currentIndex + 1);
        }, 4000);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function handleUserInteraction(action) {
        stopAutoPlay(); // Сначала полностью гасим старый таймер
        action(); // Выполняем переход (клик на стрелку/миниатюру)
        startAutoPlay(); // Запускаем свежий отсчет заново
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () =>
            handleUserInteraction(() => updateGallery(currentIndex - 1)),
        );
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", () =>
            handleUserInteraction(() => updateGallery(currentIndex + 1)),
        );
    }

    thumbs.forEach((thumb, i) => {
        thumb.addEventListener("click", () => handleUserInteraction(() => updateGallery(i)));
    });

    if (gallery.length > 1 && sliderContainer) {
        // Пауза при наведении мыши
        sliderContainer.addEventListener("mouseenter", stopAutoPlay);
        sliderContainer.addEventListener("mouseleave", startAutoPlay);

        // Запускаем автопрокрутку при старте
        startAutoPlay();
    }

    if (headerEl) headerEl.classList.add("is-loaded");
    contentEl.classList.add("is-loaded");
}
