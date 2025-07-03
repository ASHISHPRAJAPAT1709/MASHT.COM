
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto advance slides
setInterval(nextSlide, 3000);

// Event listeners
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Show first slide initially
showSlide(0);

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider-track');
    const cards = document.querySelectorAll('.category-card');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentIndex = 0;
    const cardCount = cards.length;
    const cardWidth = cards[0].offsetWidth;
    
    // Clone first and last cards for infinite effect
    const firstCardClone = cards[0].cloneNode(true);
    const lastCardClone = cards[cardCount - 1].cloneNode(true);
    track.appendChild(firstCardClone);
    track.insertBefore(lastCardClone, cards[0]);
    
    // Set initial position
    track.style.transform = `translateX(-${cardWidth}px)`;
    
    function slideToIndex(index) {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${(index + 1) * cardWidth}px)`;
        currentIndex = index;
    }
    
    function handleTransitionEnd() {
        if (currentIndex === -1) {
            track.style.transition = 'none';
            currentIndex = cardCount - 1;
            track.style.transform = `translateX(-${(currentIndex + 1) * cardWidth}px)`;
        }
        if (currentIndex === cardCount) {
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = `translateX(-${(currentIndex + 1) * cardWidth}px)`;
        }
    }
    
    function nextSlide() {
        slideToIndex(currentIndex + 1);
    }
    
    function prevSlide() {
        slideToIndex(currentIndex - 1);
    }
    
    // Auto slide
    let autoSlideInterval = setInterval(nextSlide, 3000);
    
    // Event listeners
    track.addEventListener('transitionend', handleTransitionEnd);
    
    prevButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        autoSlideInterval = setInterval(nextSlide, 3000);
    });
    
    nextButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        autoSlideInterval = setInterval(nextSlide, 3000);
    });
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 3000);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider-track');
    const cards = document.querySelectorAll('.product-card');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentIndex = 0;
    const cardCount = cards.length;
    const cardWidth = cards[0].offsetWidth;
    
    // Clone first and last cards for infinite effect
    const firstCardClone = cards[0].cloneNode(true);
    const lastCardClone = cards[cardCount - 1].cloneNode(true);
    track.appendChild(firstCardClone);
    track.insertBefore(lastCardClone, cards[0]);
    
    // Set initial position
    track.style.transform = `translateX(-${cardWidth}px)`;
    
    function slideToIndex(index, direction = 'next') {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${(index + 1) * cardWidth}px)`;
        currentIndex = index;
        
        // Add zoom effect to current card
        cards.forEach(card => {
            card.classList.remove('zoomed');
            card.style.transform = 'scale(1)';
        });
        
        if (cards[currentIndex]) {
            cards[currentIndex].classList.add('zoomed');
            cards[currentIndex].style.transform = 'scale(1.1)';
        }
    }
    
    function handleTransitionEnd() {
        if (currentIndex === -1) {
            track.style.transition = 'none';
            currentIndex = cardCount - 1;
            track.style.transform = `translateX(-${(currentIndex + 1) * cardWidth}px)`;
        }
        if (currentIndex === cardCount) {
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = `translateX(-${(currentIndex + 1) * cardWidth}px)`;
        }
    }
    
    function nextSlide() {
        slideToIndex(currentIndex + 1, 'next');
    }
    
    function prevSlide() {
        slideToIndex(currentIndex - 1, 'prev');
    }
    
    // Auto slide
    let autoSlideInterval = setInterval(nextSlide, 3000);
    
    // Event listeners
    track.addEventListener('transitionend', handleTransitionEnd);
    
    prevButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        autoSlideInterval = setInterval(nextSlide, 3000);
    });
    
    nextButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        autoSlideInterval = setInterval(nextSlide, 3000);
    });
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 3000);
    });
    
    // Initial zoom effect
    if (cards[0]) {
        cards[0].classList.add('zoomed');
        cards[0].style.transform = 'scale(1.1)';
    }
});

  const slider = document.getElementById('offerSlider');
  let isDown = false;
  let startX, scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
