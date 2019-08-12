import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/fil-item';
import { CargaImagenService } from '../../services/carga-imagen.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  estaSobreDrop = false;
  archivos: FileItem[] = [];

  constructor(private _cargaImagenService: CargaImagenService) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this._cargaImagenService.cargarImagenesFirebase(this.archivos);
  }

  limpiarArchivos() {
    this.archivos = [];
  }

}
