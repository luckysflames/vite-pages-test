import projectsData from "./projects.json";

export function initProjects() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    grid.innerHTML = projectsData
        .map(
            (project) => `
        <article class="project-card">
            <a href="./project.html?id=${project.id}" class="project-card__image-wrapper" aria-label="Подробнее о проекте ${project.title}">
                <div class="project-card__badges">
                    <span class="project-card__year">${project.year}</span>
                    <span class="project-card__status">${project.status}</span>
                </div>
                <img
                    src="./${project.image}"
                    alt="${project.title} ${project.location ? `(${project.location})` : ""}"
                    class="project-card__image"
                    loading="lazy"
                />
            </a>
            <div class="project-card__content">
                <h3 class="project-card__title">
                    ${project.title}
                    ${project.location ? `<span class="project-card__location">${project.location}</span>` : ""}
                </h3>

                <a href="./project.html?id=${project.id}" class="project-card__btn">
                    <span>Подробнее</span>
                </a>
            </div>
        </article>
    `,
        )
        .join("");
}
