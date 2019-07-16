import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private subject = new Subject<any>();
  private subject2 = new Subject<any>();

  constructor() { }

  sendEvent(id: any, name: string) {
    return this.subject.next({id: id, name: name})
  }

  sendEvent2(id: number) {
    return this.subject2.next(id)
  }

  listenEvent(): Observable<any> {
    return this.subject.asObservable();
  };

  listenEvent2(): Observable<any> {
    return this.subject2.asObservable();
  }

  clearUser() {
    return this.subject.next();
  }
}
