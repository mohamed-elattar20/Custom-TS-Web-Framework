import { User } from './models/user';

const user = new User({ name: 'mohamed', age: 26 });

console.log(user.get('name'));
user.set({ name: 'mohamed ' });

user.on('click', () => {
  console.log('hello');
});
user.on('hover', () => {
  console.log('yssssssss');
});
user.on('mouseover', () => {
  console.log('mouseOverrrrrrr');
});
user.on('click', () => {
  console.log('get back to work second time');
});

user.trigger('click');

console.log(user.events);
