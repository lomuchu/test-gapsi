import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  url = 'http://localhost:3700/api/proveedor/';

  constructor(
    private http: HttpClient,
    private router: Router,) { }

    getAllProveedores(page = 1){
      return this.http.get(this.url  + page);
    }

    create(data: any) {
      return this.http.post(this.url, data  );
    }

    eliminar(id: any) {
      return this.http.delete(this.url  + id);
    }
}
