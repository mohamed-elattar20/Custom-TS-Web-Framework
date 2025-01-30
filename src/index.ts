import { User } from './models/user';
import { UserEdit } from './views/user-edit';
import { UserForm } from './views/user-form';

const user = User.buildUser({ name: 'mohamed khaled', age: 26 });
const userEdit = new UserEdit(document.getElementById('root')!, user);
userEdit.render();
console.log(userEdit);
