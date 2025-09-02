// Scroll reveal animations for children's engagement

class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Start observing elements
    this.observeElements();
    
    // Re-observe on DOM changes
    this.watchForNewElements();
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
        this.animateElement(entry.target);
        this.animatedElements.add(entry.target);
      }
    });
  }

  animateElement(element) {
    // Add reveal animation class
    element.classList.add('animate-revealed');
    
    // Add special effects for different element types
    if (element.classList.contains('section-default__title')) {
      // Titles get rainbow effect
      element.classList.add('animate-rainbow');
    }
    
    if (element.tagName === 'IMG') {
      // Images get bounce effect
      element.classList.add('animate-bounceIn');
    }
    
    if (element.classList.contains('footer')) {
      // Footer gets celebration
      this.addCelebrationEffect(element);
    }
  }

  addCelebrationEffect(element) {
    // Celebration effects completely disabled - no emojis
    return;
  }

  observeElements() {
    // Observe all potentially animatable elements (exclude cards to avoid conflicts)
    const selectors = [
      '.animate-on-scroll',
      '.section-default',
      '.footer',
      '.breadcrumbs',
      'h1', 'h2', 'h3',
      '.footer-section'
    ];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        // Skip if already animated
        if (this.animatedElements.has(element)) return;
        
        // Add scroll animation class
        element.classList.add('animate-on-scroll');
        
        // Observe element
        this.observer.observe(element);
      });
    });
  }

  watchForNewElements() {
    // Watch for new elements added to DOM
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Re-observe new elements
            setTimeout(() => this.observeElements(), 100);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Add playful cursor effects (disabled)
  initCursorEffects() {
    // Cursor effects disabled per user request
    return;
  }

  // Add click celebration effects
  initClickEffects() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      
      // Only on interactive elements
      if (target.matches('button, a, .btn-playful, .link-playful')) {
        this.addClickExplosion(e.clientX, e.clientY);
      }
    });
  }

  addClickExplosion(x, y) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        width: 6px;
        height: 6px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform-origin: center;
        animation: click-explosion 0.6s ease-out forwards;
        animation-delay: ${i * 50}ms;
      `;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }
  }

  // Destroy observer when done
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Add additional CSS animations
const additionalStyles = `
  .animate-revealed {
    animation: revealer 0.8s ease-out forwards;
  }
  
  .animate-on-scroll:not(.basic-card):not(.card-hero) {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @keyframes revealer {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes click-explosion {
    0% {
      transform: scale(0) translate(0, 0);
      opacity: 1;
    }
    100% {
      transform: scale(1) translate(
        ${Math.random() * 100 - 50}px, 
        ${Math.random() * 100 - 50}px
      );
      opacity: 0;
    }
  }
  
  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .animate-on-scroll {
      opacity: 1;
      transform: none;
      transition: none;
    }
    
    .animate-revealed {
      animation: none;
    }
  }
`;

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  // Add additional styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = additionalStyles;
  document.head.appendChild(styleSheet);
  
  // Initialize scroll animations
  let scrollAnimations;
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      scrollAnimations = new ScrollAnimations();
      // NO cursor effects - completely disabled to avoid any emojis
      scrollAnimations.initClickEffects();
    });
  } else {
    scrollAnimations = new ScrollAnimations();
    // NO cursor effects - completely disabled to avoid any emojis
    scrollAnimations.initClickEffects();
  }
  
  // Export for manual control if needed
  window.ScrollAnimations = ScrollAnimations;
}

export default ScrollAnimations;