import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Programa } from '../interfaces/programa.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  ruta = 'http://192.168.1.50:8000/api';

  constructor(private http: HttpClient) { }

  savePrograma = (data: any): Observable<any> => {
    return this.http.post(`${this.ruta}/programa/save-programa`, data);
  }

  getPrograma = (id_programa: number): Observable<Programa> => {
    return this.http.get<Programa>(`${this.ruta}/programa/traer-programa/${id_programa}`);
  }

  getProgramas = (): Observable<Programa[]> => {
    return this.http.get<Programa[]>(`${this.ruta}/programa/traer-programas`);
  }

  getEstudiantesPrograma = (id_programa: number): Observable<Programa[]> => {
    return this.http.get<Programa[]>(`${this.ruta}/programa/traer-programas/${id_programa}`);
  }

  updatePrograma = (data: any): Observable<any> => {
    return this.http.post(`${this.ruta}/programa/update-programa`, data);
  }
  
  deletePrograma = (id_programa: number): Observable<any> => {
    return this.http.delete<any>(`${this.ruta}/programa/delete-programa/${id_programa}`);
  }
}
