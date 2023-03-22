document.addEventListener('DOMContentLoaded', function () {
    const projects = [
        {
            title: 'Project 1',
            description: 'Description of Project 1',
            imageUrl: 'path/to/project1-image.jpg',
            link: 'https://github.com/yourusername/project1',
        },
        // Add more projects here
    ];

    const projectContainer = document.querySelector('.project-container');

    projects.forEach((project) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View on GitHub</a>
        `;
        projectContainer.appendChild(projectCard);
    });
});
