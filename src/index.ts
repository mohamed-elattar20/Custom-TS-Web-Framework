import { User } from './models/user';

const user = new User({ name: 'mohamed', age: 26 });

console.log(user.get('name'));
user.set({ name: 'mohamed ' });
console.log(user);
