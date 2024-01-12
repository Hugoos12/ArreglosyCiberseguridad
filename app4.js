
document.addEventListener("DOMContentLoaded", function () {
    
    document.body.style.opacity = 1;

    
    const consejosList = document.querySelector('.consejos-list');
    consejosList.addEventListener('mouseover', function (event) {
        if (event.target.tagName === 'LI') {
            event.target.classList.add('resaltar-consejo');
        }
    });

    consejosList.addEventListener('mouseout', function (event) {
        if (event.target.tagName === 'LI') {
            event.target.classList.remove('resaltar-consejo');
        }
    });
});
