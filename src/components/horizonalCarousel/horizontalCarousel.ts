document.addEventListener('DOMContentLoaded', function () {
    // Selecciona los elementos del carrusel
    const carouselInner = document.getElementById('carouselInner') as HTMLElement;
    const prevButton = document.getElementById('prevButton') as HTMLButtonElement;
    const nextButton = document.getElementById('nextButton') as HTMLButtonElement;

    // Asegúrate de que los elementos existen
    if (!carouselInner || !prevButton || !nextButton) {
        console.error('Carousel elements are missing.');
        return;
    }

    // Obtiene el ancho de un elemento del carrusel y el número total de elementos
    const carouselItem = document.querySelector('.carousel-item') as HTMLElement;
    if (!carouselItem) {
        console.error('Carousel item not found.');
        return;
    }

    const itemWidth = carouselItem.offsetWidth + 20; // Ancho del item + margen
    let scrollPosition = 0;
    //    const itemsCount = document.querySelectorAll('.carousel-item').length;

    // Actualiza la visibilidad de los botones
    function updateButtons(): void {
        const maxScroll = carouselInner.scrollWidth - carouselInner.clientWidth;
        prevButton.style.display = scrollPosition > 0 ? 'block' : 'none';
        nextButton.style.display = scrollPosition < maxScroll ? 'block' : 'none';
    }

    // Desplaza el carrusel en la dirección especificada
    function scrollCarousel(direction: number): void {
        const maxScroll = carouselInner.scrollWidth - carouselInner.clientWidth;
        scrollPosition += direction * itemWidth;
        scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
        carouselInner.style.transform = `translateX(-${scrollPosition}px)`;
        updateButtons();
    }

    // Agrega eventos a los botones de navegación
    prevButton.addEventListener('click', function () {
        scrollCarousel(-1);
    });

    nextButton.addEventListener('click', function () {
        scrollCarousel(1);
    });

    // Inicializa la visibilidad de los botones
    updateButtons();
});
