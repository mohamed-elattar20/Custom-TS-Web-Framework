interface UserProps {
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
}
