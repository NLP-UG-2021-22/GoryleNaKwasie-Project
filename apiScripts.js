
function showMessage(){
    var T = document.getElementById("ingInfo"),
    displayValue = "";
    if (T.style.display == "")
        displayValue = "none";

    T.style.display = displayValue;

}


const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", showMeals);
// submitButton.addEventListener("click", changeText);
console.log("food api test");

const ingForm = document.getElementById('ingForm');
const ingName = document.getElementById('ingName');

// function changeText(){
//     const mainResponse = document.getElementById("mainResponse");
//     mainResponse.innerHTML = "Thanks, let's see what we can cook up";
// } //this does not work for some reason



const ingInfo = document.getElementById('ingInfo');
const urlBase = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=670611b28aa640a59d2348130d1a7067&ingredients=${ingName}`;
// const urlSteps = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=670611b28aa640a59d2348130d1a7067`;

const meals = [];

function showMeals(event) {
    
    event.preventDefault();
    const nameValue = ingName.value;
    let url = urlBase;
    url += nameValue.replaceAll(' ', ',+')
    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(response => {
        for (let i = 0; i <= 2; i++) {
            const mealObj = {};
            mealObj['title'] = response[i]['title'];
            mealObj['img'] = response[i]['image'];
            mealObj['id'] = response[i]['id'];
            console.log(mealObj['id']);
            meals.push(mealObj);
            const urlSteps = `https://api.spoonacular.com/recipes/${mealObj['id']}/analyzedInstructions?apiKey=670611b28aa640a59d2348130d1a7067`;
            console.log(urlSteps);
            fetch(urlSteps)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                console.log(response[0]['steps']); //don't know how to access the individual steps
            })

        }
            meals.forEach(dish => {
                const mealPara = document.createElement('p');
                mealPara.innerText = `Your ingredients can be used to cook ${dish.title}`;
                const mealImg = document.createElement('img');
                mealImg.src = dish.img;
                ingInfo.appendChild(mealPara);
                ingInfo.appendChild(mealImg);


            })
       
        const nextBtn = document.createElement('button');
        nextBtn.style.backgroundColor = 'rgb(255, 243, 7)';
        nextBtn.style.color = 'black';
        nextBtn.style.border = '2px solid black';
        nextBtn.style.fontFamily = 'Quicksand, sans-serif'
        nextBtn.innerHTML = "Show next recipes";
        nextBtn.onclick = function() {
            alert("no idea how to make this button actually show next 3 recipes");
          };
        ingInfo.appendChild(nextBtn);

    });

document.getElementById('submitButton').disabled = true;
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetChat);

function resetChat() {
    window.location.reload(); //I had no idea how to make reset jsut the form
}
