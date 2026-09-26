import projectsData from "./projects.json";

export function initProjects() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    grid.innerHTML = projectsData
        .map(
            (project) => `
        <article class="project-card">
            <div class="project-card__image-wrapper">
                <img
                    src="${project.image}"
                    alt="${project.title} ${project.location ? `(${project.location})` : ""}"
                    class="project-card__image"
                    loading="lazy"
                />
            </div>
            <div class="project-card__content">
                <h3 class="project-card__title">
                    ${project.title}
                    ${project.location ? `<br /><span class="project-card__location">${project.location}</span>` : ""}
                </h3>
                
                <div class="project-card__meta">
                    <span class="project-card__year">${project.year}</span>
                    <span class="project-card__status">${project.status}</span>
                </div>

                <a href="/project.html?id=${project.id}" class="project-card__btn">Подробнее</a>
            </div>
        </article>
    `,
        )
        .join("");
}
