import {Address} from './address';

export interface User {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: Address;
  photoUrl: string;
  status: 'ACTIVE' | 'INACTIVE';
  role: 'USER' | 'ADMIN';
}
