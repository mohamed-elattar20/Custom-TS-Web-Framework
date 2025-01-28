import { User } from './models/user';
import axios from 'axios';

const user = new User({ name: 'record', age: 0 });

user.events.on('change', () => {
  console.log('change');
});
user.events.trigger('change');
