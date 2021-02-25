import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Thumbs } from 'swiper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private af: AngularFireAuth
  ) { }
  createUser(email:string,password:string){
    return this.af.createUserWithEmailAndPassword(email,password);
  }
  login(email:string,password:string){
    return this.af.signInWithEmailAndPassword(email,password);
  }
  logout(){
    return this.af.signOut();
  }
  hasUser()
  {
    return this.af.authState
    // .subscribe(user=>{
    //   console.log(user=null);
    // });
  }
}
