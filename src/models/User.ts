import { ApiSync } from './api-sync';
import { Attributes } from './attributes';
import { Collection } from './collection';
import { Eventing } from './eventing';
import { Model } from './model';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync(rootUrl)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
  }
}
