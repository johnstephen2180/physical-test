import {Role} from './role';

export class User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  avatar: string;
  firstName: string;
  lastName: string;
  roles: [Role];
  token: string;
}
