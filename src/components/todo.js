const todoTemplate = document.createElement("template");
todoTemplate.innerHTML = /*html*/ `
    <li>
        <input type="checkbox">
        <label></label>
        <button>delete &times;</button>
    </li>
`;

class Todo extends HTMLElement {
  constructor() {
    super();

    this._text = "default";
  }

  connectedCallback() {
    this.appendChild(todoTemplate.content.cloneNode(true));

    this.$todo = this.querySelector("li");
    this.$label = this.querySelector("label");
    this.$checkbox = this.querySelector("input");
    this.$deleteBtn = this.querySelector("button");

    this.$checkbox.addEventListener("click", e => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("toggleTodo", { detail: this._index })
      );
    });

    this.$deleteBtn.addEventListener("click", e => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("deleteTodo", { detail: this._index })
      );
    });

    this.render();
  }

  set index(index) {
    this._index = index;
  }

  get index() {
    return this._index;
  }

  set text(text) {
    this._text = text;
  }

  set checked(value) {
    if (value) {
      this.setAttribute("checked", "");
    }
  }

  get checked() {
    return this.hasAttribute("checked");
  }

  render() {
    this.$label.textContent = this._text;
    if (this.checked) {
      this.$checkbox.setAttribute("checked", "");
      this.$todo.classList.add("completed");
    } else {
      this.$checkbox.removeAttribute("checked");
      this.$todo.classList.remove("completed");
    }
  }
}

window.customElements.define("todo-item", Todo);
