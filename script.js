
//date functionality
var today = new Date();
var dispDate = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
const datePlace = document.querySelector("#date").querySelector(".toPad");
datePlace.innerHTML = `<h3>${dispDate}</h3>`;


//todo list functionality
let itemsToDo = [];

function renderItem(toDo) {

    localStorage.setItem('todoItemsRef', JSON.stringify(itemsToDo));

    //gets the list we're going to add our task to
    const list = document.querySelector(".js-todo-list");
    const item = document.querySelector(`[data-key='${toDo.id}']`);

    if (toDo.deleted) {
        // remove the item from the DOM
        item.remove();
        return;
    }

    const isDone =  toDo.done ? "done": "";

    // Create an `li` element and assign it to `node`
    const node = document.createElement("li");
    // Set the class attribute
    node.setAttribute('class', `todo-item ${isDone}`);
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
    if (item) {
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }
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

const list = document.querySelector(".js-todo-list");

// Add a click event listener to the list and its children
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }
    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        delItem(itemKey);
    }
});

function toggleDone(itemKey) {
    const index = itemsToDo.findIndex(item => item.id = itemKey);

    //reversing done status
    itemsToDo[index].done = !itemsToDo[index].done;
    renderItem(itemsToDo[index]);
}

function delItem(itemKey) {
    const index = itemsToDo.findIndex(item => item.id = itemKey);

    const toDoDel = {
        deleted: true,
        ...itemsToDo[index]
    };
    itemsToDo.splice(index, 1);
    renderItem(toDoDel);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("reload");
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      itemsToDo = JSON.parse(ref);
      itemsToDo.forEach(t => {
        renderItem(t);
      });
    }
});