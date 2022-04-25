import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Programa } from 'src/app/interfaces/programa.interface';
import { ProgramasService } from 'src/app/services/programas.service';

// Alertify
declare let alertify: any;

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.css']
})
export class ProgramasComponent implements OnInit {

  formularioCrear = new FormGroup({});
  formularioEditar = new FormGroup({});

  programas: Programa[] = [];
  programa!: Programa;

  constructor(
    private fb: FormBuilder,
    private programasService: ProgramasService
  ) { }

  ngOnInit(): void {
    this.initFormCrear();
    this.initFormEditar();
    this.getProgramas();
  }

  /** Inicializa el formulario del estudiante con la validaciones por defecto */
  initFormCrear = () => {
    this.formularioCrear = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  /** Inicializa el formulario del estudiante con la validaciones por defecto */
  initFormEditar = () => {
    this.formularioEditar = this.fb.group({
      id_programa: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  savePrograma = () => {
    this.programasService.savePrograma(this.formularioCrear.value).subscribe((response: any) => {
      this.getProgramas();
      this.initFormCrear();
    });
  }

  updatePrograma = () => {
    this.programasService.updatePrograma(this.formularioEditar.value).subscribe((response: any) => {
      this.getProgramas();
      this.initFormCrear();
      this.initFormEditar();
    });
  }

  getProgramas = () => {
    this.programasService.getProgramas().subscribe((response: any) => {
      this.programas = response;
    })
  }

  getPrograma = (id_programa: any) => {
    this.programasService.getPrograma(id_programa).subscribe((response: any) => {
      this.programa = response[0];
      this.setValuePrograma(this.programa);
    })
  }

  deletePrograma = (id_programa: any) => {
    this.programasService.deletePrograma(id_programa).subscribe((response: any) => {
      this.getProgramas();
    })
  }

  setValuePrograma = (programa: any) => Object.keys(programa).forEach(elm =>
    this.formularioEditar.get(elm)?.setValue(programa[elm])
  );

}
