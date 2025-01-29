import { AxiosResponse } from 'axios';
import { Attributes } from './attributes';
import { CallbackFn, Eventing, EventType } from './eventing';
import { Sync } from './sync';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  events: Eventing = new Eventing();
  sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }
  // refrencing all methods from composition relation so as to be used directly from the user instance
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  // syncing modules together to be updated all when user gets updated
  set(updatedUser: UserProps): void {
    this.attributes.set(updatedUser);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');
    if (!id) throw new Error('Cannot fetch without an id');

    this.sync.fetch(id).then((user: AxiosResponse): void => {
      this.set(user.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((res: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch((err) => {
        this.trigger('error');
      });
  }
}
