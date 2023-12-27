const errors =require('./errors')
const {faker} = require('@faker-js/faker');
const axios = require ('axios')
class recipesControl {
    // async getGiphyGif(word){
    //   const apiKey = "5eYX6PAcEMvuQsK7gx7dbLatUOHaSVQp"
    //   const url = `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${word}&rating=g`

    //   try {
    //     const response = await axios.get(url)
    //     return response.data.data.image_url
    //   } catch(error){
    //     console.error("Error fetching the GIF:", error)
    //     return null
    //   }
    // }

    // async replaceImgWithGif(recipes){
    //   for (let i=0; i < recipes.length; i++){
    //   const word = 'milk'
    //   const gifUrl = await this.getGiphyGif(word)
    //   if (gifUrl){
    //     recipes[i].thumbnail = gifUrl
    //   }
    //   }
    //   return recipes
    // }

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