const errors =require('./errors')
const dairyIngredients = ["cream","cheese","milk","butter","creme","ricotta","mozzarella","custard","cream cheese"]
const glutenIngredients = ["flour","bread","spaghetti","biscuits","beer"]
class recipesController {
    checkIngrediants(ingrediant){
        if (!ingrediant.match(/^[a-z]+$/i) ) {
            throw new errors.InvalidIngredientError()
        }
    }
    filterRecipes(recipes, glutenFree, dairyFree){
        const filteredRecipes= {recipes :this.filtered(recipes) }
        if(glutenFree=== "true"){
            this.filterGlutenFree(filteredRecipes)
        }
        if(dairyFree === "true"){
            this.filterDairyFree(filteredRecipes)
        }
        return filteredRecipes
    }
    filtered(arr){
        const filteredArr = arr.map((recipe) =>{return {idMeal : recipe.idMeal , title : recipe.title , thumbnail : recipe.thumbnail, href : recipe.href, ingredients: recipe.ingredients}})
        return filteredArr
    }
    filterGlutenFree(recipes){
        const glutenFreeArray =[]
        for(let i=0 ; i<recipes.recipes.length; i++)
        {
            const ingredients = recipes.recipes[i].ingredients.map(ingredient => ingredient.toLowerCase())
            const contains = ingredients.some(element => {
            return glutenIngredients.indexOf(element) !== -1;
            })
            if(!contains){
                glutenFreeArray.push(recipes.recipes[i])
            }
        }
        recipes.recipes = glutenFreeArray
    }
     filterDairyFree(recipes){
        const dairyFreeArray = []
        for(let i=0 ; i<recipes.recipes.length; i++)
        {
            const ingredients = recipes.recipes[i].ingredients.map(ingredient => ingredient.toLowerCase())
            const contains = ingredients.some(element => {
            return dairyIngredients.indexOf(element) !== -1;
            })
            if(!contains){
                dairyFreeArray.push(recipes.recipes[i])
            }
        }
        recipes.recipes = dairyFreeArray
    }
}
module.exports = {recipesController}