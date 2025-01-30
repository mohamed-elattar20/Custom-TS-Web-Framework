import { User, UserProps } from '../models/user';
import { View } from './view';
export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#set-age': this.setAge,
      'click:#change-name': this.changeName,
      'click:#save-model': this.saveModel,
    };
  }
  saveModel = (): void => {
    this.model.save();
  };
  changeName = (): void => {
    const targetInputVal = this.parent.querySelector('input')?.value;
    if (targetInputVal) this.model.set({ name: targetInputVal });
  };

  setAge = (): void => {
    this.model.setRandomAge();
  };

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
        <input placeholder="${this.model.get('name')}" type='text'/>
        <button id="change-name">Change name</button>
        <button id="set-age">Set Random Age</button>
        <button id="save-model">Save</button>
    </div>
    `;
  }
}
