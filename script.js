
document.addEventListener('DOMContentLoaded', () => {
  // Carousel functionality
  const carousel = document.querySelector('.carousel');
  const images = carousel.querySelectorAll('.carousel-img');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentImageIndex = 0;

  function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
  }

  nextButton.addEventListener('click', nextImage);
  prevButton.addEventListener('click', prevImage);

  // Auto-advance every 5 seconds
  setInterval(nextImage, 5000);
  // Navigation highlight
  const navLinks = document.querySelectorAll('#main-nav a');
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Animate stats on scroll
  const stats = document.querySelectorAll('.number');
  let animated = false;

  function animateStats() {
    if (animated) return;
    
    stats.forEach(stat => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          stat.textContent = target;
        } else {
          stat.textContent = Math.round(current);
        }
      }, 20);
    });
    animated = true;
  }

  // Check if stats are in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
      }
    });
  });

  observer.observe(document.querySelector('.stats-grid'));
});
