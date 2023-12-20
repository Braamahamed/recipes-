const express = require('express')
const axios = require('axios')
// const errors =require('./errors')
const filterRecipes = require('./recipes')
const recipesControl = new filterRecipes.recipesControl()
const router = express.Router()
const RECIPES_URL = 'https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/'

const dairyIngredients = ["cream", "cheese", "milk", "butter", "creme", "ricotta", "mozzarella", "custard", "cream cheese","condensed milk","heavy cream"];
const glutenIngredients = ["flour", "bread", "spaghetti", "biscuits", "beer"];

router.get('/recipes/:ingredient', async (req, res) => {
    const ingredient = req.params.ingredient
    const apiUrl =  RECIPES_URL+ingredient;
  
    axios.get(apiUrl)
    .then(function (response) {
      const responseData = response.data;
      const recipes = recipesControl.filtered(responseData.results)
      const glutenFree = req.query.glutenFree === 'true';
      const dairyFree = req.query.dairyFree === 'true';
      const filteredRecipes = recipes.filter(recipe => {
        if (glutenFree && recipesControl.recipeContainsGluten(recipe)) {
          return false;
        }
  
        if (dairyFree && recipesControl.recipeContainsDairy(recipe)) {
          return false;
        }
  
        return true;
      })
      console.log(filteredRecipes)
      res.status(200).json({recipes: filteredRecipes})
  
    })
    .catch(function (error) {
      console.log(error)
      res.status(500).end()
    })
    
  })

module.exports = router