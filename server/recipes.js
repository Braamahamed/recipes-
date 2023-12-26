const errors =require('./errors')
const {faker} = require('@faker-js/faker');
class recipesControl {
    checkvaledIngrediant(ingrediant){
        if (!ingrediant.match(/^[a-z]+$/i) ) {
            throw new errors.InvalidIngredientError()
        }
    }

    recipeContains (recipe, sensitiveIngredients){
      const ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
      return ingredients.some(ingredient => sensitiveIngredients.includes(ingredient));
    }
  
   filtered(arr){
    const filteredArr = arr.map((recipe) =>{return {title : recipe.title , thumbnail : recipe.thumbnail, href : recipe.href, ingredients: recipe.ingredients}})
    return filteredArr
  }

  addChefNames(recipe){
    return recipe.map(r =>{
    const ChefName = faker.person.firstName()
    const CheflastName =faker.person.lastName()
    r.chef = `${ChefName} ${CheflastName}`
    return r
  })
  }
   addRecipeRating(recipe){
    return recipe.map(r => {
      r.rating = 1 + Math.floor(Math.random() * 4);
      return r
    })
   }
}
module.exports = {recipesControl}