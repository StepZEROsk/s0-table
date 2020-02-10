import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../entities/user';

@Injectable()
export class UserRestService {
  getAll(): Observable<User[]> {
    let data = [];

    for (let i = 0; i < 20; i++) {
      data = [...data, ...[
        {
          id: 1,
          email: 'test@test.com',
          phone: '+421000111222',
          firstName: 'Luke',
          lastName: 'Skywalker',
          photoUrl: '/assets/images/luke-skywalker.png',
          address: {
            street: 'Desert road',
            streetNo: '1',
            zip: '00000',
            city: 'Tatooine',
            country: 'Tatooine',
          },
          status: 'ACTIVE',
          role: 'ADMIN',
        },
        {
          id: 2,
          email: 'test@test.com',
          phone: '+421000111222',
          firstName: 'Obi-Wan',
          lastName: 'Kenobi',
          photoUrl: '/assets/images/obi-wan-kenobi.png',
          address: {
            street: 'Desert road',
            streetNo: '1',
            zip: '00000',
            city: 'Tatooine',
            country: 'Tatooine',
          },
          status: 'INACTIVE',
          role: 'ADMIN',
        }
      ]];
    }
    return of(data);
  }
}
