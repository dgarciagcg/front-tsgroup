import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoComponent } from './proyecto.component';
import { Routes, RouterModule } from '@angular/router';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { ProgramasComponent } from './programas/programas.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [{
  component: ProyectoComponent,
  path: '',
  children: [
    { path: 'estudiantes', component: EstudiantesComponent },
    { path: 'programas', component: ProgramasComponent },
    { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
    { path: '**', redirectTo: 'estudiantes' }
  ]
}];

@NgModule({
  declarations: [
    ProyectoComponent,
    EstudiantesComponent,
    ProgramasComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class ProyectoModule { }
