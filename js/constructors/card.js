// Va me permettre de créer tous les éléments du DOM | Helper function
const newElt = (elm, attributes) => {
    const element = document.createElement(elm);
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
    return element;
}

// Construction de la carte d'une recette
let cardRecipes = (recipe) => {
    // Construis le fond gris
    let img = newElt("div", {class: "recipes--article__bg-grey", alt: "Image d'une carte"});
    
    // Construis le titre
    let title = newElt("h2", {class: "recipes--article__section-description--header__title"});
    title.innerHTML = recipe[1].name;
    
    // Construis le timer
    const pictureImg = `img/clock-solid.svg`;
    let timer = newElt("div", {class: "recipes--article__section-description--header__block"});
    timer.innerHTML = `<p class="recipes--article__section-description--header__block--timer">${recipe[1].time} min</p>` + `<img src="${pictureImg}" alt="Picto d'une horloge">`
    
    // Section header en appendChild le titre & timer
    let header = newElt("header", {class: "recipes--article__section-description--header"});
    header.appendChild(title);
    header.appendChild(timer);
    
    // Section ingredients en appendChild tous les ingrédients
    let ingredients = newElt("ul", {class: "recipes--article__section-description--aside__list"})
    
    // Tous les ingrédients avec 3 conditions
    let eachIngredients = recipe[1].ingredients.map(function(ingredients) {

        let quantityObject = Object.prototype.hasOwnProperty.call(ingredients, "quantity");
        let unitObject = Object.prototype.hasOwnProperty.call(ingredients, "unit");

        let quantityUnitStr = "";

        if (quantityObject && unitObject) {
            quantityUnitStr = `: ${ingredients.quantity} ${ingredients.unit}`;
        } else if (quantityObject && !unitObject) {
            quantityUnitStr = `: ${ingredients.quantity}`;
        }
        return `<li class="recipes--article__section-description--aside__list--all"><span class="recipes--article__section-description--aside__list--all__name">${ingredients.ingredient}</span>${quantityUnitStr}</li>`
    }).join("");
    
    // La section "ingredients" innerHTML tous les ingrédients
    ingredients.innerHTML = eachIngredients;

    // Construis la description 
    let description = newElt("p", {class: "recipes--article__section-description--aside__content"});
    description.textContent = recipe[1].description;

    // Construis les appareils | A MODIFIER LA CLASS POUR LE CSS
    let appliance = newElt("p", {class: "recipes--appliance"});
    appliance.textContent = recipe[1].appliance;

    // Section ustensils | A MODIFIER LA CLASS POUR LE CSS
    let ustensils = newElt("div", {class: "recipes--ustensils--section"})

    // Chaque ustensils 
    let eachUstensils = recipe[1].ustensils.map(function(ustensil) {
        return `<p class="recipe-ustensil">${ustensil}</p>`;
    }).join("");

    // La section "ustensils" innerHTML tous les ustensils.
    ustensils.innerHTML = eachUstensils;

    // Section aside qui appendChild les ingrédients, la description, les appareils et les ustensils
    let asideContent = newElt("aside", {class: "recipes--article__section-description--aside"});
    asideContent.appendChild(ingredients);
    asideContent.appendChild(description);
    asideContent.appendChild(appliance);
    asideContent.appendChild(ustensils);

    // Section qui regroupe tout le body de la carte
    let bodyContent = newElt("div", {class: "recipes--article__section-description"});
    bodyContent.appendChild(header);
    bodyContent.appendChild(asideContent);

    // Article qui appendChild tout ça 
    let articleContent = newElt("article", {class: "recipes--article"});
    articleContent.appendChild(img);
    articleContent.appendChild(bodyContent);
    
    // Section qui englobe tout des cartes 
    let sectionRecipes = document.getElementById("allRecipes");
    sectionRecipes.appendChild(articleContent);
}