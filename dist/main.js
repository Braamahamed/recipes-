const renderer = new Render()

const ingredientInput =$('#ingredientInput')
const glutenFreeCheckbox = $('#glutenFreeCheckbox')
const dairyFreeCheckbox = $('#dairyFreeCheckbox')
const recipeList = $("#recipeList")
const text = '<p>No recipes found for this ingredient</p>'
let storerecipes = []
let page = 0
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
        page = 0
        storerecipes = response.recipes
        console.log(storerecipes)
        renderer.displayRecipes(response.recipes.slice(0,5));
      }
    }).catch((error)=>{
    alert(error.responseJSON.Error)
   })
  }

  recipeList.on("click", ".share", function(event){
    event.preventDefault()
    const recipeName = $(this).data('title')
    const videoLink = $(this).data('videoLink')
    const emailSubject = `Check out this recipe! ${recipeName}`
    const emilBody = `You can see the recipe in this video: ${videoLink}`
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emilBody)}`
    window.location.href = mailtoLink
  })


recipeList.on("click",".recipe-img",function() {
let firstIngredient = $(this).siblings('ul').find('li:first').text();
alert('First Ingredient: ' + firstIngredient);
})

const nav_next = function(){
  page++
  renderer.displayRecipes(storerecipes.slice(page*5,(page+1)*5))
}

const nav_pre = function(){
  page--
  renderer.displayRecipes(storerecipes.slice(page*5,(page+1)*5))
} 
// let currentPage = 1

// $('#pretPage').on('click', function(){
//   if (currentPage > 1){
//     currentPage --
//     loadRecipes();
//   }
// })

// $('#nextPage').on('click', function(){
//   if (currentPage < totalPages){
//     currentPage ++
//     loadRecipes();
//   }
// })

// function loadRecipes(){
//   let aa = ingredientInput.val()
//   let bb = glutenFreeCheckbox.is(':checked');
//   let cc = dairyFreeCheckbox.is(':checked');}
//   let url = `/recipes/${aa}?glutenFree=${bb}&dairyFree=${cc}`;

//   $.get(url).then((response) => {
//     if (response.recipes.length > 0) {
//       renderer.displayRecipes(response);
//     } 
//   }).catch((error)=>{
//   alert(error.responseJSON.Error)
//  })











