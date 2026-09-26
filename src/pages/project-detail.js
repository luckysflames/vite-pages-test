import projectsData from "../components/projects/projects.json";

export function initProjectDetail() {
    const headerEl = document.querySelector(".section-header");
    const titleEl = document.getElementById("project-title");
    const contentEl = document.getElementById("project-content");
    const breadcrumbTitle = document.getElementById("breadcrumb-title");

    if (!contentEl) return;

    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get("id"), 10) || 1;

    const project = projectsData.find((item) => item.id === projectId) || projectsData[0];

    if (titleEl) {
        titleEl.textContent = project.title;
        document.title = `${project.title} — ООО «РСК»`;
        if (breadcrumbTitle) breadcrumbTitle.textContent = project.title;
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
                
                <div style="margin-top: 40px; text-align: center;">
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
                ${project.address ? `<p class="project-detail__address"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> <strong>${project.address}</strong></p>` : ""}
                
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
                        <h4>Ключевые особенности</h4>
                        <ul>
                            ${project.features.map((item) => `<li><span>✓</span> ${item}</li>`).join("")}
                        </ul>
                    </div>
                `
                        : ""
                }

                ${
                    project.dates
                        ? `
                    <div class="project-detail__dates">
                        <p><strong>Сроки реализации:</strong></p>
                        <p>Начало: ${project.dates.start}</p>
                        <p>Окончание: ${project.dates.end}</p>
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
                    <div class="project-detail__main-wrapper" title="Нажмите, чтобы увеличить">
                        <img src="${gallery[0]}" alt="${project.title}" id="gallery-main-img" class="gallery-fade-img" />
                        ${gallery.length > 1 ? `<span class="gallery-counter" id="gallery-counter">1 / ${gallery.length}</span>` : ""}
                        <div class="zoom-hint">Клик для увеличения</div>
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

    // Логика слайдера, автопрокрутки и Lightbox
    let currentIndex = 0;
    let autoPlayTimer = null;
    const mainImg = document.getElementById("gallery-main-img");
    const counterEl = document.getElementById("gallery-counter");
    const sliderContainer = contentEl.querySelector(".project-detail__slider");
    const prevBtn = contentEl.querySelector(".project-detail__nav--prev");
    const nextBtn = contentEl.querySelector(".project-detail__nav--next");
    const thumbs = contentEl.querySelectorAll(".project-detail__thumb");

    // Lightbox элементы
    const lightbox = document.getElementById("project-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = lightbox.querySelector(".lightbox-close");
    const lightboxPrev = lightbox.querySelector(".lightbox-nav--prev");
    const lightboxNext = lightbox.querySelector(".lightbox-nav--next");

    function updateGallery(index) {
        if (!mainImg) return;

        mainImg.style.opacity = "0";

        setTimeout(() => {
            currentIndex = (index + gallery.length) % gallery.length;
            mainImg.src = gallery[currentIndex];
            if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${gallery.length}`;
            thumbs.forEach((t, i) => t.classList.toggle("is-active", i === currentIndex));
            mainImg.style.opacity = "1";
        }, 150);
    }

    function startAutoPlay() {
        if (gallery.length <= 1) return;
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
        stopAutoPlay();
        action();
        startAutoPlay();
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
        sliderContainer.addEventListener("mouseenter", stopAutoPlay);
        sliderContainer.addEventListener("mouseleave", startAutoPlay);
        startAutoPlay();
    }

    // Lightbox функционал по клику на главное фото
    if (mainImg && lightbox) {
        mainImg.addEventListener("click", () => {
            stopAutoPlay();
            lightboxImg.src = gallery[currentIndex];
            lightbox.classList.add("is-active");
            document.body.classList.add("no-scroll");
        });

        const closeLightbox = () => {
            lightbox.classList.remove("is-active");
            document.body.classList.remove("no-scroll");
            startAutoPlay();
        };

        lightboxClose.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        lightboxPrev.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
            lightboxImg.src = gallery[currentIndex];
            updateGallery(currentIndex);
        });

        lightboxNext.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % gallery.length;
            lightboxImg.src = gallery[currentIndex];
            updateGallery(currentIndex);
        });
    }

    if (headerEl) headerEl.classList.add("is-loaded");
    contentEl.classList.add("is-loaded");
}
