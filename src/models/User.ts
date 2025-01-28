import axios, { AxiosResponse } from 'axios';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
type CallbackFn = () => void;
type EventType = { [key: string]: CallbackFn[] };

export class User {
  events: EventType = {};
  constructor(private data: UserProps) {}

  get(propName: keyof UserProps): string | number | undefined {
    return this.data[propName];
  }

  set(updatedData: UserProps): void {
    Object.assign(this.data, updatedData);
  }

  on(eventName: string, callback: CallbackFn): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  trigger(eventName: keyof EventType): void {
    if (!this.events[eventName] || this.events[eventName].length === 0) return;
    this.events[eventName].forEach((event) => event());
  }

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => {
        this.set(res.data);
      });
  }

  save(): void {
    if (this.get('id')) {
      axios.put(`http://localhost:3000/users/${this.get('id')}`, this.data);
    } else {
      axios.post(`http://localhost:3000/users`, this.data);
    }
  }
}
