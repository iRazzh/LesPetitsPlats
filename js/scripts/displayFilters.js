/**
 * 
 * @param {*} recipes 
 */
const displayFilters = (recipes) => {
    const getAllFilters = allFilters(recipes);

    if (localStorage.getItem("listFiltre") === null) {
        let tableau = {
            ingredient : [],
            ustensil : [],
            appartus : [],
        }
        
        localStorage.setItem("listFiltre", JSON.stringify(tableau));
    } 

    const listFiltre = JSON.parse(localStorage.getItem("listFiltre"));

    let ingredients = getAllFilters.allIngredients.sort();
    let includedIngredient = [];
    ingredients.forEach((i) => {
        if(!listFiltre.ingredient.includes(i)) {
            includedIngredient.push(i);
        }
    })
    let apparatus = getAllFilters.allAppliance.sort();
    let includedApparatus = [];
    apparatus.forEach((i) => {
        if(!listFiltre.appartus.includes(i)) {
            includedApparatus.push(i);
        }
    })
    let ustensils = getAllFilters.allUstensils.sort();
    let includedUstensils = [];
    ustensils.forEach((i) => {
        if(!listFiltre.ustensil.includes(i)) {
            includedUstensils.push(i);
        }
    })
    ShowAllLists(".test--ingredient", includedIngredient, "ingredients")
    ShowAllLists(".test--appartus", includedApparatus, "apparatus")
    ShowAllLists(".test--ustensils", includedUstensils, "ustensils")
}

/**
 * Va permettre de montrer toutes les listes de manière optimisée. 
 * @param {String} targetClass - class cible. 
 * @param {String} list - list .json
 * @param {String} eltClass - class de l'élément.
 */
const ShowAllLists = (targetClass, list, eltClass) => {
    const target = document.querySelector(targetClass);
    target.innerHTML = "";

    list.forEach((thing) => {
        let newElement = newElt("li", {class: eltClass})
        newElement.innerHTML = thing;

        newElement.addEventListener("click", () => {
            // 1 - Mets le petit élément dans l'aside (élément qu'on a choisi)
            addFilterAsideBar(newElement.textContent, newElement.className)

            let listFiltre = JSON.parse(localStorage.getItem("listFiltre"));
            let classNewElt = newElement.className;
            // 2 - Mettre dans LocalStorage ce qu'on a push
            if (classNewElt == "ingredients") {
                listFiltre.ingredient.push(newElement.textContent);
            }
            if (classNewElt == "ustensils") {
                listFiltre.ustensil.push(newElement.textContent);
            }
            if (classNewElt == "apparatus") {
                listFiltre.appartus.push(newElement.textContent);
            }
            localStorage.setItem("listFiltre", JSON.stringify(listFiltre));
            const getAllStorageRecipes = JSON.parse(localStorage.getItem("recipes"));

            // Appelle la fonction "search" dans search.js
            search(getAllStorageRecipes, listFiltre);
        })
        target.appendChild(newElement);
    });
}