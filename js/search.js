/* ========================================
   搜索功能
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-box input");
  const searchContainer = document.querySelector(".search-box");

  if (!searchInput) return;

  // Load spots data
  let spotsData = [];

  // Try to load from window.spotsData (homepage) or fetch JSON
  if (window.spotsData) {
    spotsData = window.spotsData;
  } else {
    // For detail pages, fetch the JSON data
    fetch("../data/spots.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        spotsData = data.spots;
      })
      .catch(function () {});
  }

  // Create suggestions dropdown
  const suggestions = document.createElement("div");
  suggestions.className = "search-suggestions";
  searchContainer.style.position = "relative";
  searchContainer.appendChild(suggestions);

  const basePath = window.location.pathname.includes("/spots/") ? "../" : "./";

  searchInput.addEventListener("input", function () {
    const q = this.value.trim().toLowerCase();
    suggestions.innerHTML = "";
    if (!q || !spotsData.length) {
      suggestions.classList.remove("show");
      return;
    }

    const results = spotsData.filter(function (s) {
      return (
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        (s.keywords || []).some(function (k) { return k.includes(q); })
      );
    }).slice(0, 6);

    if (!results.length) {
      suggestions.classList.remove("show");
      return;
    }

    results.forEach(function (s) {
      const a = document.createElement("a");
      a.href = basePath + "spots/" + s.id + ".html";
      a.textContent = s.name + " - " + s.location;
      suggestions.appendChild(a);
    });
    suggestions.classList.add("show");
  });

  document.addEventListener("click", function (e) {
    if (!searchContainer.contains(e.target)) {
      suggestions.classList.remove("show");
    }
  });
});
