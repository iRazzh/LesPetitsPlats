const search = (listRecipes, listFiltres) => {

    let recipesFiltered = [];

    listRecipes.forEach(recipe => {
        let verif = true;

        listFiltres.ingredient.forEach(ingredient => {
            let mapIngredient = recipe.ingredients.map((i) => i.ingredient);
            if (verif) {
                verif = mapIngredient.includes(ingredient)
            }
        })

        listFiltres.ustensil.forEach(ustensil => {
            let mapUstensil = recipe.ustensils.map((u) => u);
            if (verif) {
                verif = mapUstensil.includes(ustensil)
            }
        })

        listFiltres.appartus.forEach(appartus => {
            if (verif) {
                verif = (recipe.appliance == appartus);
            }
        })

        if (verif) {
            recipesFiltered.push(recipe);
        }
    })

    localStorage.setItem("recipes", JSON.stringify(recipesFiltered));

    document.querySelector("#allRecipes").innerHTML = "";

    // Mets toutes les recettes en Object
    let allRecipesObject = Object.entries(recipesFiltered);

    // Va display toutes les recettes.
    allRecipesObject.forEach(recipe => cardRecipes(recipe));

    // Va afficher toutes les filtres
    displayFilters(recipesFiltered);
}

// FUNCTION RECHERCHE INPUT INGREDIENTS
const searchInputs = () => {
    const inputIngredients = document.querySelector(".search-choices--input-ingredients"),
    inputApparatus = document.querySelector(".search-choices--input-apparatus"),
    inputUstensils = document.querySelector(".search-choices--input-ustensils"),
    listIngredients = document.querySelector(".search-choices__aside-ingredients"),
    listApparatus = document.querySelector(".search-choices__aside-apparatus"),
    listUstensils = document.querySelector(".search-choices__aside-ustensils");
    let asideIngredients = document.querySelector(".test--ingredient"),
    asideApparatus = document.querySelector(".test--appartus"),
    asideUstensils = document.querySelector(".test--ustensils");

    
    inputIngredients.addEventListener("keyup", (e) => {
        listIngredients.style.display = "block";
        asideIngredients.innerHTML = "";

        if(e.target.value.length >= 3) {
            // Je mets ma valeur obligatoirement en lowercase 
            const query = e.target.value.toLowerCase();
            // Je récupère la liste de tous les filtres
            const getAllFilters = allFilters(recipes);
            // Je récupère la liste de tous les filtres "ingrédients"
            const ingredients = getAllFilters.allIngredients;
            // On va filtrer parmi tous les ingrédients, celui que l'on est entrain de taper dans l'input (query)
            const results = ingredients.filter((ingredient) => {
                return ingredient.toLowerCase().includes(query);
            })
            // Pour chaque résultat, il va me les append en li
            results.forEach((result) => {
                let searchInputResult = newElt("li", {class: "ingredients"});
                searchInputResult.innerHTML = result;
                searchInputResult.addEventListener("click", function() {
                    inputIngredients.value = "";
                    addFilterAsideBar(searchInputResult.textContent, searchInputResult.className)

                    let listFiltre = JSON.parse(localStorage.getItem("listFiltre"));
                    let classNewElt = searchInputResult.className;
                    // 2 - Mettre dans LocalStorage ce qu'on a push
                    if (classNewElt == "ingredients") {
                        listFiltre.ingredient.push(searchInputResult.textContent);
                    }
                    if (classNewElt == "ustensils") {
                        listFiltre.ustensil.push(searchInputResult.textContent);
                    }
                    if (classNewElt == "apparatus") {
                        listFiltre.appartus.push(searchInputResult.textContent);
                    }
                    localStorage.setItem("listFiltre", JSON.stringify(listFiltre));
                    const getAllStorageRecipes = JSON.parse(localStorage.getItem("recipes"));

                    // Appelle la fonction "search" dans search.js
                    search(getAllStorageRecipes, listFiltre);


                })
                return asideIngredients.append(searchInputResult)
			}); 
        } else {
            const getAllStorageRecipes = JSON.parse(localStorage.getItem("recipes"));
            let listFiltre = JSON.parse(localStorage.getItem("listFiltre"));
            search(getAllStorageRecipes, listFiltre);
        }
    })

    inputApparatus.addEventListener("keyup", (e) => {
        listApparatus.style.display = "block";
        asideApparatus.innerHTML = "";

        if(e.target.value.length >= 3) {
            // Je mets ma valeur obligatoirement en lowercase 
            const query = e.target.value.toLowerCase();
            // Je récupère la liste de tous les filtres
            const getAllFilters = allFilters(recipes);
            // Je récupère la liste de tous les filtres "apparatus"
            const apparatus = getAllFilters.allAppliance;
            // On va filtrer parmi tous les ingrédients, celui que l'on est entrain de taper dans l'input (query)
            const results = apparatus.filter((apparatus) => {
                return apparatus.toLowerCase().includes(query);
            })
            // Pour chaque résultat, il va me les append en li
            results.forEach((result) => {
                let searchInputResult = newElt("li", {class: "apparatus"});
                searchInputResult.innerHTML = result;
                searchInputResult.addEventListener("click", function() {
                    inputApparatus.value = "";
                    addFilterAsideBar(searchInputResult.textContent, searchInputResult.className)

                    let listFiltre = JSON.parse(localStorage.getItem("listFiltre"));
                    let classNewElt = searchInputResult.className;
                    // 2 - Mettre dans LocalStorage ce qu'on a push
                    if (classNewElt == "ingredients") {
                        listFiltre.ingredient.push(searchInputResult.textContent);
                    }
                    if (classNewElt == "ustensils") {
                        listFiltre.ustensil.push(searchInputResult.textContent);
                    }
                    if (classNewElt == "apparatus") {
                        listFiltre.appartus.push(searchInputResult.textContent);
                    }
                    localStorage.setItem("listFiltre", JSON.stringify(listFiltre));
                    const getAllStorageRecipes = JSON.parse(localStorage.getItem("recipes"));

                    // Appelle la fonction "search" dans search.js
                    search(getAllStorageRecipes, listFiltre);


                })
                return asideApparatus.append(searchInputResult)
			}); 
        } else {
            const getAllStorageRecipes = JSON.parse(localStorage.getItem("recipes"));
            let listFiltre = JSON.parse(localStorage.getItem("listFiltre"));
            search(getAllStorageRecipes, listFiltre);
        }
    })

    inputUstensils.addEventListener("keyup", (e) => {
        listUstensils.style.display = "block";
        asideUstensils.innerHTML = "";

        if(e.target.value.length >= 3) {
            // Je mets ma valeur obligatoirement en lowercase 
            const query = e.target.value.toLowerCase();
            // Je récupère la liste de tous les filtres
            const getAllFilters = allFilters(recipes);
            // Je récupère la liste de tous les filtres "ustensils"
            const ustensils = getAllFilters.allUstensils;
            // On va filtrer parmi tous les ingrédients, celui que l'on est entrain de taper dans l'input (query)
            const results = ustensils.filter((ustensil) => {
                return ustensil.toLowerCase().includes(query);
            })
            // Pour chaque résultat, il va me les append en li
            results.forEach((result) => {
                let searchInputResult = newElt("li", {class: "ustensils"});
                searchInputResult.innerHTML = result;
                searchInputResult.addEventListener("click", function() {
                    inputUstensils.value = "";

                    addFilterAsideBar(searchInputResult.textContent, searchInputResult.className)

                    let listFiltre = JSON.parse(localStorage.getItem("listFiltre"));
                    let classNewElt = searchInputResult.className;
                    // 2 - Mettre dans LocalStorage ce qu'on a push
                    if (classNewElt == "ingredients") {
                        listFiltre.ingredient.push(searchInputResult.textContent);
                    }
                    if (classNewElt == "ustensils") {
                        listFiltre.ustensil.push(searchInputResult.textContent);
                    }
                    if (classNewElt == "apparatus") {
                        listFiltre.appartus.push(searchInputResult.textContent);
                    }
                    localStorage.setItem("listFiltre", JSON.stringify(listFiltre));
                    const getAllStorageRecipes = JSON.parse(localStorage.getItem("recipes"));

                    // Appelle la fonction "search" dans search.js
                    search(getAllStorageRecipes, listFiltre);


                })
                return asideUstensils.append(searchInputResult)
			}); 
        } else {
            const getAllStorageRecipes = JSON.parse(localStorage.getItem("recipes"));
            let listFiltre = JSON.parse(localStorage.getItem("listFiltre"));
            search(getAllStorageRecipes, listFiltre);

        }
    })
}
searchInputs();

// 2ND VERSION SEARCH BAR | ALGO
const searchBarSecond = () => {
    const searchBarInput = document.querySelector(".searchbar--input");
    const allRecipesSection = document.querySelector(".recipes");

    searchBarInput.addEventListener("keyup", (e) => {
        if (e.target.value.length >= 3) {
            allRecipesSection.innerHTML = "";
            const query = e.target.value;
            const queryLower = query.toLowerCase();
            const recipes = JSON.parse(localStorage.getItem("recipes"));

            const results = recipes.filter((recipe) => {
                if (recipe.name.toLowerCase().includes(queryLower) === true) {
                    return recipe.name;
                }
                else if (recipe.description.toLowerCase().includes(queryLower) === true) {
                    return recipe.description;
                }
            });

            for (let i = 0; i < results.length; i++){
                cardRecipes(["", results[i]])
            }
        } else {
            let listFiltre = JSON.parse(localStorage.getItem("listFiltre"));
            const getAllStorageRecipes = JSON.parse(localStorage.getItem("recipes"));
            search(getAllStorageRecipes, listFiltre);
        }
    })
}
searchBarSecond();