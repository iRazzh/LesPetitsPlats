localStorage.clear();

localStorage.setItem("recipes", JSON.stringify(recipes));

// Mets toutes les recettes en Object
let allRecipesObject = Object.entries(recipes);

// Va display toutes les recettes.
allRecipesObject.forEach(recipe => cardRecipes(recipe));

// Va afficher toutes les filtres
displayFilters(recipes);