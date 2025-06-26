// Función para cargar componentes
function loadComponent(elementId, componentPath) {
  fetch(componentPath)
    .then(response => response.text())
    .then(html => {
      document.getElementById(elementId).innerHTML = html;
    })
    .catch(error => {
      console.error('Error cargando componente:', error);
    });
}

// Función para manejar el dark mode
function initDarkMode() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Modo Oscuro</span>';
  themeToggle.setAttribute('aria-label', 'Cambiar modo oscuro');
  
  // Agregar el toggle al body
  document.body.appendChild(themeToggle);
  
  // Verificar si hay una preferencia guardada
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Aplicar tema inicial
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateToggleButton(true);
  }
  
  // Event listener para el toggle
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleButton(newTheme === 'dark');
  });
}

// Función para actualizar el botón del toggle
function updateToggleButton(isDark) {
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    if (isDark) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Modo Oscuro</span>';
    }
  }
}

// Función para manejar el carrusel (mejorada, sin conflictos con onclicks inline)
function initCarousel() {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.parentElement.querySelectorAll('.dot');
    const prevBtn = carousel.parentElement.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.parentElement.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let interval;

    function showSlide(index) {
      if (index >= slides.length) currentSlide = 0;
      else if (index < 0) currentSlide = slides.length - 1;
      else currentSlide = index;
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }
    function prevSlide() {
      showSlide(currentSlide - 1);
    }
    function startAutoSlide() {
      interval = setInterval(nextSlide, 4000);
    }
    function stopAutoSlide() {
      clearInterval(interval);
    }

    // Botones
    if (prevBtn) prevBtn.onclick = () => { prevSlide(); stopAutoSlide(); startAutoSlide(); };
    if (nextBtn) nextBtn.onclick = () => { nextSlide(); stopAutoSlide(); startAutoSlide(); };
    dots.forEach((dot, i) => {
      dot.onclick = () => { showSlide(i); stopAutoSlide(); startAutoSlide(); };
    });

    // Auto slide
    if (slides.length > 1) {
      startAutoSlide();
      carousel.addEventListener('mouseenter', stopAutoSlide);
      carousel.addEventListener('mouseleave', startAutoSlide);
    }
    showSlide(0);
  });
}

// Función para animaciones de scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observar elementos que necesitan animación
  const animatedElements = document.querySelectorAll('.skill-card, .stat-item, .experience-item, .project-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Función para manejar formularios
function initForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simular envío
      const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
      const originalText = submitBtn.value || submitBtn.textContent;
      
      submitBtn.value = 'Enviando...';
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      // Simular delay
      setTimeout(() => {
        alert('¡Gracias por tu mensaje! Te responderé pronto.');
        form.reset();
        submitBtn.value = originalText;
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  });
}

// Función para manejar enlaces suaves
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Función para manejar la navegación activa
function initActiveNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && currentPath.includes(linkPath.replace('.html', ''))) {
      link.classList.add('active');
    }
  });
}

// Función para efectos de hover en imágenes
function initImageEffects() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.02)';
      img.style.transition = 'transform 0.3s ease';
    });
    
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
}

// Mejorar contraste de dark mode dinámicamente
function improveDarkModeContrast() {
  const style = document.createElement('style');
  style.innerHTML = `
    [data-theme="dark"] {
      --color-bg: #10131a;
      --color-white: #23283a;
      --color-black: #fff;
      --color-gray: #bfc7d5;
      --color-gray-light: #23283a;
      --color-blue-dark: #181e2c;
      --color-blue-accent: #23283a;
      --color-blue-light: #7ab8ff;
      --color-gradient-1: #3a4a7a;
      --color-gradient-2: #5a4ca2;
      --color-text-primary: #f7fafc;
      --color-text-secondary: #bfc7d5;
      --color-card-bg: rgba(24,28,40,0.98);
      --color-card-border: rgba(255,255,255,0.08);
      --color-shadow: rgba(0,0,0,0.45);
      --color-shadow-light: rgba(0,0,0,0.25);
    }
    [data-theme="dark"] h1, [data-theme="dark"] h2, [data-theme="dark"] h3, [data-theme="dark"] h4, [data-theme="dark"] h5, [data-theme="dark"] h6 {
      color: #fff !important;
      text-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }
    [data-theme="dark"] p, [data-theme="dark"] li, [data-theme="dark"] .stat-label, [data-theme="dark"] .stat-number, [data-theme="dark"] .button.secondary {
      color: #e0e6f0 !important;
    }
    [data-theme="dark"] .button, [data-theme="dark"] .button.large, [data-theme="dark"] .carousel-caption {
      color: #fff !important;
      text-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }
    [data-theme="dark"] .carousel-caption {
      background: linear-gradient(transparent, rgba(10,19,34,0.92));
    }
    [data-theme="dark"] .carousel-btn {
      background: rgba(255,255,255,0.08);
      color: #fff;
      border: 1px solid #444;
    }
    [data-theme="dark"] .carousel-btn:hover {
      background: rgba(255,255,255,0.18);
    }
    [data-theme="dark"] .carousel-dots .dot {
      background: #bfc7d5;
    }
    [data-theme="dark"] .carousel-dots .dot.active {
      background: #fff;
    }
  `;
  document.head.appendChild(style);
}

// Función principal de inicialización
function init() {
  // Cargar componentes
  loadComponent('header-placeholder', '../components/header.html');
  loadComponent('footer-placeholder', '../components/footer.html');
  
  // Inicializar funcionalidades
  initDarkMode();
  initCarousel();
  initScrollAnimations();
  initForms();
  initSmoothScrolling();
  initActiveNavigation();
  initImageEffects();
  improveDarkModeContrast();
  
  // Esperar a que se carguen los componentes
  setTimeout(() => {
    initActiveNavigation();
  }, 100);
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Exportar funciones para uso global
window.PortfolioApp = {
  initDarkMode,
  initCarousel,
  initScrollAnimations,
  initForms,
  initSmoothScrolling,
  initActiveNavigation,
  initImageEffects
}; 