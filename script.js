const fruitForm = document.querySelector("#inputSection form");
//creates object that selects the form input section

const fruitList = document.querySelector('#fruitSection ul')
//creates object that selects the list elements under the fruitSection 


fruitForm.addEventListener("submit", extractFruit);
//applies function on submit click

function extractFruit(e) {
    e.preventDefault();
    //prevents default behaviour which is to refresh page
    let fruitInput = e.target.fruitInput.value;
    //reassigns the target to variable for more cohesive code
    if(fruitInput) {
        addFruit(fruitInput);
    } 
    //uses function on user input IF there is content (adds value as a list item)
    e.target.reset();
    //resets the form input box to empty
}

function addFruit(fruit) {
    const li = document.createElement('li');
    //creates list item
    li.textContent = fruit;
    //assigns text (fruit) to list item
    li.addEventListener('click', removeFruit, {once: true})
    //applies event listener that only runs once
    fruitList.appendChild(li);
    //appends list item to the HTML list    
}

function removeFruit() {
    e.target.remove();
    //removes the item that is clicked on
}

