(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const text = "Hinweis: Diese Inhalte wurden mit Unterstützung von Künstlicher Intelligenz erstellt und redaktionell überprüft (Transparenzhinweis gemäß Art. 50 EU AI Act).";

    const machHinweis = (id) => {
        const p = document.createElement("p");
        p.id = id;
        p.textContent = text;
        p.style.fontSize = "0.85em";
        p.style.opacity = "0.7";
        p.style.fontStyle = "italic";
        p.style.margin = "0 0 1.5em 0";
        return p;
    };

    main.insertBefore(machHinweis("ki-hinweis-oben"), main.firstChild);
    main.appendChild(machHinweis("ki-hinweis-unten"));
})();
