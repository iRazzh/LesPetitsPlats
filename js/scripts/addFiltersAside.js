const addFilterAsideBar = (content, className) => {
    const filterAside = document.querySelector(".filter");
    // Il va me crée l'image
    const filterSelectedImg = `img/circle-xmark-solid.svg`;
    let filterSelectedAsideImg = newElt("img", {class: "removeCroix", src: `${filterSelectedImg}`});
    // Il me crée la div qui va englober l'image + le filtre choisit
    let filterSelectedAside = newElt("div", {class: "filter--researched-" + className});
    // La div va inner le filtre en question
    filterSelectedAside.innerHTML = content;
    // La div ayant inner le filtre va append l'image en plus.
    filterSelectedAside.appendChild(filterSelectedAsideImg);
    // La section qui append la div de l'ingrédient choisit. 
    filterAside.appendChild(filterSelectedAside);
    // Va permettre de remove le filtre en question du localStorage + asideBar au click.
    filterSelectedAsideImg.addEventListener("click", function() {
        removeFiltersAside(content, className);
        // Récupère le parentNode pour le virer au click.
        let parent = this.parentNode;    
        parent.remove(filterSelectedAside);
    })
}

const removeFiltersAside = (content, className) => {
    const getStorage = JSON.parse(localStorage.getItem("listFiltre"));

    let resultat = {
        ingredient : [],
        ustensil : [],
        appartus : [],
    };

    if (className == "ingredients") {
        resultat.ustensil = getStorage.ustensil;
        resultat.appartus = getStorage.appartus;
        getStorage.ingredient.forEach((f) => {
            if (f != content) {
                resultat.ingredient.push(f);
            }
        })
    }
    if (className == "ustensils") {
        resultat.ingredient = getStorage.ingredient;
        resultat.appartus = getStorage.appartus;
        getStorage.ustensil.forEach((f) => {
            if (f != content) {
                resultat.ustensil.push(f);
            }
        })
    }
    if (className == "apparatus") {
        resultat.ustensil = getStorage.ustensil;
        resultat.ingredient = getStorage.ingredient;
        getStorage.appartus.forEach((f) => {
            if (f != content) {
                resultat.appartus.push(f);
            }
        })
    }
    localStorage.setItem("listFiltre", JSON.stringify(resultat));
    search(recipes, resultat)
}