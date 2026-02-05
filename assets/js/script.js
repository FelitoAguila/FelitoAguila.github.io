'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// ============================================
// PROJECT MODAL FUNCTIONALITY (CORREGIDO CON VALIDACIONES)
// ============================================

// Variables del modal de proyectos
const projectList = document.querySelector(".project-list");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");

// Variables del contenido del modal (dentro del contenedor del modal de proyectos)
const projectModalImg = projectModalContainer?.querySelector("[data-project-modal-img]");
const projectModalTitle = projectModalContainer?.querySelector("[data-project-modal-title]");
const projectModalText = projectModalContainer?.querySelector("[data-project-modal-text]");

// ✅ VALIDACIÓN: Solo ejecutar si todos los elementos existen
if (projectList && projectModalContainer && projectModalCloseBtn && projectOverlay && 
    projectModalImg && projectModalTitle && projectModalText) {
  
  // Función para abrir/cerrar el modal de proyectos
  const projectModalFunc = function () {
    projectModalContainer.classList.toggle("active");
    projectOverlay.classList.toggle("active");
  }

  // Delegación de eventos: un solo listener en la lista de proyectos
  projectList.addEventListener("click", function (e) {
    // Usar .project-item (li) para capturar todo el card, incluyendo el div oculto
    const projectCard = e.target.closest(".project-item");
    if (!projectCard) return;
    
    e.preventDefault();
    
    // Obtener la imagen del proyecto
    const imgElement = projectCard.querySelector("[data-project-img]");
    if (imgElement) {
      projectModalImg.src = imgElement.src;
      projectModalImg.alt = imgElement.alt;
    }
    
    // Obtener el título del proyecto
    const titleElement = projectCard.querySelector("[data-project-title]");
    if (titleElement) {
      projectModalTitle.innerHTML = titleElement.innerHTML;
    }
    
    // Obtener los detalles del proyecto (ocultos en el HTML)
    const detailsElement = projectCard.querySelector("[data-project-details]");
    if (detailsElement) {
      projectModalText.innerHTML = detailsElement.innerHTML;
    } else {
      projectModalText.innerHTML = "<p>No hay detalles disponibles para este proyecto.</p>";
    }
    
    // Abrir el modal
    projectModalFunc();
  });

  // Cerrar modal al hacer click en el botón de cerrar
  projectModalCloseBtn.addEventListener("click", projectModalFunc);

  // Cerrar modal al hacer click en el overlay
  projectOverlay.addEventListener("click", projectModalFunc);

} else {
  // ⚠️ Mostrar mensaje de error en consola si faltan elementos
  console.error("❌ PROJECT MODAL ERROR: No se encontraron todos los elementos del modal.");
  console.log("Elementos encontrados:");
  console.log("- projectList:", projectList);
  console.log("- projectModalContainer:", projectModalContainer);
  console.log("- projectModalCloseBtn:", projectModalCloseBtn);
  console.log("- projectOverlay:", projectOverlay);
  console.log("- projectModalImg:", projectModalImg);
  console.log("- projectModalTitle:", projectModalTitle);
  console.log("- projectModalText:", projectModalText);
  console.log("\n💡 SOLUCIÓN: Verifica que el modal y .project-list estén en el HTML con los atributos data-* correctos.");
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // ⛔ evita salir de la página

  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      form.reset();
      formBtn.setAttribute("disabled", "");
      showSuccessMessage();
    } else {
      showErrorMessage();
    }
  })
  .catch(() => {
    showErrorMessage();
  });
});

function showSuccessMessage() {
  const message = document.createElement("p");
  message.className = "form-success";
  message.textContent = "Thanks for your message! I'll get back to you soon 🙂";

  form.appendChild(message);
}

function showErrorMessage() {
  const message = document.createElement("p");
  message.className = "form-error";
  message.textContent = "Oops! Something went wrong. Please try again.";

  form.appendChild(message);
}




// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}