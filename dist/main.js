const renderer = new Render()

function search(){
    let ingredient = $('#ingredientInput').val()
    const glutenFree = $('#glutenFreeCheckbox').is(':checked');
    const dairyFree = $('#dairyFreeCheckbox').is(':checked');

  let url = `/recipes/${ingredient}?glutenFree=${glutenFree}&dairyFree=${dairyFree}`;
     
    $.get(url).then((response) => {
      if (response.recipes.length === 0) {
        $("#recipeList").empty()
        $('#recipeList').html('<p>No recipes found for this ingredient</p>');
      } else {
        renderer.displayRecipes(response);
      }
    }).catch((error)=>{
    alert(error.responseJSON.Error)
   })
  }



$('#recipeList').on("click",".recipe-img",function() {
let firstIngredient = $(this).siblings('ul').find('li:first').text();
alert('First Ingredient: ' + firstIngredient);
})


