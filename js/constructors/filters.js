/**
 * 
 * @param {*} recipes 
 * @returns {Object, Object, Object} - Va return tous les objets récupérés.
 */
 const allFilters = (recipes) => {
    // 3 variables comprenant 3 tableaux qui vont stocker les valeurs de chacunes des données correspondantes.
    let allIngredients = [];
    let allUstensils = [];
    let allAppliance = [];

    recipes.forEach((recipe) => {
        // Set = Stockage de valeurs uniques en évitant les doublons.
        // Les 3 "..." vont permettre de récupérer les données de allIngredients, de recipe.ingredients en prenant l'ingredient en question.
        // .map crée un nouveau tableau avec les résultats de l'appel de recipe.ingredients.
		allIngredients = [...new Set([...allIngredients, ...recipe.ingredients.map((i) => i.ingredient)])];
		allUstensils = [...new Set([...allUstensils, ...recipe.ustensils.map((u) => u)])];
        // Pas besoin de .map pour les appareils car le .json comprends déjà un tableau d'appareils pour chaque recettes. 
		allAppliance = [...new Set([...allAppliance, ...[recipe.appliance]])];

    });
    // On return le tout
    return { allIngredients, allUstensils, allAppliance };
}