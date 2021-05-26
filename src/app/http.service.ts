import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from 'primeng/api';
import { law } from './law.interface';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  dataUrl = 'assets/data2.json';
  lawDataUrl = 'assets/law.json';


  getData() {
    return this.http.get<TreeNode[]>(this.dataUrl);
  }

  getLawData() {
    return this.http.get<law[]>(this.lawDataUrl);
  }
}
