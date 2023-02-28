const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector('#fruitSection ul')
const fruitNutrition = document.querySelector('#nutritionSection p');

const APIkey = "<APIKEY>"

let calorieCount = 0;
let action;

fruitForm.addEventListener("submit", extractFruit);
// applies function on submit click


function extractFruit(e) {
    e.preventDefault();   
    let fruitInput = e.target.fruitInput.value;

    if(fruitInput) {
        fetchFruitData(fruitInput),
        fetchPhoto(fruitInput)
    } 

    e.target.reset(); 
}

// extractFruit prevents automatic refreshing of page, applies functions with input values, resets the input box at the end of fxn


function addFruit(fruit) {
    const li = document.createElement('li');
    li.textContent = fruit['name'];
    fruitList.appendChild(li);  
    calculateNutrition(fruit, "add");

    li.addEventListener('click', (e) => {
        removeFruit(e),  calculateNutrition(fruit, "remove")
    }, {once: true});
}

// addFruit creats a list item assigns input text to list item, appends list item to HTML list, runs nutrition function
// eventListener runs functions for removing fruit, inheriting fruit value from the addFruit function 


function removeFruit(e) {
    e.target.remove();  
}

// removeFruit remove list item clicked on


function calculateNutrition(fruitData, action) {
    let nutrition = fruitData['nutritions']['calories'];
    
    if (action === "add") {
        calorieCount += nutrition;
    } else if (action === "remove") {
        calorieCount -= nutrition;
    }

    fruitNutrition.innerHTML = `Calorie count: ${calorieCount}`
}

// calculateNutrition takes the calorie data and applies increment/decrement to total calorie count depending on action argument, printing updated total


function addPhoto(fruitImage) {
    const img = document.createElement('img');
    img.src = fruitImage;
    document.getElementById('nutritionSection').appendChild(img)
}

// addPhoto adds a photo of the fruit to the end of nutritionSection


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

// async function allows other tasks to be added to the stack while waiting for the API data to be fetched


async function fetchPhoto(fruit) {
    try {
        const resp  = await fetch(`https://pixabay.com/api/?q=${fruit}&key=${APIkey}`);
        if(resp.ok) {
            const data = await resp.json()
            let photoInput = data["hits"][0]["previewURL"]
            addPhoto(photoInput)
        } else {
        throw `Error: http status code = ${resp.status}`
    }

    } catch(err) {
    console.log(err)
}
}

// async function allows other tasks to be added to the stack while waiting for the API data to be fetched


/*      ALTERNATIVE WAY OF WRITING API FETCH WITHOUT ASYNC FUNCTION 

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


   
 
