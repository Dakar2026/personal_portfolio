/* ==================================
   1. MENU MOBILE
================================== */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

/* ==================================
   2. FILTRAGE DES PROJETS
================================== */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach((card) => {
            const technology = card.dataset.tech;
            const shouldShow =
                filter === "tous" || technology === filter;

            card.classList.toggle("hidden", !shouldShow);
        });
    });
});

/* ==================================
   3. VALIDATION DU FORMULAIRE
================================== */
const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#nom");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const feedback = document.querySelector("#form-feedback");

function showError(input, errorId, message) {
    document.querySelector(#${errorId}).textContent = message;
    input.classList.toggle("invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
}

function validateName() {
    const name = nameInput.value.trim();

    if (name.length < 2) {
        showError(nameInput, "nom-error", "Entrez un nom d'au moins 2 caractères.");
        return false;
    }

    showError(nameInput, "nom-error", "");
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showError(emailInput, "email-error", "Entrez une adresse e-mail valide.");
        return false;
    }

    showError(emailInput, "email-error", "");
    return true;
}

function validateMessage() {
    const message = messageInput.value.trim();

    if (message.length < 10) {
        showError(
            messageInput,
            "message-error",
            "Le message doit contenir au moins 10 caractères."
        );
        return false;
    }

    showError(messageInput, "message-error", "");
    return true;
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const messageIsValid = validateMessage();

    if (!nameIsValid || !emailIsValid || !messageIsValid) {
        feedback.textContent = "Veuillez corriger les champs indiqués.";
        feedback.style.color = "#fb7185";
        return;
    }

    feedback.textContent =
        "Formulaire valide ! Pour recevoir les messages, il faudra connecter un service d'envoi.";
    feedback.style.color = "#22d3ee";
});

/* ==================================
   4. ANIMATIONS AU DÉFILEMENT
================================== */
const revealElements = document.querySelectorAll(
    ".section-title, .about-content, .skill-card, .project-card, #contact-form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

/* ==================================
   5. SECTION ACTIVE DANS LA NAVIGATION
================================== */
const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
    let currentSection = "accueil";

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 150) {
            currentSection = section.id;
        }
    });

    navItems.forEach((link) => {
        const isActive = link.getAttribute("href") === #${currentSection};

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

/* ==================================
   6. ANNÉE AUTOMATIQUE
================================== */
document.querySelector("#year").textContent = new Date().getFullYear();

/* ==================================
   7. MODE CLAIR / MODE SOMBRE
================================== */
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

/* ==================================
   8. EFFET MACHINE À ÉCRIRE
================================== */
const heroTitle = document.querySelector(".hero h2");
const originalTitle = heroTitle.textContent;
let characterIndex = 0;

heroTitle.textContent = "";

function typeTitle() {
    if (characterIndex < originalTitle.length) {
        heroTitle.textContent += originalTitle.charAt(characterIndex);
        characterIndex++;
        setTimeout(typeTitle, 65);
    }
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typeTitle();
} else {
    heroTitle.textContent = originalTitle;
}