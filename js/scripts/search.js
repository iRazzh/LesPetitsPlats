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

                return asideIngredients.append(searchInputResult)
			}); 
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

                return asideApparatus.append(searchInputResult)
			}); 
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

                return asideUstensils.append(searchInputResult)
			}); 
        }
    })
}
searchInputs();

// FUNCTION RECHERCHE SEARCH BAR 
const searchBar = (recipes) => {
    const searchBarInput = document.querySelector(".searchbar--input"),
    allRecipesSection = document.querySelector(".recipes");

    searchBarInput.addEventListener("keyup", (e) => {
        if (e.target.value.length >= 3) {
            allRecipesSection.innerHTML = "";
            const query = e.target.value.toLowerCase();

            const recipes = JSON.parse(localStorage.getItem("recipes"));

			const results = recipes.filter((recipe) => {
				return (
					recipe.name.toLowerCase().startsWith(query) || recipe.description.toLowerCase().includes(query)
				);
			});
            cardRecipes(results)
        }
    })
}
searchBar();