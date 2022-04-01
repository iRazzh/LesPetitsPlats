/**
 * 
 * @param {*} recipes 
 */
const displayFilters = (recipes) => {
    const getAllFilters = allFilters(recipes);
    // .sort va trier les éléments du tableau "new Set".
    const ingredients = getAllFilters.allIngredients.sort();
    const ustensils = getAllFilters.allUstensils.sort();
    const apparatus = getAllFilters.allAppliance.sort();

    ShowAllLists(".test--ingredient", ingredients, "ingredients")
    ShowAllLists(".test--ustensils", ustensils, "ustensils")
    ShowAllLists(".test--appartus", apparatus, "apparatus")
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

    // Est-ce que l'élément en question n'est pas déjà dans listFiltre

    list.forEach((thing) => {
        let newElement = newElt("li", {class: eltClass})
        newElement.innerHTML = thing;

        newElement.addEventListener("click", () => {
            // 1 - Mets le petit élément dans l'aside (élément qu'on a choisi)
            addFilterAsideBar(newElement.textContent, newElement.className)

            if (localStorage.getItem("listFiltre") === null) {
                let tableau = {
                    ingredient : [],
                    ustensil : [],
                    appartus : [],
                }

                localStorage.setItem("listFiltre", JSON.stringify(tableau));
            } 
            let listFiltre = JSON.parse(localStorage.getItem("listFiltre"));
            console.log(listFiltre);

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
            search(getAllStorageRecipes, listFiltre)

        })

        target.appendChild(newElement);
    });
}




