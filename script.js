document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.nav-tabs .tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(content => content.classList.remove('active'));
      const target = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  const btnViewCreations = document.getElementById('btn-view-creations');
  if (btnViewCreations) {
    btnViewCreations.addEventListener('click', () => {
      const creationsTab = document.querySelector('.tab[data-tab="creations"]');
      if (creationsTab) {
        creationsTab.click();
      }
    });
  }

  // Popup variables
  const popupOverlay = document.getElementById("popup-overlay");
  const popupClose = document.querySelector(".popup-close");
  const creations = document.querySelectorAll(".creation");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  let currentIndex = 0;

  // Fonction pour afficher une création dans le popup (avec gestion des champs vides)
  function showCreation(index) {
    if (index < 0 || index >= creations.length) return;

    const img = creations[index];
    currentIndex = index;

    // Champs à traiter : id popup + label (label pour info, pas utilisé ici)
    const fields = [
      {id: 'popup-title', label: null}, // titre
      {id: 'popup-date', label: '📅 Date :'},
      {id: 'popup-colors', label: '🎨 Teintes :'},
      {id: 'popup-time', label: '⌛️ Temps de travail :'},
      {id: 'popup-details', label: '❇️ Particularités :'},
      {id: 'popup-imagination', label: '💭 Imagination :'},
      {id: 'popup-comments', label: '💬 Commentaires :'}
    ];

    fields.forEach(field => {
      const el = document.getElementById(field.id);
      if (!el) return;

      let value;
      if (field.id === 'popup-title') {
        value = img.dataset.title || "Titre non défini";
        el.textContent = value;
        return; // On ne cache pas le titre
      } else {
        const dataName = field.id.replace('popup-', '');
        value = img.dataset[dataName] || "";
      }

      const parentP = el.closest('p');
      if (!value.trim()) {
        if (parentP) parentP.style.display = 'none';
      } else {
        if (parentP) parentP.style.display = '';
        el.textContent = value;
      }
    });

    // Image popup
    const popupImg = document.getElementById('popup-img');
    popupImg.src = img.src;
    popupImg.alt = img.dataset.title || "Création agrandie";

    // Afficher popup
    popupOverlay.style.display = 'flex';
  }

  // Ouvrir popup au clic sur une création
  creations.forEach((img, i) => {
    img.addEventListener("click", e => {
      e.preventDefault();
      showCreation(i);
    });
  });

  // Fermer popup au clic sur la croix
  popupClose.addEventListener("click", () => {
    popupOverlay.style.display = "none";
  });

  // Fermer popup si clic hors contenu
  popupOverlay.addEventListener("click", e => {
    if (e.target === popupOverlay) {
      popupOverlay.style.display = "none";
    }
  });

  // Flèche gauche (création précédente)
  leftArrow.addEventListener("click", () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = creations.length - 1; // boucle à la dernière création
    }
    showCreation(prevIndex);
  });

  // Flèche droite (création suivante)
  rightArrow.addEventListener("click", () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= creations.length) {
      nextIndex = 0; // boucle au début
    }
    showCreation(nextIndex);
  });
});
