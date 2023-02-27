const fruitForm = document.querySelector("#inputSection form");
//creates object that selects the form input section

const fruitList = document.querySelector('#fruitSection ul')
//creates object that selects the list elements under the fruitSection 

const fruitNutrition = document.querySelector('#nutritionSection p');
//selects

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

    li.addEventListener('click', removeFruit, {once: true});
    //applies event listener that only runs once

    fruitList.appendChild(li);
    //appends list item to the HTML list  
    
    calculateNutrition(fruit);
    //runs function for each fruit added
}

function removeFruit(e) {
    e.target.remove();
    //removes the item that is clicked on
}

let calorieCount = 0;

function calculateNutrition(fruitData) {
    let nutrition = fruitData['nutritions']['calories'];
    //takes the calories value from the nutrition key value

    calorieCount += nutrition
    //add nutrition value of new item to calorie count

    document.querySelector('p').innerHTML = `Calorie count: ${calorieCount}`
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


   
 
