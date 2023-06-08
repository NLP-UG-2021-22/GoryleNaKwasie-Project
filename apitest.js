console.log("food api test");

const ingForm = document.getElementById('ingForm');
const ingName = document.getElementById('ingName');

const ingInfo = document.getElementById('ingInfo');

const urlBase = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=7902071ecb184d27915b2722ea862fcd&ingredients=${ingName}`

ingForm.onsubmit = function(event) {
    event.preventDefault();
    const nameValue = ingName.value;
    console.log(nameValue);
    let url = urlBase;
    url += nameValue.replaceAll(' ', '+')
    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        const meal = response[0]['title'];
        console.log(meal);
        const mealPara = document.createElement('p');
        mealPara.innerText = `${nameValue} can be used to cook ${meal}`;
        ingInfo.appendChild(mealPara);

    });
}
