function search(listRecipes, listFiltres) {

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
