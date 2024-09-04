document.addEventListener('DOMContentLoaded', () => {
    const carousel: HTMLElement | null = document.getElementById('carousel');
    const items: HTMLDivElement[] = Array.from(document.querySelectorAll('.carousel-item'));
    const numItems: number = items.length;
    let rotation: number = 0;
  
    if (!carousel) {
      console.error('Carousel element not found');
      return;
    }
  
    /**
     * Actualiza la posición de los elementos en el carrusel.
     */
    const updateCarousel = (): void => {
      items.forEach((item, index) => {
        const angle = calculateAngle(index);
        applyTransform(item, angle);
        item.classList.remove('focus');
      });
  
      focusCenterItem();
    };
  
    /**
     * Calcula el ángulo de rotación para un elemento basado en su índice.
     * @param index - Índice del elemento en el carrusel.
     * @returns El ángulo de rotación en grados.
     */
    const calculateAngle = (index: number): number => {
      return (index * (360 / numItems)) % 360;
    };
  
    /**
     * Aplica la transformación CSS a un elemento del carrusel.
     * @param item - Elemento del carrusel.
     * @param angle - Ángulo de rotación.
     */
    const applyTransform = (item: HTMLDivElement, angle: number): void => {
      item.style.transform = `scaleX(1) rotateY(${angle}deg) translateZ(325px)`;
    };
  
    /**
     * Coloca el foco en el elemento central del carrusel.
     */
    const focusCenterItem = (): void => {
      const centerIndex = Math.floor(numItems / 2);
      const centerItem = items[centerIndex];
  
      if (centerItem) {
        centerItem.classList.add('focus');
      } else {
        console.warn('No central item found to focus.');
      }
    };
  
    /**
     * Actualiza la rotación del carrusel.
     * @param delta - Cambio en la rotación.
     */
    const updateRotation = (delta: number): void => {
      rotation += delta;
      carousel.style.transform = `rotateY(${rotation}deg)`;
    };
  
    /**
     * Manejador del evento de rueda del ratón para rotar el carrusel.
     * @param event - Evento de rueda del ratón.
     */
    const handleWheel = (event: WheelEvent): void => {
      event.preventDefault();
      updateRotation(event.deltaY * 0.1);
    };
  
    // Inicializar el carrusel
    updateCarousel();
  
    // Añadir el manejador de eventos para el carrusel
    const carouselContainer: HTMLElement | null = document.getElementById('carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('wheel', handleWheel);
    } else {
      console.error('Carousel container element not found');
    }
  });
  