import { User } from './models/user';
import axios from 'axios';

const user = new User({ id: 1, name: 'hello my new name', age: 124124 });

user.on('save', () => {
  // console.log('User was changed , we need to update Html');
  console.log(user);
});

// user.set({ name: 'el attar' });
user.save();
