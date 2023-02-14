import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  // activatedEmitter = new EventEmitter<boolean>(); -- SAME APPROACH AS CODE BELOW
  activatedEmitter = new Subject<boolean>();
}
