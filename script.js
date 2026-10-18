
const menuButton = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open or close the mobile menu
menuButton.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the menu when a navigation link is clicked
const links = navLinks.querySelectorAll("a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    });
});

// Automatically update the year in the footer
const yearElement = document.getElementById("year");
yearElement.textContent = new Date().getFullYear();
