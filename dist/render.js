class Render {

    displayRecipes(recipes){
      $("#recipeList").empty()
      const source = $('#recipe-template').html()
      const template = Handlebars.compile(source)
      let newHTML = template (recipes)
      $("#recipeList").append(newHTML)
    }
}  

