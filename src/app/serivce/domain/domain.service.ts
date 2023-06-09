import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Domain } from "../../domain/domain.component";

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public getAll(): Observable<Domain[]> {
    return this.httpClient.get<Domain[]>('domain/list');
  }

  public addDomain(dto: CreateDomainDto): Observable<Domain[]> {
    return this.httpClient.post<Domain[]>('domain/create', dto);
  }

  public addUser(userId: number, domainId: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>('domain/add-user?userId=' +  userId + '&domainId=' + domainId);
  }

  public removeUser(userId: number, domainId: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>('domain/delete-user?userId=' +  userId + '&domainId=' + domainId);
  }

}

export interface CreateDomainDto {
  domainName: string;
}

export interface Member {
  username: string,
  firstName: string,
  lastName: string
}
