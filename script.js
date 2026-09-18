/* ============================================================
   BRASA BURGER — script.js
   Menu mobile, header on scroll, scroll reveal, cardápio (toast)
   ============================================================ */
(function () {
  "use strict";

  /* -----------------------------------------------------------
     Header: muda de estilo ao rolar a página
  ----------------------------------------------------------- */
  var header = document.getElementById("site-header");
  function handleHeaderScroll() {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  /* -----------------------------------------------------------
     Menu mobile
  ----------------------------------------------------------- */
  var menuToggle = document.getElementById("menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  function openMobileNav() {
    mobileNav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
    document.body.style.overflow = "hidden";
  }

  function closeMobileNav() {
    mobileNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("click", function () {
    var isOpen = mobileNav.classList.contains("is-open");
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  // Fecha o menu mobile ao clicar em qualquer link dele
  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  // Fecha o menu mobile com a tecla Esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
      closeMobileNav();
      menuToggle.focus();
    }
  });

  /* -----------------------------------------------------------
     Scroll reveal (Intersection Observer)
  ----------------------------------------------------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el, index) {
      // pequeno atraso escalonado dentro de um mesmo grupo (hero, cards, etc.)
      el.style.transitionDelay = (index % 6) * 70 + "ms";
      revealObserver.observe(el);
    });
  }

  /* -----------------------------------------------------------
     Cardápio: botão "Adicionar ao pedido" + toast de confirmação
  ----------------------------------------------------------- */
  var toast = document.getElementById("toast");
  var toastTimeout = null;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    toastTimeout = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  document.querySelectorAll(".btn--add").forEach(function (button) {
    button.addEventListener("click", function () {
      var itemName = button.getAttribute("data-name") || "Item";
      var originalText = button.textContent;

      button.classList.add("is-added");
      button.textContent = "Adicionado ✓";
      showToast(itemName + " adicionado ao pedido.");

      setTimeout(function () {
        button.classList.remove("is-added");
        button.textContent = originalText;
      }, 1800);
    });
  });

  /* -----------------------------------------------------------
     Smooth scroll com offset do header fixo
  ----------------------------------------------------------- */
  var headerHeight = header.offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = link.getAttribute("href");
      if (targetId.length <= 1) return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        8;

      window.scrollTo({
        top: top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  });
})();
