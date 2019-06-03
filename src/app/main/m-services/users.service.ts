import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../m-models/User';

@Injectable()
export class UsersService {

  usersRef: AngularFireList<any>;     //Declaring properties to Reference Firebase data
  users: Observable<any[]>;
  user: Observable<any>;

  constructor(private db: AngularFireDatabase) { //Injecting Database
    this.usersRef = this.db.list('users');   //Settinng our property to our database collectionn
    this.users = this.usersRef.snapshotChanges().map(changes => { //maps through database and grabs key
      return changes.map( c => ({key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  getUsers(){  // Setting up Callback Function to retrieve clients
    return this.users;
  }

  newUser(user: User){
    this.usersRef.push(user);
  }

  getUser(id: string){
    this.user = this.db.object('/users/'+id).valueChanges();
    return this.user;
  }

  updateUser(id: string, user: User){
    return this.usersRef.update(id, user);
  }

  deleteUser(id: string){
    return this.usersRef.remove(id);
  }
}
