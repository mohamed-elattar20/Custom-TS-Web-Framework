import axios, { AxiosResponse } from 'axios';
import { Eventing } from './eventing';

export class Collection<T, K> {
  models: T[];
  events: Eventing = new Eventing();
  constructor(public rootUrl: string, public deserialize: (json: K) => T) {
    this.models = [];
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((res: AxiosResponse): void => {
      res.data.forEach((val: K) => {
        this.models.push(this.deserialize(val));
      });

      this.trigger('change');
    });
  }
}
