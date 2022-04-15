const btnOpenIngredient = document.querySelector(".search-choices--btn-chevron-ingredients");
const btnOpenApparatus = document.querySelector(".search-choices--btn-chevron-apparatus");
const btnOpenUstensil = document.querySelector(".search-choices--btn-chevron-ustensils");
const filtersIngredient = document.querySelector(".search-choices__aside-ingredients");
const filtersApparatus = document.querySelector(".search-choices__aside-apparatus");
const filtersUstensil = document.querySelector(".search-choices__aside-ustensils");

function displayClick(element, asideElt) {
    element.addEventListener("click", function(e){
        e.preventDefault();
        if(asideElt.style.display === "block"){
            asideElt.style.display = "none";
        } else {
            asideElt.style.display = "block";
        }
    })
}

displayClick(btnOpenIngredient, filtersIngredient);
displayClick(btnOpenApparatus, filtersApparatus);
displayClick(btnOpenUstensil, filtersUstensil);