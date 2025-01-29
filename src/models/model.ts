import { AxiosPromise, AxiosResponse } from 'axios';
import { CallbackFn } from './eventing';
import { HasId } from './api-sync';

interface ModelAttributes<T> {
  set(val: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface ModelEvents {
  on(eventName: string, callback: CallbackFn): void;
  trigger(eventName: string): void;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: ModelEvents,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  // syncing modules together to be updated all when user gets updated
  set(updatedUser: T): void {
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
