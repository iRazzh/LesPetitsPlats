const addFilterAsideBar = (content, className) => {
    const filterAside = document.querySelector(".filter");

    // Il va me crée l'image
    const filterSelectedImg = `img/circle-xmark-solid.svg`;
    let filterSelectedAsideImg = newElt("img", {class: "test", src: `${filterSelectedImg}`});
    // Il me crée la div qui va englober l'image + le filtre choisit
    let filterSelectedAside = newElt("div", {class: "filter--researched-" + className});
    // La div va inner le filtre en question
    filterSelectedAside.innerHTML = content;
    // La div ayant inner le filtre va append l'image en plus.
    filterSelectedAside.appendChild(filterSelectedAsideImg);
    // La section qui append la div de l'ingrédient choisit. 
    filterAside.appendChild(filterSelectedAside);
}

// Faire le remove (addEventListenenr)

// Enlever le filtre qu'on a cliqué dans le localStorage (récupère le textContent qu'on a dedans, et la className)
// Appeler la function search (liste complète des recettes)
// Effacer le badge