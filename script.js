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

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.mobile-nav');
  const footer = document.querySelector('footer');

  // Courbe d'animation fluide et "vivante"
  const smoothEase = 'cubic-bezier(0.22, 1, 0.36, 1)';

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const ratio = entry.intersectionRatio;

      if (ratio > 0) {
        // Barre disparaît (descend)
        nav.style.transition = `transform 0.5s ${smoothEase}, opacity 0.5s ${smoothEase}`;
        nav.style.transform = 'translate(-50%, 100%)';
        nav.style.opacity = '0';
      } else {
        // Barre réapparaît (remonte franchement mais fluide)
        nav.style.transition = `transform 0.5s ${smoothEase}, opacity 0.5s ${smoothEase}`;
        nav.style.transform = 'translateX(-50%)';
        nav.style.opacity = '1';
      }
    });
  }, {
    threshold: 0.05
  });

  observer.observe(footer);
});

    // --- Gestion des boutons de catégorie ---
    const buttons = document.querySelectorAll('.portfolio-btn');
    const sections = document.querySelectorAll('.masonry');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.target;
        sections.forEach(s => s.classList.toggle('active', s.id === target));
      });
    });

    // --- Génération automatique des créations ---
    const creationsContainer = document.getElementById('creations');
    for (let i = 1; i <= 41; i++) {
      const img = document.createElement('img');
      img.src = `portfolio/creations/creation${i}.jpg`;
      img.alt = `Création ${i}`;
      creationsContainer.appendChild(img);
    }
});


window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#creations .masonry img').forEach((img, i) => {
    img.style.animationDelay = `${i * 0.1}s`;
    img.style.opacity = 1;
    img.style.animation = 'fadeIn 0.6s forwards';
  });
});

// Apparition fluide des images dans la section "Créations"
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("#creations .masonry img");

  images.forEach((img, index) => {
    const showImage = () => {
      // Ajoute un léger décalage progressif pour un effet cascade
      setTimeout(() => img.classList.add("loaded"), index * 100);
    };

    if (img.complete) {
      showImage();
    } else {
      img.addEventListener("load", showImage);
    }
  });
});


