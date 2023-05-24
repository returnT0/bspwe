import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private domainNameSource = new BehaviorSubject<string>('');
  currentDomainName = this.domainNameSource.asObservable();

  constructor() { }

  changeDomainName(domainName: string) {
    this.domainNameSource.next(domainName)
  }
}
