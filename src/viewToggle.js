// View toggle logic - handles switching between Experience, Projects, and Competitions views
import { typeCommand } from './animations.js';

// View cycle: experience -> projects -> competitions -> experience
const viewCycle = {
    'experience': 'projects',
    'projects': 'competitions',
    'competitions': 'experience'
};

const viewLabels = {
    'experience': 'Projects',
    'projects': 'Competitions',
    'competitions': 'Experience'
};

export function initViewToggle() {
    const experienceContent = document.getElementById('experience-content');
    const projectsContent = document.getElementById('projects-content');
    const competitionsContent = document.getElementById('competitions-content');
    const navBtn = document.getElementById('nav-btn');
    const terminalOverlay = document.getElementById('terminal-overlay');
    let currentView = 'experience';

    function showView(viewName) {
        experienceContent.style.display = viewName === 'experience' ? 'flex' : 'none';
        projectsContent.style.display = viewName === 'projects' ? 'flex' : 'none';
        competitionsContent.style.display = viewName === 'competitions' ? 'flex' : 'none';

        navBtn.textContent = viewLabels[viewName];

        if (viewName === 'competitions') {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                navBtn.style.marginTop = '';
                navBtn.style.alignSelf = '';
                navBtn.style.marginRight = '';
            } else {
                navBtn.style.marginTop = '-13.5rem';
                navBtn.style.alignSelf = 'flex-end';
                navBtn.style.marginRight = '-1rem';
            }
        } else {
            navBtn.style.marginTop = '';
            navBtn.style.alignSelf = '';
            navBtn.style.marginRight = '';
        }

        currentView = viewName;
    }

    navBtn.addEventListener('click', () => {
        if (navBtn.classList.contains('typing')) return;
        navBtn.classList.add('typing');

        const nextView = viewCycle[currentView];

        terminalOverlay.style.display = 'flex';
        terminalOverlay.innerHTML = '';

        const command = `cd /tahmeedt/profile/${nextView}`;

        typeCommand(terminalOverlay, command, () => {
            showView(nextView);
            setTimeout(() => {
                terminalOverlay.style.display = 'none';
                terminalOverlay.innerHTML = '';
                navBtn.classList.remove('typing');
            }, 50);
        });
    });
}
