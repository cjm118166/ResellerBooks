(function () {
    const shots = Array.from(document.querySelectorAll('.shot'));
    const lightbox = document.getElementById('lightbox');
    if (!shots.length || !lightbox) return;

    const img = lightbox.querySelector('.lightbox-img');
    const caption = lightbox.querySelector('.lightbox-caption');
    const btnClose = lightbox.querySelector('.lightbox-close');
    const btnPrev = lightbox.querySelector('.lightbox-prev');
    const btnNext = lightbox.querySelector('.lightbox-next');

    let current = 0;

    function open(i) {
        current = (i + shots.length) % shots.length;
        const fig = shots[current];
        const src = fig.querySelector('img').getAttribute('src');
        const alt = fig.querySelector('img').getAttribute('alt') || '';
        const label = fig.querySelector('figcaption strong')?.textContent || '';
        img.setAttribute('src', src);
        img.setAttribute('alt', alt);
        caption.textContent = label;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.hidden = true;
        document.body.style.overflow = '';
    }

    shots.forEach((fig, i) => {
        fig.setAttribute('tabindex', '0');
        fig.addEventListener('click', () => open(i));
        fig.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open(i);
            }
        });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => open(current - 1));
    btnNext.addEventListener('click', () => open(current + 1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') open(current - 1);
        if (e.key === 'ArrowRight') open(current + 1);
    });
})();
