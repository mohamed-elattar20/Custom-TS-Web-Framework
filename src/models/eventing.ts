type CallbackFn = () => void;
type EventType = { [key: string]: CallbackFn[] };
export class Eventing {
  events: EventType = {};

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
