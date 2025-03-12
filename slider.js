//Toda funcionalidad de las imagenes que deslizan
document.addEventListener('DOMContentLoaded', () => {
    imgSlider();
})

function imgSlider(){
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides div');
    let currentIndex = 0;
    let startY = 0;
    let endY = 0;

    //FunciÃ³n para deslizar a la siguiente imagen
    function slideNext() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateSlider();
        }
    }

    //FunciÃ³n para deslizar a la imagen anterior
    function slidePrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    //Actualizar la posiciÃ³n del slider
    function updateSlider() {
        const imageHeight = images[0].clientHeight; 
        slides.style.transform = `translateY(-${currentIndex * imageHeight}px)`; 
    }

    slides.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });

    slides.addEventListener('touchmove', (e) => {
        if (currentIndex < images.length - 1 || startY > endY) {
            e.preventDefault();
        }
    });

    slides.addEventListener('touchend', (e) => {
        endY = e.changedTouches[0].clientY;
        if (startY > endY + 50) {
            slideNext(); 
        } else if (startY < endY - 50) {
            slidePrev();
        }
    });

    document.addEventListener('wheel', (e) => {
        if (currentIndex < images.length - 1) {
            e.preventDefault();
            if (e.deltaY > 0) slideNext(); 
            if (e.deltaY < 0) slidePrev(); 
        }
    },{ passive: false });
}