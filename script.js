const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector('#fruitSection ul')
const fruitNutrition = document.querySelector('#nutritionSection p');

const APIkey = "33986191-6404d03a8a54cd47780364f86"

let calorieCount = 0;
let action;

fruitForm.addEventListener("submit", extractFruit);
//applies function on submit click

function extractFruit(e) {
    e.preventDefault();
    //prevents default behaviour which is to refresh page

    let fruitInput = e.target.fruitInput.value;
    //reassigns the target to variable for more cohesive code

    if(fruitInput) {
        fetchFruitData(fruitInput);
    } 
    //uses function on user input IF there is content (adds value as a list item)
   
    e.target.reset();
    //resets the form input box to empty
}

function addFruit(fruit) {
    const li = document.createElement('li');
    //creates list item

    li.textContent = fruit['name'];
    //assigns text (fruit) to list item

    li.addEventListener('click', (e) => {
        removeFruit(e),  calculateNutrition(fruit, "remove")
    }, {once: true});
    //applies event listener that only runs once and removes fruit and calorie count

    fruitList.appendChild(li);
    //appends list item to the HTML list  

    calculateNutrition(fruit, "add");
    //runs function for each fruit added
}

function removeFruit(e) {
    //calorieCount = calorieCount - e.target.nutrition;
    // calculateNutrition(e.target);
    e.target.remove();
    //removes the item that is clicked on

    
}

function calculateNutrition(fruitData, action) {
    let nutrition = fruitData['nutritions']['calories'];
    //takes the calories value from the nutrition key value
    
    if(action === "add") {
        calorieCount += nutrition;
    } else if (action === "remove") {
        calorieCount -= nutrition;
    }
    //increment/decrement calorie count according to action 

    fruitNutrition.innerHTML = `Calorie count: ${calorieCount}`
    //formats the text that is shown
}





async function fetchFruitData(fruit) {
    try {
        const resp  = await fetch(`https://fruity-api.onrender.com/fruits/${fruit}`);
        if(resp.ok) {
            const data = await resp.json()
            addFruit(data)
        } else {
        throw `Error: http status code = ${resp.status}`
    }

    } catch(err) {
    console.log(err)
}
}

/*
function fetchFruitData(fruit) {
    fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
    //fetch from API

        .then(resp => processResponse(resp))
        //with a response then run the response/error accordingly

        .then(data => addFruit(data))
        //with data add to the addFruit function

        .catch((err) => console.log(err))
        //with errors print out the error
}

function processResponse(resp) {
    if(resp.ok) {
        return resp.json()
    } else {
        throw `Error: http status code = ${resp.status}`
    }
    //Return json function if the response is ok, otherwise throw the suitable error
}

*/


   
 
