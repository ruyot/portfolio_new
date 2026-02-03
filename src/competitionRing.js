// Competition ring carousel animation

export function initCompetitionRing() {
    const competitionRing = document.getElementById('competition-ring');
    const competitionItems = competitionRing.querySelectorAll('.competition-item');
    const totalItems = competitionItems.length;
    const angleStep = 360 / totalItems;
    let currentRotation = 0;
    let isHovered = false;
    let autoRotateInterval;

    function positionItems() {
        competitionItems.forEach((item, i) => {
            const angle = (angleStep * i) + currentRotation - 90;
            const radian = (angle * Math.PI) / 180;

            const x = 50 + Math.cos(radian) * 50;
            const y = 50 + Math.sin(radian) * 50;

            item.style.left = `${x}%`;
            item.style.top = `${y}%`;

            const normalizedAngle = ((angle + 90) % 360 + 360) % 360;
            const isActive = normalizedAngle < angleStep / 2 || normalizedAngle > 360 - angleStep / 2;
            item.classList.toggle('active', isActive);
        });
    }

    function rotateRing() {
        currentRotation -= 0.5;
        positionItems();
    }

    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            if (!isHovered) {
                rotateRing();
            }
        }, 30);
    }

    competitionRing.addEventListener('mouseenter', () => { isHovered = true; });
    competitionRing.addEventListener('mouseleave', () => { isHovered = false; });

    competitionRing.addEventListener('click', () => {
        currentRotation -= angleStep;
        positionItems();
    });

    positionItems();
    startAutoRotate();
}
