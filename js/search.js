/* ========================================
   搜索功能 — 重写版
   ======================================== */
(function () {
  // Wait for spotsData to be ready
  function initSearch() {
    var searchInput = document.querySelector(".search-box input");
    var searchContainer = document.querySelector(".search-box");
    if (!searchInput) return;

    // Create suggestions dropdown
    var suggestions = document.createElement("div");
    suggestions.className = "search-suggestions";
    searchContainer.style.position = "relative";
    searchContainer.appendChild(suggestions);

    var basePath = window.location.pathname.indexOf("/spots/") >= 0 ? "../" : "./";

    // Try to get spotsData from window, or fetch it
    function getSpotsData(callback) {
      if (window.spotsData && window.spotsData.length) {
        callback(window.spotsData);
        return;
      }
      var path = basePath + "data/spots.json";
      fetch(path)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          window.spotsData = data.spots;
          callback(data.spots);
        })
        .catch(function () {
          // Silently fail
          callback([]);
        });
    }

    var allSpots = [];
    getSpotsData(function (spots) {
      allSpots = spots;
    });

    searchInput.addEventListener("input", function () {
      var q = this.value.trim().toLowerCase();
      suggestions.innerHTML = "";
      if (!q || !allSpots.length) {
        suggestions.classList.remove("show");
        return;
      }

      var results = allSpots.filter(function (s) {
        return (
          s.name.toLowerCase().indexOf(q) >= 0 ||
          s.location.toLowerCase().indexOf(q) >= 0 ||
          (s.keywords || []).some(function (k) { return k.toLowerCase().indexOf(q) >= 0; })
        );
      }).slice(0, 6);

      if (!results.length) {
        suggestions.classList.remove("show");
        return;
      }

      results.forEach(function (s) {
        var a = document.createElement("a");
        a.href = basePath + "spots/" + s.id + ".html";
        a.innerHTML = "<strong>" + s.name + "</strong> <span style='color:#999;font-size:0.8rem;'>— " + s.location + "</span>";
        suggestions.appendChild(a);
      });
      suggestions.classList.add("show");
    });

    document.addEventListener("click", function (e) {
      if (!searchContainer.contains(e.target)) {
        suggestions.classList.remove("show");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearch);
  } else {
    initSearch();
  }
})();
