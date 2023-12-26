const express = require('express')
const axios = require('axios')
const errors =require('./errors')
const {dairyIngredients , glutenIngredients, RECIPES_URL} = require ('../config')
const filterRecipes = require('./recipes')
const recipesControl = new filterRecipes.recipesControl()
const router = express.Router()

router.get('/recipes/:ingredient', async (req, res) => {
    const ingredient = req.params.ingredient
    const apiUrl =  RECIPES_URL+ingredient;
    try {
        recipesControl.checkvaledIngrediant(ingredient)
    } catch (error) {
        if(error instanceof errors.InvalidIngredientError){
            res.status(409).send({"Error": `${ingredient} is not a valid ingrediant`})
            return
        }
    }

    axios.get(apiUrl)
    .then(function (response) {
      const responseData = response.data;      
      let recipes = recipesControl.filtered(responseData.results)
      recipes = recipesControl.addChefNames(recipes)
      recipes = recipesControl.addRecipeRating(recipes)
      const glutenFree = req.query.glutenFree === 'true';
      const dairyFree = req.query.dairyFree === 'true';
      const filteredRecipes = recipes.filter(recipe => {
        if (glutenFree && recipesControl.recipeContains(recipe, dairyIngredients)) {
          return false;
        }
  
        if (dairyFree && recipesControl.recipeContains(recipe, glutenIngredients)) {
          return false;
        }
        return true;
      }) 
      console.log(filterRecipes)
      res.status(200).json({recipes: filteredRecipes})  
    })
    .catch(function (error) {
      res.status(500).end()
    })
    
  })

module.exports = router