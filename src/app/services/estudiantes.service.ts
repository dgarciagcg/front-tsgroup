import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  ruta = 'http://192.168.1.50:8000/api';

  constructor(private http: HttpClient) { }

  saveEstudiante = (data: any): Observable<any> => {
    return this.http.post(`${this.ruta}/estudiante/save-estudiante`, data);
  }

  getEstudiante = (id_estudiante: number): Observable<Estudiante> => {
    return this.http.get<Estudiante>(`${this.ruta}/estudiante/traer-estudiante/${id_estudiante}`);
  }

  getEstudiantes = (): Observable<Estudiante[]> => {
    return this.http.get<Estudiante[]>(`${this.ruta}/estudiante/traer-estudiantes`);
  }

  getEstudiantesPrograma = (id_programa: number): Observable<Estudiante[]> => {
    return this.http.get<Estudiante[]>(`${this.ruta}/estudiante/traer-estudiantes/${id_programa}`);
  }

  updateEstudiante = (data: any): Observable<any> => {
    return this.http.post(`${this.ruta}/estudiante/update-estudiante`, data);
  }
  
  deleteEstudiante = (id_estudiante: number): Observable<any> => {
    return this.http.delete<any>(`${this.ruta}/estudiante/delete-estudiante/${id_estudiante}`);
  }
}
