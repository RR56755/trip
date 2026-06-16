/* ========================================
   收藏功能
   ======================================== */

(function () {
  const STORAGE_KEY = "trip_favorites";

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function toggleFavorite(spotId) {
    let favs = getFavorites();
    const idx = favs.indexOf(spotId);
    if (idx > -1) {
      favs.splice(idx, 1);
      return false;
    } else {
      favs.push(spotId);
      return true;
    }
  }

  function isFavorite(spotId) {
    return getFavorites().indexOf(spotId) > -1;
  }

  // Bind favorite buttons
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".fav-btn").forEach(function (btn) {
      const spotId = btn.getAttribute("data-spot-id");
      if (isFavorite(spotId)) btn.classList.add("favorited");

      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const nowFav = toggleFavorite(spotId);
        this.classList.toggle("favorited", nowFav);
        if (typeof window.showToast === "function") {
          window.showToast(nowFav ? "已收藏 ♥" : "已取消收藏");
        }
      });
    });

    // Share link
    document.querySelectorAll(".share-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (navigator.share) {
          navigator.share({ title: document.title, url: window.location.href });
        } else {
          navigator.clipboard.writeText(window.location.href).then(function () {
            if (typeof window.showToast === "function") {
              window.showToast("链接已复制");
            }
          });
        }
      });
    });
  });

  window.tripFavorites = { getFavorites: getFavorites, toggleFavorite: toggleFavorite, isFavorite: isFavorite };
})();
