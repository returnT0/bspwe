import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import { Observable } from "rxjs";
import {FolderElement} from "../../details/details.component";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public listDirectory(path: string, domainId?: number): Observable<FolderElement> {
    return this.httpClient.get<FolderElement>('file/list?path=' + path + '&domainId=' + domainId);
  }

  public uploadFile(body: FileUploadDto): Observable<any> {
    const req = new HttpRequest(
      'POST',
      'file/upload?domainId=' + body.domainId + '&path=' + body.path + '&fileName=' + body.fileName, body.data, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  public downloadFile(fileName: string, path: string, domainId?: number): Observable<any> {
    return this.httpClient.get<Blob>(
      'file/download?fileName=' + fileName + '&path=' + path + '&domainId=' + domainId
    );
  }

  public deleteFile(fileName: string, path: string, domainId?: number): Observable<FolderElement> {
    return this.httpClient.get<FolderElement>(
      'file/delete?name=' + fileName + '&path=' + path + '&domainId=' + domainId
    );
  }

  public createDirectory(directoryName: string, path: string, domainId?: number): Observable<FolderElement> {
    return this.httpClient.get<FolderElement>(
      'file/make-dir?name=' + directoryName + '&path=' + path + '&domainId=' + domainId
    );
  }

  public deleteDirectory(directoryName: string, path: string, domainId?: number): Observable<FolderElement> {
    return this.httpClient.get<FolderElement>(
      'file/remove-dir?name=' + directoryName + '&path=' + path + '&domainId=' + domainId
    );
  }

}

export interface FileUploadDto {
  fileName: string;
  data: FormData;
  path: string;
  domainId?: number;
}
