import { User, UserProps } from '../models/user';
import { View } from './view';

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
        <div>
            <h1>User Show</h1>
            <div>User name : ${this.model.get('name')}</div>
            <div>User name : ${this.model.get('age')}</div>
        </div>
        `;
  }
}
