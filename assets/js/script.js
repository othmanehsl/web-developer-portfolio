'use strict';

/*-----------------------------------
  1. GESTION DES ONGLETS
-----------------------------------*/
const tabBtns = document.querySelectorAll('[data-tab-btn]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tabBtn;

    tabBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    tabContents.forEach((content) => {
      content.classList.toggle('active', content.dataset.tabContent === target);
    });
  });
});

/*-----------------------------------
  2. SIDEBAR
-----------------------------------*/
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

const elementToggleFunc = (elem) => elem.classList.toggle('active');

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => {
    elementToggleFunc(sidebar);
  });
}

/*-----------------------------------
  3. TESTIMONIALS (MODALE)
-----------------------------------*/
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const showTestimonialsModal = (img, title, text) => {
  if (modalImg) modalImg.src = img;
  if (modalTitle) modalTitle.innerHTML = title;
  if (modalText) modalText.innerHTML = text;
  if (modalContainer) modalContainer.classList.add('active');
  if (overlay) overlay.classList.add('active');
};

const closeTestimonialsModal = () => {
  if (modalContainer) modalContainer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
};

testimonialsItem.forEach((item) => {
  item.addEventListener('click', () => {
    const avatar = item.querySelector('[data-testimonials-avatar]').src;
    const title = item.querySelector('[data-testimonials-title]').innerHTML;
    const text = item.querySelector('[data-testimonials-text]').innerHTML;
    showTestimonialsModal(avatar, title, text);
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeTestimonialsModal);
if (overlay) overlay.addEventListener('click', closeTestimonialsModal);

/*-----------------------------------
  4. SÉLECTEUR PERSONNALISÉ (FILTRE)
-----------------------------------*/
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

if (select) {
  select.addEventListener('click', () => elementToggleFunc(select));
}

selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    const selectedValue = item.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    const category = item.dataset.category.toLowerCase();
    item.classList.toggle('active', selectedValue === 'tous' || category === selectedValue);
  });
};

let lastClickedBtn = filterBtn[0];
filterBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selectedValue = btn.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = btn.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove('active');
    btn.classList.add('active');
    lastClickedBtn = btn;
  });
});

/*-----------------------------------
  5. FORMULAIRE DE CONTACT
-----------------------------------*/
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

formInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (form) {
      formBtn.disabled = !form.checkValidity();
    }
  });
});

/*-----------------------------------
  6. NAVIGATION ENTRE LES PAGES
-----------------------------------*/
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const targetPage = link.innerHTML.toLowerCase();

    pages.forEach((page, index) => {
      const isActive = page.dataset.page === targetPage;
      page.classList.toggle('active', isActive);
      navigationLinks[index].classList.toggle('active', isActive);
    });

    window.scrollTo(0, 0);
  });
});

/*-----------------------------------
  7. POPUPS DE PROJETS (MODALES)
-----------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".view-details-btn").forEach(button => {
    button.addEventListener("click", event => {
      const projectDetails = event.target.closest(".project-card")?.querySelector(".project-details");

      if (projectDetails) {
        projectDetails.classList.toggle("active");
      }
    });
  });
});



function openProjectModal(button) {
  const projectCard = button.closest('.project-card');
  const modal = projectCard.querySelector('.project-modal');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('close-modal')) {
    const modal = e.target.closest('.project-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  if (e.target.classList.contains('project-modal')) {
    e.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});