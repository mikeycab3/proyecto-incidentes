import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'incidentes',
    pathMatch: 'full'
  },
  {
    path: 'incidentes',
    loadComponent: () =>
      import(
        './components/incidents/incident-list/incident-list.component'
      )
      .then(
        m => m.IncidentListComponent
      )
  },
  {
    path: 'incidentes/nuevo',
    loadComponent: () =>
      import(
        './components/incidents/incident-form/incident-form.component'
      )
      .then(
        m => m.IncidentFormComponent
      )
  },
  {
    path: 'incidentes/editar/:id',
    loadComponent: () =>
      import(
        './components/incidents/incident-form/incident-form.component'
      )
      .then(
        m => m.IncidentFormComponent
      )
  }
];
