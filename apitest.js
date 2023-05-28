(function(){

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
    .then(res=>res.json())
    .then(data=> displayFoods(data))
    
    
    
    const displayFoods = foods =>{
    const foodItemsDiv = document.getElementById('food-items');
    
    foods.meals.forEach(meal=>{
    
        const foodDiv = document.createElement('div');
    
        foodDiv.className = 'meal';
        const foodInfo = `
        <h3>${meal.strMeal}</h3>
    
        `;
        foodDiv.innerHTML = foodInfo;
        foodItemsDiv.appendChild(foodDiv);
    });
    }
    
    })();