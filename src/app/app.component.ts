import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from './services/proveedores.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'my-angular-app';

  proveedores: any = [];

  formularioForm: any = null;

  page = 1;
  total : any= [];

  max = 10;

  constructor(
    private proveerdorSerive: ProveedoresService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.loadInitData(this.page)
    this.formularioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      razon_social: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    })
  }

  loadInitData(page: any) {
    this.proveerdorSerive.getAllProveedores(page).subscribe((result: any) => {
      console.log(result)
      this.proveedores = result.list;
      var pages = Math.floor(result.total / this.max);
      if(result.total !== this.max) pages ++;
      for(var i = 0; i < pages; i++) {
        this.total[i] = i;
      };

  })
  }

  open(content: any) {  
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }  

  addProveedor() {

    const data = {
      nombre: this.formularioForm.get('nombre').value,
      razon_social: this.formularioForm.get('razon_social').value,
      direccion: this.formularioForm.get('direccion').value
    }

    this.proveerdorSerive.create(data).subscribe((result: any) => {
      this.loadInitData(this.page)
    },(error: any) => console.log(error))

    this.modalService.dismissAll();

  }

  eliminar(id: any) {
    this.proveerdorSerive.eliminar(id).subscribe(result => {
        console.log(result)
    }, error => console.log(error))
  }
  
}
