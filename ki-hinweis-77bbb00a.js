(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const hinweis = document.createElement("p");
    hinweis.id = "ki-hinweis";
    hinweis.textContent = "Erstellt mit Unterstützung von KI";
    hinweis.style.fontSize = "0.85em";
    hinweis.style.opacity = "0.7";
    hinweis.style.fontStyle = "italic";
    hinweis.style.margin = "0 0 1.5em 0";

    main.insertBefore(hinweis, main.firstChild);
})();
