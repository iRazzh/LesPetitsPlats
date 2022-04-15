/**
 * 
 * @param {*} recipes 
 */
const displayFilters = (recipes) => {
    const getAllFilters = allFilters(recipes);
    // .sort va trier les éléments du tableau "new Set".

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

    let ustensils = getAllFilters.allUstensils.sort();
    // Faire idem qu'au-desus


    let apparatus = getAllFilters.allAppliance.sort();
    // Faire idem



    ShowAllLists(".test--ingredient", includedIngredient, "ingredients")
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

                console.log(newElement)
                // newElement.style.visibility = "hidden";
            }
            if (classNewElt == "ustensils") {
                listFiltre.ustensil.push(newElement.textContent);

                // newElement.style.visibility = "hidden";
            }
            if (classNewElt == "apparatus") {
                listFiltre.appartus.push(newElement.textContent);

                // newElement.style.visibility = "hidden";
            }
            localStorage.setItem("listFiltre", JSON.stringify(listFiltre));
            const getAllStorageRecipes = JSON.parse(localStorage.getItem("recipes"));

            // Appelle la fonction "search" dans search.js
            search(getAllStorageRecipes, listFiltre);        

            // hideElt(newElement);
        })
        target.appendChild(newElement);
    });
}




