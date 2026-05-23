/**
 * Decor Plus — Main JavaScript
 * Smooth scrolling, navbar behavior, scroll reveal animations
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     Navbar: shrink on scroll + close mobile menu on link click
     -------------------------------------------------------------------------- */
  const navbar = document.querySelector(".navbar-decor");

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Close Bootstrap collapse when a nav link is clicked (mobile)
  const navLinks = document.querySelectorAll(".navbar-decor .nav-link");
  const navbarCollapse = document.querySelector("#navbarMain");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove("show");
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     Smooth scrolling for same-page anchor links
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    });
  });

  /* --------------------------------------------------------------------------
     Scroll reveal: add .revealed when sections enter viewport
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0 && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.15,
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all elements if IntersectionObserver unsupported
    revealElements.forEach(function (el) {
      el.classList.add("revealed");
    });
  }

  /* --------------------------------------------------------------------------
     Set active nav link based on current page
     -------------------------------------------------------------------------- */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (!href) return;

    const linkPage = href.split("/").pop().split("#")[0];
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    }
  });
})();
