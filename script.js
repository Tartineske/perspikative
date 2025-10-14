document.addEventListener('DOMContentLoaded', () => {
  // Onglets classiques (desktop)
  const tabs = document.querySelectorAll('.nav-tabs .tab');
  const contents = document.querySelectorAll('.tab-content');

  function activateTab(tabName) {
    tabs.forEach(t => t.classList.remove('active'));
    const activeTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
    if (activeTab) activeTab.classList.add('active');

    contents.forEach(content => content.classList.remove('active'));
    const targetContent = document.getElementById(tabName);
    if (targetContent) targetContent.classList.add('active');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      activateTab(target);
    });
  });

  // Bouton "voir créations"
  const btnViewCreations = document.getElementById('btn-view-creations');
  if (btnViewCreations) {
    btnViewCreations.addEventListener('click', () => {
      activateTab('creations');
    });
  }

// 📱 Clics sur les icônes de navigation mobile
const icons = document.querySelectorAll('.mobile-nav .nav-icon');
icons.forEach(icon => {
  icon.addEventListener('click', () => {
    // Pas de preventDefault ici → les liens ouvrent les pages normalement
  });
});

  // --- 🛡️ Protection contre erreurs de variables non définies ---
  if (typeof fields !== 'undefined' && Array.isArray(fields)) {
    fields.forEach(field => {
      const el = document.getElementById(field.id);
      if (!el) return;

      let value;
      if (field.id === 'popup-title') {
        value = img?.dataset?.title || "Titre non défini";
        el.textContent = value;
        return;
      } else {
        const dataName = field.id.replace('popup-', '');
        value = img?.dataset?.[dataName] || "";
      }

      const parentP = el.closest('p');
      if (!value.trim()) {
        if (parentP) parentP.style.display = 'none';
      } else {
        if (parentP) parentP.style.display = '';
        el.textContent = value;
      }
    });
  }

  // Navigation dans les créations (flèches)
  if (typeof leftArrow !== 'undefined' && typeof rightArrow !== 'undefined' && Array.isArray(creations)) {
    leftArrow.addEventListener("click", () => {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = creations.length - 1;
      }
      showCreation(prevIndex);
    });

    rightArrow.addEventListener("click", () => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= creations.length) {
        nextIndex = 0;
      }
      showCreation(nextIndex);
    });
  }
});
