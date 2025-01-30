import { User } from '../models/user';
import { View } from './view';
export class UserForm extends View {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#set-age': this.setAge,
      'click:#change-name': this.changeName,
    };
  }
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
        <input type='text'/>
        <button id="change-name">Change name</button>
        <button id="set-age">Set Random Age</button>
    </div>
    `;
  }
}
