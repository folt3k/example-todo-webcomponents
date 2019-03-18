const addTodoTemplate = document.createElement("template");
addTodoTemplate.innerHTML = /*html*/ `
    <form>
        <div class="form-group">
            <input type="text" name="text" placeholder="New task..">
            <span class="error"></span>
        </div>
        <button type="submit">submit</button>
    </form>
`;

class AddTodo extends HTMLElement {
  connectedCallback() {
    this.appendChild(addTodoTemplate.content.cloneNode(true));
    this.$form = this.querySelector("form");
    this.$error = this.querySelector(".error");

    this.$form.addEventListener("submit", e => {
      e.preventDefault();
      const formValues = this.getFormValues();

      if (this.validate()) {
        this.onSubmit(formValues);
      }
    });
  }

  onSubmit(values) {
    this.dispatchEvent(new CustomEvent("onSubmit", { detail: values }));
    this.reset();
    this.clearErrors();
  }

  getFormValues() {
    const formValues = {};

    for (const pair of new FormData(this.$form).entries()) {
      formValues[pair[0]] = pair[1];
    }

    return formValues;
  }

  validate() {
    const textInpuValue = new FormData(this.$form).get("text");

    if (textInpuValue.trim() === "") {
      this.errorMessage = "This field is required.";
      return false;
    } else if (textInpuValue.length < 5) {
      this.errorMessage = "This field must contain at least 3 characters";
      return false;
    }

    return true;
  }

  reset() {
    this.querySelector("input").value = "";
  }

  set errorMessage(message) {
    if (message) {
      this.$error.textContent = message;
    } else {
      this.$error.textContent = "";
    }
  }

  clearErrors() {
    this.errorMessage = null;
  }
}

window.customElements.define("add-todo", AddTodo);
