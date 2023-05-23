import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Domain } from "../../table/table.component";
import { CreateDomainDto, Member } from "../domain/domain.service";

@Injectable({
  providedIn: 'root'
})
export class FtpElementService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public listDirectory(path: string): FtpFile[] {
    return this.httpClient().get
  }

  public addDomain(dto: CreateDomainDto): Observable<Domain[]> {
    return this.httpClient.post<Domain[]>('/domain/create', dto);
  }

  public addUser(userId: number, domainId: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>('/domain/add-user?userId=' +  userId + '&domainId=' + domainId);
  }

  public removeUser(userId: number, domainId: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>('/domain/delete-user?userId=' +  userId + '&domainId=' + domainId);
  }
}
