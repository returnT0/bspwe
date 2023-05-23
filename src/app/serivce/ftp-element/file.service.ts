import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public listDirectory(path: string, domainId: number): Observable<DirectoryElement[]> {
    return this.httpClient.get<DirectoryElement[]>('/file/list?path=' + path + '&domainId=' + domainId);
  }

  public uploadFile(body: FileUploadDto): Observable<DirectoryElement[]> {
    return this.httpClient.post<DirectoryElement[]>('/file/upload', JSON.stringify(body));
  }

  public downloadFile(fileName: string, path: string, domainId: number): Observable<File> {
    return this.httpClient.get<File>(
      '/file/download?name=' + fileName + '&path=' + path + '&domainId=' + domainId
    );
  }

  public deleteFile(fileName: string, path: string, domainId: number): Observable<DirectoryElement[]> {
    return this.httpClient.get<DirectoryElement[]>(
      '/file/delete?name=' + fileName + '&path=' + path + '&domainId=' + domainId
    );
  }

  public createDirectory(directoryName: string, path: string, domainId: number): Observable<DirectoryElement[]> {
    return this.httpClient.get<DirectoryElement[]>(
      '/file/make-dir?name=' + directoryName + '&path=' + path + '&domainId' + domainId
    );
  }

  public deleteDirectory(directoryName: string, path: string, domainId: number): Observable<DirectoryElement[]> {
    return this.httpClient.get<DirectoryElement[]>(
      '/file/remove-dir?name=' + directoryName + '&path=' + path + '&domainId=' + domainId
    );
  }

}

export interface DirectoryElement {
  name: string;
  type: string;
}

export interface FileUploadDto {
  fileName: string;
  file: File;
  path: string;
  domainId: number;
}
