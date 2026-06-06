document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      document.getElementById("mobile-menu").classList.toggle("hidden");
    });
  }

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (nav) {
      if (window.scrollY > 20) {
        nav.classList.add("shadow-md");
        nav.classList.remove("py-2");
      } else {
        nav.classList.remove("shadow-md");
        nav.classList.add("py-2");
      }
    }
  });

  // Sliders functionality (Scroll Horizontally)
  const setupSlider = (prevBtnClass, nextBtnClass) => {
    document.querySelectorAll(nextBtnClass).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetId = e.currentTarget.getAttribute("data-target");
        const container = document.getElementById(targetId);
        if(!container) return;
        const scrollAmount =
          window.innerWidth < 768
            ? window.innerWidth * 0.85
            : container.clientWidth * 0.4;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });
    document.querySelectorAll(prevBtnClass).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetId = e.currentTarget.getAttribute("data-target");
        const container = document.getElementById(targetId);
        if(!container) return;
        const scrollAmount =
          window.innerWidth < 768
            ? window.innerWidth * 0.85
            : container.clientWidth * 0.4;
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
    });
  };
  setupSlider(".slider-btn-prev", ".slider-btn-next");

  // WhatsApp Prefilled Booking Logic
  document.querySelectorAll(".wa-book-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tourName = e.currentTarget.getAttribute("data-tour");
      const category = e.currentTarget.getAttribute("data-cat");
      const text = `Hello, I am interested in the ${tourName} package under ${category}. Please share more details about availability, pricing and booking process.`;
      const whatsappUrl = `https://wa.me/919836446317?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");
    });
  });

  // News Modal Logic
  const newsCards = document.querySelectorAll(".news-card");
  const newsModal = document.getElementById("news-modal");
  const newsModalContent = document.getElementById("news-modal-content");
  const closeModalBtn = document.getElementById("close-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");

  newsCards.forEach((card) => {
    card.addEventListener("click", () => {
      modalTitle.textContent = card.getAttribute("data-title");
      modalDesc.textContent = card.getAttribute("data-desc");
      newsModal.classList.remove("hidden");
      setTimeout(() => {
        newsModal.classList.remove("opacity-0");
        newsModalContent.classList.remove("scale-95");
      }, 10);
    });
  });

  const closeModal = () => {
    if(!newsModal) return;
    newsModal.classList.add("opacity-0");
    newsModalContent.classList.add("scale-95");
    setTimeout(() => {
      newsModal.classList.add("hidden");
    }, 300);
  };

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (newsModal) {
    newsModal.addEventListener("click", (e) => {
      if (e.target === newsModal) closeModal();
    });
  }

  // Testimonial Auto Slider
  const testimonialTrack = document.getElementById("testimonial-track");
  const testimonialDots = document.querySelectorAll(
    "#testimonial-dots button",
  );
  if (testimonialTrack && testimonialDots.length > 0) {
    let currentSlide = 0;
    const totalSlides = testimonialDots.length;
    let testimonialInterval;

    const goToSlide = (index) => {
      currentSlide = index;
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      testimonialDots.forEach((dot, i) => {
        dot.className =
          i === currentSlide
            ? "w-3 h-3 rounded-full bg-primary transition"
            : "w-3 h-3 rounded-full bg-gray-300 hover:bg-primary transition";
      });
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    };

    const startSlider = () => {
      testimonialInterval = setInterval(nextSlide, 5000);
    };

    const stopSlider = () => {
      clearInterval(testimonialInterval);
    };

    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
        stopSlider();
        startSlider();
      });
    });

    testimonialTrack.addEventListener("mouseenter", stopSlider);
    testimonialTrack.addEventListener("mouseleave", startSlider);

    startSlider();
  }

  // News Carousel Auto Slide
  const newsSlider = document.getElementById("news-slider");
  if (newsSlider) {
    let newsScrollInterval;
    const startNewsScroll = () => {
      newsScrollInterval = setInterval(() => {
        if (
          newsSlider.scrollLeft + newsSlider.clientWidth >=
          newsSlider.scrollWidth - 10
        ) {
          newsSlider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const scrollAmount =
            window.innerWidth < 768
              ? window.innerWidth * 0.85
              : newsSlider.clientWidth * 0.3;
          newsSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 4000);
    };
    startNewsScroll();
    newsSlider.addEventListener("mouseenter", () =>
      clearInterval(newsScrollInterval),
    );
    newsSlider.addEventListener("mouseleave", startNewsScroll);
  }
});
