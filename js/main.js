// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Изменение иконки гамбургера
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Возврат иконки гамбургера в исходное состояние
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }
    
    // Инициализация слайдера, если он есть на странице
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        initSlider();
    }
});

// Слайдер
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 6000; // 6 секунд
    
    // Функция для показа слайда
    function showSlide(index) {
        // Скрыть все слайды
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
        });
        
        // Убрать активный класс со всех индикаторов
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
            indicator.setAttribute('aria-current', 'false');
        });
        
        // Показать текущий слайд
        slides[index].classList.add('active');
        slides[index].setAttribute('aria-hidden', 'false');
        
        // Активировать соответствующий индикатор
        indicators[index].classList.add('active');
        indicators[index].setAttribute('aria-current', 'true');
        
        currentSlide = index;
    }
    
    // Функция для следующего слайда
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Функция для предыдущего слайда
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Запуск автоматической смены слайдов
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Остановка автоматической смены слайдов
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Обработчики событий для кнопок навигации
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopSlideShow();
            nextSlide();
            startSlideShow();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopSlideShow();
            prevSlide();
            startSlideShow();
        });
    }
    
    // Обработчики событий для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });
    
    // Пауза при наведении на слайдер
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', stopSlideShow);
        sliderWrapper.addEventListener('mouseleave', startSlideShow);
        
        // Поддержка свайпов для мобильных устройств
        let startX = 0;
        let endX = 0;
        
        sliderWrapper.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        sliderWrapper.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (startX - endX > swipeThreshold) {
                // Свайп влево - следующий слайд
                stopSlideShow();
                nextSlide();
                startSlideShow();
            } else if (endX - startX > swipeThreshold) {
                // Свайп вправо - предыдущий слайд
                stopSlideShow();
                prevSlide();
                startSlideShow();
            }
        }
    }
    
    // Запуск слайдера
    startSlideShow();
    
    // Установка фокуса на первом слайде для доступности
    slides[0].setAttribute('tabindex', '0');
}