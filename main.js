const root = document.getElementById('root');

class TodoItem {
  constructor(name, completed) {
    this.name = name;
    this.completed = completed;
    this.editable = false;
  }
}

class TodoApp {
  #items = [];

  add(item) {
    item._id = this.#items.length;

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

  getActiveTodosCount() {
    return this.#items.filter((i) => !i.completed).length;
  }

  getCompletedTodosCount() {
    return this.#items.filter((i) => i.completed).length;
  }

  update() {
    this.render();
    this.save();
  }

  render() {
    this.todoItemsList.innerHTML = '';

    this.#items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.classList.add('todo-app__item');

      if (!item.editable) {
        const itemCheckbox = document.createElement('input');
        itemCheckbox.classList.add('todo-app__item-checkbox');
        itemCheckbox.type = 'checkbox';
        itemCheckbox.checked = item.completed;

        const itemTextSpan = document.createElement('span');
        itemTextSpan.classList.add('todo-app__item-text');
        itemTextSpan.textContent = item.name;

        const editButton = document.createElement('span');
        editButton.classList.add('todo-app__item-edit');
        editButton.textContent = '🖉';
        editButton.addEventListener('click', (e) => {
          e.stopPropagation();
          item.editable = true;
          this.update();
        });

        const removeButton = document.createElement('span');
        removeButton.classList.add('todo-app__item-remove');
        removeButton.textContent = '🗙';
        removeButton.addEventListener('click', (e) => {
          e.stopPropagation();
          this.remove(item);
        });

        listItem.append(itemCheckbox, itemTextSpan, editButton, removeButton);

        if (item.completed) {
          listItem.classList.add('todo-app__item-completed');
        }
        listItem.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleStatus(item);
          this.update();
        });
        this.todoItemsList.append(listItem);
      } else {
        const itemChangeInput = document.createElement('input');
        itemChangeInput.classList.add('todo-app__item-change__input');
        itemChangeInput.setAttribute('type', 'text');
        itemChangeInput.setAttribute('value', item.name);
        itemChangeInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            item.editable = false;
            item.name = itemChangeInput.value;
            this.update();
          }
        });
        itemChangeInput.addEventListener('blur', () => {
          item.editable = false;
          item.name = itemChangeInput.value;
          this.update();
        });

        listItem.append(itemChangeInput);
        this.todoItemsList.append(listItem);
      }
    });

    this.activeTodosCounter.textContent = `Active: ${this.getActiveTodosCount()}`;
    this.completedTodosCounter.textContent = `Completed: ${this.getCompletedTodosCount()}`;
  }

  save() {
    try {
      localStorage.setItem('todoItems', JSON.stringify(this.#items));
    } catch (error) {
      console.error('Failed to save todoItems to localStorage:', error);
    }
  }

  load() {
    try {
      const items = JSON.parse(localStorage.getItem('todoItems') ?? '[]');
      items.forEach((item) => {
        item.editable = false;
      });
      this.#items = items;
      this.update();
    } catch (error) {
      console.error('Failed to load todoItems from localStorage:', error);
    }
  }

  getTodoItemsList() {
    return this.todoItemsList;
  }

  getTodoItemsFooter() {
    return this.todoItemsFooter;
  }

  constructor() {
    this.todoItemsList = document.createElement('ul');
    this.todoItemsList.classList.add('todo-app__list');

    this.todoItemsFooter = document.createElement('div');
    this.todoItemsFooter.classList.add('todo-app__footer');

    this.activeTodosCounter = document.createElement('div');
    this.activeTodosCounter.textContent = `Active: ${this.getActiveTodosCount()}`;

    this.completedTodosCounter = document.createElement('div');
    this.completedTodosCounter.textContent = `Completed: ${this.getCompletedTodosCount()}`;

    this.clearCompletedButton = document.createElement('button');
    this.clearCompletedButton.classList.add('todo-app__button-clear');
    this.clearCompletedButton.textContent = 'Clear completed';
    this.clearCompletedButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.clearCompleted();
    });

    this.todoItemsFooter.append(
      this.activeTodosCounter,
      this.completedTodosCounter,
      this.clearCompletedButton
    );

    this.todoItemsList.append(this.todoItemsFooter);
  }
}

const todoApp = new TodoApp();
todoApp.load();

const todoWrapper = document.createElement('div');
todoWrapper.classList.add('todo-app');

//======= HEADER =======//

const todoHeader = document.createElement('header');
todoHeader.classList.add('todo-app__header');

const todoTitle = document.createElement('h1');
todoTitle.classList.add('todo-app__title');
todoTitle.textContent = 'TODO LIST';

const todoForm = document.createElement('form');
todoForm.classList.add('todo-app__form');

const todoInput = document.createElement('input');
todoInput.classList.add('todo-app__input');
todoInput.setAttribute('type', 'string');
todoInput.setAttribute('placeholder', 'Add new todo...');

const todoButton = document.createElement('button');
todoButton.classList.add('todo-app__button');
todoButton.textContent = 'SUBMIT';

todoButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (todoInput.value.length) {
    todoApp.add(new TodoItem(todoInput.value, false));
    todoInput.value = '';
  }
});

todoForm.append(todoInput, todoButton);
todoHeader.append(todoTitle, todoForm);

//======= GENERAL =======//

todoWrapper.append(
  todoHeader,
  todoApp.getTodoItemsList(),
  todoApp.getTodoItemsFooter()
);

root.append(todoWrapper);
