import { User } from '../models/user';

export abstract class View {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;
  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
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
    this.parent.innerHTML = '';
    const tempalateElement = document.createElement('template');
    tempalateElement.innerHTML = this.template();

    this.bindEvents(tempalateElement.content);

    this.parent.append(tempalateElement.content);
  }
}
