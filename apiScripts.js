// DOM elements
const submitButton = document.getElementById("submitButton");
const ingForm = document.getElementById('ingForm');
const ingName = document.getElementById('ingName');
const mainResponse = document.getElementById("welcomeMess");
const ingInfo = document.getElementById('ingInfo');
const mealsList = document.getElementById('mealsList');
const resetButton = document.getElementById("resetButton");
const nextButton = document.getElementById('nextRecipesButton');

// Event listeners
submitButton.addEventListener("click", fetchMeals);
nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    showMeals(alreadyShown);
});
resetButton.addEventListener("click", resetChat);

// Variables necessary for app functionality
const urlBase = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=7902071ecb184d27915b2722ea862fcd&ingredients=";
let meals = [];
let alreadyShown = 0;

// Helper functions
function changeMainResponseText(text){
    mainResponse.innerHTML = text;
}

function resetChat() {
    mealsList.innerHTML = "";
    meals = [];
    alreadyShown = 0;
    ingInfo.classList.add('hidden');
    changeMainResponseText("Hi! I'm here to help you find recipes for various occasions! In order to start a conversation with me, simply put your desired ingredients in the window below and I'll provide you with a list of possible dishes. Can't wait to cook together! <b>Let's go!</b>");
}

// Meal lists:

function prepareMealObject(inputObj) {
    return {
        title: inputObj['title'],
        img: inputObj['image'],
        id: inputObj['id']
    }
}

function showMeals(idx) {
    if (idx >= meals.length) {
        console.log("All meals are shown!");
        return;
    };
    let endIdx = idx + 3 < meals.length ? idx + 3 : meals.length;
    for (let i = idx; i < endIdx; i++) {
        appendMealDataToMealsList(meals[i]);
    }
    alreadyShown += (endIdx - idx);
    if (alreadyShown >= meals.length) {
        nextButton.classList.add('hidden');
    }
}

function appendMealDataToMealsList(mealObj) {
    const mealPara = document.createElement('p');
    mealPara.innerText = `Your ingredients can be used to cook ${mealObj.title}`;
    const mealImg = document.createElement('img');
    mealImg.src = mealObj.img;
    const mealStepsTrigger = document.createElement('button');
    mealStepsTrigger.innerText = "Show steps for this meal!";
    mealStepsTrigger.addEventListener('click', (e) => {e.preventDefault(); fetchSteps(mealObj.id)});
    mealStepsTrigger.classList.add('mealStepsTriggerButton');
    mealStepsTrigger.setAttribute('id', mealObj.id.toString());
    mealsList.appendChild(mealPara);
    mealsList.appendChild(mealImg);
    mealsList.appendChild(mealStepsTrigger);
}

function fetchMeals(event) {
    event.preventDefault();
    const nameValue = ingName.value;
    let url = urlBase;
    url += nameValue.replaceAll(' ', ',+');

    fetch(url)
    .then(response => response.json())
    .then(response => {
        if (response.length > 0) {
            changeMainResponseText("Thanks, let's see what we can cook up");
            ingInfo.classList.remove('hidden');
            meals = response.map(el => prepareMealObject(el));
            showMeals(0);
        } else {
            console.log("Nothing found!");
        }
    });
}

// Meal preparation steps:

function buildAStep(ingredients, equipment, step) {
    return `<p>
    <h5>Ingredients:</h5>
    <span>${ingredients && ingredients.length > 0 ? ingredients.map(x => x.name).join(", ") : "None"}</span>
    <h5>Equipment:</h5>
    <span>${equipment && equipment.length > 0 ? equipment.map(x => x.name).join(", ") : "None"}</span>
    <h5>Instruction:</h5>
    <span>${step}</span>
    </p>`;
}

function addStepsToDOM(id, currentSteps) {
    const currentButton = document.getElementById(id.toString());
    const stepsContainer = document.createElement('div');
    let stepsHTML = "";
    currentSteps.steps.forEach((step, idx) => {
        stepsHTML += `<h4>Step ${idx+1}</h4>`
        stepsHTML += buildAStep(step.ingredients, step.equipment, step.step);
    });
    stepsContainer.innerHTML = stepsHTML;
    currentButton.after(stepsContainer);
    currentButton.setAttribute('disabled', true);
}

function fetchSteps(id) {
    const urlSteps = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=7902071ecb184d27915b2722ea862fcd`;
    console.log(urlSteps);
    fetch(urlSteps)
    .then(response => response.json())
    .then(response => {
        // console.log(response);
        currentSteps = response[0];
        addStepsToDOM(id, currentSteps);
    });
}
