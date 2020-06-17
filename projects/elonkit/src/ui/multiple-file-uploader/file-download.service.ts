import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ESFileDownloadService {
  constructor(private httpClient: HttpClient) {}

  public saveAs(
    url: string,
    name: string,
    params: any = null,
    type: string = 'application/pdf'
  ): Observable<any> {
    const responseType = { responseType: 'blob' as 'json' };
    if (params) {
      return this.httpClient
        .post<any>(url, params, responseType)
        .pipe(tap(data => this.save(name, data, type)));
    } else {
      return this.httpClient
        .get<any>(url, responseType)
        .pipe(tap(data => this.save(name, data, type)));
    }
  }

  private save(name: string, data: any, type: string) {
    const blob = new Blob([data], { type });
    saveAs(blob, name);
  }
}
