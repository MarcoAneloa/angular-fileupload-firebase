import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/fil-item';

@Directive({
  selector: '[appDropfiles]'
})
export class DropfilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  private _archivoPuedeSercargado(archivo: File) {
    if (!this._aerchivoYaDrop(archivo.name) && this._esImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    this.mouseSobre.emit(false);
    const transferencia = this._getTranferencia(event);

    if (!transferencia) {
      return;
    }

    this._extraerArchivos(transferencia.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit(false);

  }

  private _getTranferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {
    console.log(archivosLista);
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      console.log(propiedad);
      const archivoTemporal = archivosLista[propiedad];
      if(this._archivoPuedeSercargado(archivoTemporal)){
        const nuevoarchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoarchivo);
      }
    }
    console.log(this.archivos);
  }

  // Validaciones
  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _aerchivoYaDrop(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo == nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + 'ya esta agregado');
        return true;
      }
    }
    return false;
  }

  private _esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }
}
