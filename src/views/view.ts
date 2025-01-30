import { HasId } from '../models/api-sync';
import { Model } from '../models/model';

export abstract class View<T extends Model<K>, K extends HasId> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }
  mapRegions(fragement: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragement.querySelector(selector);
      if (element) this.regions[key] = element;
    }
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

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

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';
    const tempalateElement = document.createElement('template');
    tempalateElement.innerHTML = this.template();

    this.bindEvents(tempalateElement.content);
    this.mapRegions(tempalateElement.content);

    this.onRender();

    this.parent.append(tempalateElement.content);
  }
}
