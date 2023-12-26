const renderer = new Render()

const ingredientInput =$('#ingredientInput')
const glutenFreeCheckbox = $('#glutenFreeCheckbox')
const dairyFreeCheckbox = $('#dairyFreeCheckbox')
const recipeList = $("#recipeList")
const text = '<p>No recipes found for this ingredient</p>'

function search(){
    const ingredient = ingredientInput.val()
    const glutenFree = glutenFreeCheckbox.is(':checked');
    const dairyFree = dairyFreeCheckbox.is(':checked');

  const url = `/recipes/${ingredient}?glutenFree=${glutenFree}&dairyFree=${dairyFree}`;
     
    $.get(url).then((response) => {
      if (response.recipes.length === 0) {
        recipeList.empty()
        recipeList.html(text);
      } else {
        renderer.displayRecipes(response);
      }
    }).catch((error)=>{
    alert(error.responseJSON.Error)
   })
  }



recipeList.on("click",".recipe-img",function() {
let firstIngredient = $(this).siblings('ul').find('li:first').text();
alert('First Ingredient: ' + firstIngredient);
})


