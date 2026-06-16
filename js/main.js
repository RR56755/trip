/* ========================================
   旅行攻略网站 — 主脚本
   ======================================== */

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("mobile-open");
    });
  }

  // Back to top button
  const backBtn = document.querySelector(".back-to-top");
  if (backBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backBtn.classList.add("show");
      } else {
        backBtn.classList.remove("show");
      }
    });
    backBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Sidebar anchor nav active state (detail pages)
  const sections = document.querySelectorAll(".detail-section");
  const navLinks = document.querySelectorAll(".sidebar-nav a");
  if (sections.length && navLinks.length) {
    window.addEventListener("scroll", function () {
      let current = "";
      sections.forEach(function (s) {
        const top = s.getBoundingClientRect().top;
        if (top < 200) {
          current = s.getAttribute("id");
        }
      });
      navLinks.forEach(function (a) {
        a.classList.remove("active");
        if (a.getAttribute("href") === "#" + current) {
          a.classList.add("active");
        }
      });
    });
  }

  // Toast notification
  window.showToast = function (msg) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 2500);
  };
});
