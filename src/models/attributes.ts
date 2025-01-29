export class Attributes<T extends Object> {
  constructor(private data: T) {}

  // We are telling here that K can only be one of the keys of T type passed to the function
  // we did this to gurantee that the function will return the right type not union type
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set(updatedData: T): void {
    Object.assign(this.data, updatedData);
  }

  getAll(): T {
    return this.data;
  }
}
