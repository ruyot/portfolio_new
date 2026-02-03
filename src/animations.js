// Animations

// Type command like terminal with cursor
export function typeCommand(element, text, callback) {
    element.innerHTML = '';
    let i = 0;

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    element.appendChild(cursor);

    function typeChar() {
        if (i < text.length) {
            cursor.before(text.charAt(i));
            i++;
            setTimeout(typeChar, 30 + Math.random() * 30);
        } else {
            setTimeout(() => {
                element.removeChild(cursor);
                if (callback) callback();
            }, 100);
        }
    }

    typeChar();
}

// Scramble text and gradually reveal target
export function scrambleText(element, targetText, duration = 2500) {
    const startTime = Date.now();
    const chars = targetText.split('');
    let revealed = new Array(chars.length).fill(false);
    const uniqueChars = [...new Set(targetText.split('').filter(c => c !== ' ' && c !== '\n'))];

    function getRandomChar() {
        return uniqueChars[Math.floor(Math.random() * uniqueChars.length)];
    }

    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const revealIndex = Math.floor(progress * chars.length);

        for (let i = 0; i < revealIndex; i++) {
            revealed[i] = true;
        }

        const displayText = chars.map((char, i) => {
            if (revealed[i]) return char;
            return (char === '\n' || char === ' ') ? char : getRandomChar();
        }).join('');

        element.textContent = displayText;

        if (progress >= 1) {
            clearInterval(interval);
            element.textContent = targetText;
        }
    }, 50);
}

// Reveal ASCII art line-by-line from top to bottom
export function revealLineByLine(element, targetText, duration = 3000) {
    const lines = targetText.split('\n');
    const totalLines = lines.length;
    const startTime = Date.now();
    const uniqueChars = [...new Set(targetText.split('').filter(c => c !== ' ' && c !== '\n'))];

    function getRandomChar() {
        return uniqueChars[Math.floor(Math.random() * uniqueChars.length)];
    }

    function scrambleLine(line) {
        return line.split('').map(char => {
            if (char === ' ') return ' ';
            return getRandomChar();
        }).join('');
    }

    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const revealedLineIndex = Math.floor(progress * totalLines);

        const displayLines = lines.map((line, i) => {
            if (i < revealedLineIndex) return line;
            return scrambleLine(line);
        });

        element.textContent = displayLines.join('\n');

        if (progress >= 1) {
            clearInterval(interval);
            element.textContent = targetText;
        }
    }, 40);
}
