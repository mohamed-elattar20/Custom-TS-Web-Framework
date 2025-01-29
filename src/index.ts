import { User } from './models/user';
import { UserForm } from './views/user-form';

const user = User.buildUser({ name: 'mohamed khaled', age: 26 });
const userForm = new UserForm(document.getElementById('root')!, user);

userForm.render();
