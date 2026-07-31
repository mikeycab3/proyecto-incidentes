import { Component, inject, NgModule, OnInit } from '@angular/core';
import { IncidentService } from '../../../service/incident.service';
import { Incident } from '../../../models/incident.model';
import { CommonModule } from '@angular/common';
import { IncidentFormComponent } from '../incident-form/incident-form.component';
import { AlertsService } from '../../../service/alerts.service';
import { IncidentFilterPipe } from '../../../pipes/incident-filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [ FormsModule, CommonModule, IncidentFormComponent, IncidentFilterPipe],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.scss'
})
export class IncidentListComponent implements OnInit {
  selectedIncident: Incident | null = null;
  incidents: Incident[] = [];
  showModal = false;
  searchText: string = '';
  statusText: string = '';

  private alertMessage = inject(AlertsService);

  private incidentService = inject(IncidentService);

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Incidente' },
    { key: 'description', label: 'Descripción' },
    { key: 'priority', label: 'Prioridad' },
    { key: 'status', label: 'Estado' },
    { key: 'createdAt', label: 'Fecha Alta' },
    { key: 'updatedAt', label: 'Fecha Actualizacion' }
  ];

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents() {
    this.incidentService.getAllIncident().subscribe({
      next: (data) => {
        this.incidents = data;
        console.log(this.incidents);
      }, error: (error) => {
        console.error(
          'Error al obtener incidentes',
          error
        );
      }
    })
  };

  deleteIncident(id: number) {
    if (!confirm('¿Deseas eliminar esta incidencia?')) {
      return;
    }

    this.incidentService.deleteIncident(id)
      .subscribe({
        next: () => {
          this.alertMessage.toastSuccess(
            'Incidencia eliminada'
          );
          this.loadIncidents();
        },
        error: (error) => {
          console.error(
            'Error al eliminar',
            error
          );
        }
      });
  }
  getValue(incident: any, key: string): any {
    return incident[key];
  }

  openNewIncident(): void {
    this.showModal = true;
  }

  onIncidentSaved(): void {
    console.log('Recargando lista...');
    this.closeModal();
    this.loadIncidents();
  }

  openEditIncident(incident: Incident): void {
    this.selectedIncident = { ...incident };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedIncident = null;
  }
}
