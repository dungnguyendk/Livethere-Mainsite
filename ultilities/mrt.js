export function blurLine(classLine) {
    const  elements = document.querySelectorAll(classLine)
    // console.log("blurLine elements",elements);
    elements.forEach((element) => {
        element.style.fill = "#ddd"
      });
}

export function resetColor() {
    const elements = document.querySelectorAll('.i,.j,.x,.y,.t,.u,.o,.p,.f,.g,.r,.s,.ac,.ad,.ab,.ag');
    elements.forEach(el => {
        if (el.classList.contains('i') || el.classList.contains('j')) {
            el.style.fill = '#00953b';
        } else if (el.classList.contains('x') || el.classList.contains('y')) {
            el.style.fill = '#e1251b';
        } else if (el.classList.contains('t') || el.classList.contains('u')) {
            el.style.fill = '#9e28b5';
        } else if (el.classList.contains('o') || el.classList.contains('p')) {
            el.style.fill = '#ff9e18';
        } else if (el.classList.contains('f') || el.classList.contains('g')) {
            el.style.fill = '#0055b8';
        } else if (el.classList.contains('r') || el.classList.contains('s')) {
            el.style.fill = '#9d5918';
        } else if (el.classList.contains('ac') || el.classList.contains('ad')) {
            el.style.fill = '#718472';
        } else if (el.classList.contains('ab')) {
            el.style.fill = '#93d500';
        } else if (el.classList.contains('ag')) {
            el.style.fill = '#383a37';
        }
    });
}

