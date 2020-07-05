let itemsToDo = [];

function renderItem(toDo) {

    //gets the list we're going to add our task to
    const list = document.querySelector(".js-todo-list");

    const isChecked =  toDo.checked ? "done": "";
    console.log(isChecked);

    // Create an `li` element and assign it to `node`
    const node = document.createElement("li");
    // Set the class attribute
    node.setAttribute('class', `todo-item ${isChecked}`);
    // Set the data-key attribute to the id of the todo
    node.setAttribute('data-key', toDo.id);
    // Set the contents of the `li` element created above
    node.innerHTML = `
        <input id="${toDo.id}" type="checkbox"/>
        <label for="${toDo.id}" class="tick js-tick"></label>
        <p>${toDo.task}</p>
        <input class="delete-todo js-delete-todo" type="submit" aria-hidden="true" value="X"/>
    `;

    // Append the element to the DOM as the last child of
    // the element referenced by the `list` variable
    list.append(node);
}

function addItem(input) {
    //creates the toDo object
    const toDo = {
        task: input,
        done: false,
        id: Date.now()
    };

    itemsToDo.push(toDo);
    renderItem(toDo);
}

const form = document.querySelector('.js-form');
// Add a submit event listener

form.addEventListener('submit', event => {
    // prevent page refresh on form submission
    event.preventDefault();
    // select the text input
    const input = document.querySelector('.js-todo-input');

    // Get the value of the input and remove whitespace
    const text = input.value.trim();
    if (text !== '') {
    addItem(text);
    input.value = '';
    input.focus();
    }
});
