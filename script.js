// Hide video intro after it finishes
document.addEventListener("DOMContentLoaded", () => {
  const introVideo = document.getElementById("introVideo");

  introVideo.onended = () => {
      document.querySelector(".video-intro").classList.add("hidden");
  };
});

window.addEventListener("scroll", () => { if (window.scrollY > 100) { document.body.classList.add("scrolled"); } else { document.body.classList.remove("scrolled"); } });

window.addEventListener("DOMContentLoaded", function() {

// Connections

document.querySelectorAll('.explore-card').forEach(card => {
    card.addEventListener('click', () => {
      const mode = card.querySelector('p').innerText;
      alert(`You selected "${mode}" mode! (Functionality coming soon 🔧)`);
    });
  });
  
  document.querySelectorAll('.explore-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      if (index === 0) {
        openPopup('popup-pc');
      } else if (index === 1) {
        openPopup('popup-phone');
      } else if (index === 2) {
        openPopup('popup-vr');
      }
    });
  });
  
  function openPopup(id) {
    document.getElementById(id).style.display = 'flex';
  }
  
  function closePopup(id) {
    document.getElementById(id).style.display = 'none';
  }

  const slider = document.getElementById('featureSlider');
  const slides = document.querySelectorAll('.slide');
  let currentIndex = 0;
  let isTransitioning = false;
  let touchStartX = 0;
  let touchEndX = 0;

  // Create navigation arrows
  const arrowsContainer = document.createElement('div');
  arrowsContainer.className = 'slider-arrows';
  arrowsContainer.innerHTML = `
    <button class="slider-arrow prev" aria-label="Previous slide">❮</button>
    <button class="slider-arrow next" aria-label="Next slide">❯</button>
  `;
  slider.parentElement.appendChild(arrowsContainer);

  const prevButton = arrowsContainer.querySelector('.prev');
  const nextButton = arrowsContainer.querySelector('.next');

  function updateSlider(direction = 'next') {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Remove all classes first
    slides.forEach(slide => {
      slide.classList.remove('active', 'prev');
    });

    // Calculate new index
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % slides.length;
    } else {
      newIndex = (currentIndex - 1 + slides.length) % slides.length;
    }

    // Add appropriate classes
    slides[currentIndex].classList.add(direction === 'next' ? 'prev' : 'active');
    slides[newIndex].classList.add('active');

    // Update current index
    currentIndex = newIndex;

    // Reset transition lock after animation
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  // Arrow navigation
  prevButton.addEventListener('click', () => updateSlider('prev'));
  nextButton.addEventListener('click', () => updateSlider('next'));

  // Touch events for mobile
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  slider.addEventListener('touchmove', (e) => {
    if (isTransitioning) return;
    touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        updateSlider('next');
      } else {
        updateSlider('prev');
      }
      touchStartX = touchEndX;
    }
  }, { passive: true });

  slider.addEventListener('touchend', () => {
    startAutoplay();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (isTransitioning) return;
    
    if (e.key === 'ArrowLeft') {
      updateSlider('prev');
    } else if (e.key === 'ArrowRight') {
      updateSlider('next');
    }
  });

  // Autoplay with pause on hover/touch
  let autoplayInterval;
  const autoplayDelay = 4000;

  function startAutoplay() {
    stopAutoplay();
    // Start immediately with first transition
    if (!isTransitioning && document.hasFocus()) {
      updateSlider('next');
    }
    // Then continue with interval
    autoplayInterval = setInterval(() => {
      if (!isTransitioning && document.hasFocus()) {
        updateSlider('next');
      }
    }, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  // Pause autoplay on hover/focus
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);

  // Handle visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Set initial active slide and start autoplay immediately
  slides[0].classList.add('active');
  startAutoplay();

  //FAQs Section
  
  const articles = [
    { title: "5 Things Every Home Buyer Should Know", description: "Navigating your first home purchase? Here's what to expect and how Aptura helps.", category: "buyers" },
    { title: "Builders: How to Optimize for VR Showcases", description: "Tips and tricks to make your models pop in the virtual space.", category: "builders" },
    { title: "VR 101: What is Virtual Reality in Real Estate?", description: "A beginner-friendly intro to how VR is changing the property game.", category: "vr101" },
    { title: "Comparing Property Before Visiting? Use VR.", description: "No more blind tours. Explore like you're already there.", category: "buyers" },
    { title: "Integrating VR Models with Aptura Platform", description: "Step-by-step guide to get your buildings VR-ready.", category: "builders" },
    { title: "What's Next for VR in Real Estate?", description: "A sneak peek into the next wave of tech that's shaping the property world.", category: "vr101" },
    { title: "Buyers: Virtual Tours vs. Real Visits", description: "Weighing the pros and cons of digital walkthroughs.", category: "buyers" },
    { title: "Tips for Builders Entering the VR Space", description: "No experience? No problem. Let's get you VR-ready.", category: "builders" }
  ];
  
  const blogGrid = document.getElementById("blogGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryButtons = document.querySelectorAll(".category");
  const showMoreBtn = document.getElementById("showMoreBtn");
  
  let visibleCount = 3;
  
  function renderCards(filteredArticles) {
    blogGrid.innerHTML = "";
  
    const articlesToShow = filteredArticles.slice(0, visibleCount);
  
    articlesToShow.forEach((article, index) => {
      const card = document.createElement("div");
      card.classList.add("blog-card");
      card.style.animationDelay = `${index * 0.1}s`; // staggered animation
      card.setAttribute("data-category", article.category);
      card.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
      `;
      blogGrid.appendChild(card);
    });
  
    if (visibleCount >= filteredArticles.length) {
      showMoreBtn.style.display = "none";
    } else {
      showMoreBtn.style.display = "block";
    }
  }
  
  function filterContent() {
    const query = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector(".category.active").dataset.category;
  
    const filtered = articles.filter(article => {
      const matchCategory = activeCategory === "all" || article.category === activeCategory;
      const matchText = article.title.toLowerCase().includes(query) || article.description.toLowerCase().includes(query);
      return matchCategory && matchText;
    });
  
    visibleCount = 3;
    renderCards(filtered);
  }
  
  searchInput.addEventListener("input", filterContent);
  
  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      filterContent();
    });
  });
  
  showMoreBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector(".category.active").dataset.category;
  
    const filtered = articles.filter(article => {
      const matchCategory = activeCategory === "all" || article.category === activeCategory;
      const matchText = article.title.toLowerCase().includes(query) || article.description.toLowerCase().includes(query);
      return matchCategory && matchText;
    });
  
    visibleCount += 3;
    renderCards(filtered);
  });
  
  // Initial load
  renderCards(articles);
});