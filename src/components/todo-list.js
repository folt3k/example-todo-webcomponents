import "./todo";
import "./add-todo";

const todoListTemplate = document.createElement("template");
todoListTemplate.innerHTML = /*html*/ `
    <add-todo></add-todo>
    <ul></ul>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();

    this.todos = [
      {
        text: "todo 1",
        checked: true
      },
      {
        text: "todo 2",
        checked: false
      }
    ];
  }

  connectedCallback() {
    this.appendChild(todoListTemplate.content.cloneNode(true));

    this.$list = this.querySelector("ul");
    this.$form = this.querySelector("add-todo");

    this.$form.addEventListener("onSubmit", this.addTodo.bind(this));

    this.render();
  }

  toggleTodo({ detail }) {
    this.todos = this.todos.map((todo, index) =>
      index === detail ? { ...todo, checked: !todo.checked } : todo
    );

    this.render();
  }

  addTodo({ detail }) {
    this.todos.unshift({ text: detail.text, checked: false });

    this.render();
  }

  deleteTodo({ detail }) {
    this.todos = this.todos.filter((todo, index) => index !== detail);

    this.render();
  }

  render() {
    this.$list.innerHTML = "";

    this.todos.forEach((todo, index) => {
      const todoItem = document.createElement("todo-item");
      todoItem.text = todo.text;
      todoItem.checked = todo.checked;
      todoItem.index = index;

      todoItem.addEventListener("toggleTodo", this.toggleTodo.bind(this));
      todoItem.addEventListener("deleteTodo", this.deleteTodo.bind(this));

      this.$list.appendChild(todoItem);
    });
  }
}

window.customElements.define("todo-list", TodoList);
