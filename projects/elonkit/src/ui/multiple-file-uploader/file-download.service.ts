import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ESFileDownloadService {
  constructor(private httpClient: HttpClient) {}

  public saveAs(url: string, name: string, type: string = 'application/pdf'): Observable<any> {
    const responseType = { responseType: 'blob' as 'json' };
    return this.httpClient.get(url, responseType).pipe(tap(data => this.save(name, data, type)));
  }

  private save(name: string, data: any, type: string): void {
    const blob = new Blob([data], { type });
    saveAs(blob, name);
  }
}
