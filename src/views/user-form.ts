export class UserForm {
  constructor(public parent: Element) {}

  template(): string {
    return `
    <div>
        <h1>
            UserForm
        </h1>
        <input/>
    </div>
    `;
  }

  render(): void {
    const tempalateElement = document.createElement('template');
    tempalateElement.innerHTML = this.template();

    this.parent.append(tempalateElement.content);
  }
}
