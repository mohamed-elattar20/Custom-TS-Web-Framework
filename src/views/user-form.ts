import { User } from '../models/user';
export class UserForm {
  constructor(public parent: Element, public model: User) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick,
      'mouseenter:h1': this.onButtonClick,
    };
  }

  onButtonClick(): void {
    console.log(`Hi there from button Click`);
  }

  template(): string {
    return `
    <div>
        <h1>
            UserForm
        </h1>
        <div>
        User Name : ${this.model.get('name')}
        </div>
        <div>
        User Age : ${this.model.get('age')}
        </div>
        <input/>
        <button>Click Me To do something</button>
    </div>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let key in eventsMap) {
      const [eventName, selector] = key.split(':');
      fragment.querySelectorAll(selector).forEach((ele) => {
        ele.addEventListener(eventName, eventsMap[key]);
      });
    }
  }

  render(): void {
    const tempalateElement = document.createElement('template');
    tempalateElement.innerHTML = this.template();

    this.bindEvents(tempalateElement.content);

    this.parent.append(tempalateElement.content);
  }
}
