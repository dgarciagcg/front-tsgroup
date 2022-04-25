import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from 'src/app/interfaces/estudiante.interface';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

// Alertify
declare let alertify: any;

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  formularioCrear = new FormGroup({});
  formularioEditar = new FormGroup({});

  estudiantes: Estudiante[] = [];
  estudiante!: Estudiante;
  id_estudiante!: number;

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudiantesService
  ) { }

  ngOnInit(): void {
    this.initFormCrear();
    this.initFormEditar();
    this.getEstudiantes();
  }

  /** Inicializa el formulario del estudiante con la validaciones por defecto */
  initFormCrear = () => {
    this.formularioCrear = this.fb.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  /** Inicializa el formulario del estudiante con la validaciones por defecto */
  initFormEditar = () => {
    this.formularioEditar = this.fb.group({
      id_estudiante: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  saveEstudiante = () => {
    this.estudiantesService.saveEstudiante(this.formularioCrear.value).subscribe((response: any) => {
      this.getEstudiantes();
      this.initFormCrear();
    });
  }

  updateEstudiante = () => {
    this.estudiantesService.updateEstudiante(this.formularioEditar.value).subscribe((response: any) => {
      this.getEstudiantes();
      this.initFormCrear();
      this.initFormEditar();
    });
  }

  getEstudiantes = () => {
    this.estudiantesService.getEstudiantes().subscribe((response: any) => {
      this.estudiantes = response;
    })
  }

  getEstudiante = (id_estudiante: any) => {
    this.estudiantesService.getEstudiante(id_estudiante).subscribe((response: any) => {
      this.estudiante = response[0];
      this.setValueEstudiante(this.estudiante);
    })
  }

  deleteEstudiante = (id_estudiante: any) => {
    this.estudiantesService.deleteEstudiante(id_estudiante).subscribe((response: any) => {
      this.getEstudiantes();
    })
  }

  setValueEstudiante = (estudiante: any) => Object.keys(estudiante).forEach(elm =>
    this.formularioEditar.get(elm)?.setValue(estudiante[elm])
  );
}
