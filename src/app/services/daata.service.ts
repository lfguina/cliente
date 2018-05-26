import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private idurl = new BehaviorSubject<string>("default message");
  currentIdUrl= this.idurl.asObservable();

  constructor() { }

  changeIdUrl(id: string) {
    this.idurl.next(id)
  }

}