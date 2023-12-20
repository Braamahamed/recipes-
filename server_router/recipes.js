const errors =require('./errors')
const dairyIngredients = ["cream","cheese","milk","butter","creme","ricotta","mozzarella","custard","cream cheese"]
const glutenIngredients = ["flour","bread","spaghetti","biscuits","beer"]
class recipesControl {
    checkvaledIngrediant(ingrediant){
        if (!ingrediant.match(/^[a-z]+$/i) ) {
            throw new errors.InvalidIngredientError()
        }
    }
  
   recipeContainsGluten(recipe) {
    const ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
    return ingredients.some(ingredient => glutenIngredients.includes(ingredient));
  }
  
   recipeContainsDairy(recipe) {
    const ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
    return ingredients.some(ingredient => dairyIngredients.includes(ingredient));
  }
  
   filtered(arr){
    const filteredArr = arr.map((recipe) =>{return {title : recipe.title , thumbnail : recipe.thumbnail, href : recipe.href, ingredients: recipe.ingredients}})
    return filteredArr
  }
}
module.exports = {recipesControl}