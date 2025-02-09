// Particles.js 配置
function initParticles() {
  particlesJS('particles-container', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#d4af37' },
      shape: { type: 'circle' },
      opacity: { value: 0.6, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#d4af37',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 4,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 200, line_linked: { opacity: 1 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
}

// 改进移动端菜单逻辑
function setupMobileNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelectorAll('.nav-link');

  // 处理菜单切换
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navContainer.classList.toggle('active');
    document.body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
    if (hamburger.classList.contains('active')) {
      hamburger.textContent = 'X';
      // 如果按钮点击后超出右边界则向下偏移，否则向右偏移
      const rect = hamburger.getBoundingClientRect();
      if (rect.right + 10 > window.innerWidth) {
        hamburger.style.transform = "translateY(10px)";
      } else {
        hamburger.style.transform = "translateX(10px)";
      }
    } else {
      hamburger.textContent = '菜单';
      hamburger.style.transform = "translate(0)";
    }
  }

  // 点击汉堡按钮
  hamburger.addEventListener('click', toggleMenu);

  // 点击导航链接时关闭菜单（移动端）
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 480 && navContainer.classList.contains('active')) {
        toggleMenu();
      }
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 点击外部区域关闭菜单
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 480 && 
        navContainer.classList.contains('active') && 
        !navContainer.contains(e.target) && 
        !hamburger.contains(e.target)) {
      toggleMenu();
    }
  });

  // 处理窗口大小变化
  window.addEventListener('resize', () => {
    if (window.innerWidth > 480 && navContainer.classList.contains('active')) {
      toggleMenu();
    }
  });
}

// 平滑滚动
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    if (!link.classList.contains('nav-link')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    }
  });
}

// 调试模式切换
function toggleDebugMode() {
  document.body.classList.toggle('debug-mode');
  if (document.body.classList.contains('debug-mode')) {
    document.querySelectorAll('*').forEach(el => {
      el.style.outline = '1px solid rgba(255,0,0,0.3)';
    });
  } else {
    document.querySelectorAll('*').forEach(el => {
      el.style.outline = 'none';
    });
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  setupMobileNavigation();
  smoothScroll();
});
