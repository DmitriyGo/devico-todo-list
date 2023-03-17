class TodoItem {
  constructor(name) {
    this.name = name;
    this.completed = false;
  }
}

class TodoApp {
  #items = [];
  #selectedTodo = null;

  constructor() {
    this.todoItemsList = createElement("ul", { classList: "todo-app__list" });

    this.todoItemsFooter = createElement("div", {
      classList: "todo-app__footer",
    });

    this.activeTodosCounter = createElement("div");
    this.completedTodosCounter = createElement("div");

    this.todoItemsFooter.append(
      this.activeTodosCounter,
      this.completedTodosCounter,
      createElement(
        "button",
        {
          classList: "todo-app__button-clear",
          onclick: (e) => {
            e.preventDefault();
            this.clearCompleted();
          },
        },
        "Clear completed"
      )
    );
  }

  add(item) {
    item._id = Math.random();

    this.#items.push(item);
    this.update();
  }

  remove(item) {
    const index = this.#items.findIndex((i) => i._id === item._id);
    if (index !== -1) {
      this.#items.splice(index, 1);
      this.update();
    }
  }

  clearCompleted() {
    this.#items = this.#items.filter((i) => !i.completed);
    this.update();
  }

  toggleStatus(item) {
    const index = this.#items.findIndex((i) => i._id === item._id);

    if (index !== -1) {
      this.#items[index].completed = !item.completed;
      this.update();
    }
  }

  get activeTodosCount() {
    return this.#items.filter((i) => !i.completed).length;
  }

  get completedTodosCount() {
    return this.#items.filter((i) => i.completed).length;
  }

  save() {
    try {
      localStorage.setItem("todoItems", JSON.stringify(this.#items));
    } catch (error) {
      console.error("Failed to save todoItems to localStorage:", error);
    }
  }

  load() {
    try {
      const items = JSON.parse(localStorage.getItem("todoItems") ?? "[]");
      items.forEach((item) => {
        item.editable = false;
      });
      this.#items = items;
      this.update();
    } catch (error) {
      console.error("Failed to load todoItems from localStorage:", error);
    }
  }

  update() {
    this.render();
    this.save();
  }

  render() {
    this.todoItemsList.innerHTML = "";

    this.#items.forEach((item) => {
      this.todoItemInput = createElement("input", {
        classList: "todo-app__item-change__input",
        value: item.name,
        onclick: (e) => {
          e.stopPropagation();
        },
        onkeyup: (e) => {
          if (e.key === "Enter") {
            item.name = e.target.value;
            this.#selectedTodo = null;
            this.update();
          }
        },
      });

      this.todoItemsList.append(
        createElement(
          "li",
          {
            classList: "todo-app__item",
            onclick: (e) => {
              e.stopPropagation();
              this.toggleStatus(item);
              this.update();
            },
          },
          createElement("input", {
            type: "checkbox",
            classList: "todo-app__item-checkbox",
            checked: item.completed,
          }),
          item._id !== this.#selectedTodo?._id
            ? createElement(
                "span",
                {
                  classList: `todo-app__item-text ${
                    item.completed ? "todo-app__item-completed" : ""
                  }`,
                },
                item.name
              )
            : this.todoItemInput,
          createElement(
            "span",
            {
              classList: "todo-app__item-edit",
              onclick: (e) => {
                e.stopPropagation();
                if (this.#selectedTodo?._id === item._id) {
                  this.#selectedTodo = null;
                } else {
                  this.#selectedTodo = item ? item : null;
                }
                this.update();
              },
            },
            this.#selectedTodo?._id !== item._id ? "&#x270E;" : "&#x2714;"
          ),
          createElement(
            "span",
            {
              classList: "todo-app__item-remove",
              onclick: (e) => {
                e.stopPropagation();
                this.remove(item);
              },
            },
            "&#x2716;"
          )
        )
      );

      this.todoItemInput.focus();
    });

    this.activeTodosCounter.textContent = `Active: ${this.activeTodosCount}`;
    this.completedTodosCounter.textContent = `Completed: ${this.completedTodosCount}`;
  }
}

class TodoForm {
  constructor() {
    this.todoFormInput = createElement("input", {
      classList: "todo-app__input",
      placeholder: "Add new todo...",
      onsubmit: () => {
        this.todoForm.submit();
      },
    });

    this.todoForm = createElement(
      "div",
      { classList: "todo-form__wrapper" },
      createElement("h1", { classList: "todo-form__title" }, "TODO LIST"),
      createElement(
        "form",
        {
          classList: "todo-form__form",
          onsubmit: (e) => {
            e.preventDefault();
            if (this.todoFormInput.value.trim().length) {
              todoApp.add(new TodoItem(this.todoFormInput.value));
              this.todoFormInput.value = "";
            }
          },
        },
        this.todoFormInput,
        createElement(
          "button",
          {
            classList: "todo-app__button",
            type: "submit",
          },
          "SUBMIT"
        )
      )
    );
  }
}

//======= APP =======//

const root = document.getElementById("root");

const todoApp = new TodoApp();
const todoForm = new TodoForm();
todoApp.load();

const todoWrapper = createElement(
  "div",
  { classList: "todo-app" },
  todoForm.todoForm,
  todoApp.todoItemsList,
  todoApp.todoItemsFooter
);

window.addEventListener("load", () => root.append(todoWrapper));

// ======= HELPERS ======= //

function createElement(type, props, ...children) {
  const element = document.createElement(type);

  for (let prop in props) {
    element[prop] = props[prop];
  }

  for (let child of children) {
    if (typeof child === "string") {
      if (child.startsWith("&")) {
        element.innerHTML += child;
      } else {
        element.appendChild(document.createTextNode(child));
      }
    } else {
      element.appendChild(child);
    }
  }

  return element;
}
