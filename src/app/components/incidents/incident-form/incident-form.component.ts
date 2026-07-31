import { Incident } from './../../../models/incident.model';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncidentService } from '../../../service/incident.service';
import { AlertsService } from '../../../service/alerts.service';
@Component({
  selector: 'app-incident-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './incident-form.component.html',
  styleUrl: './incident-form.component.scss'
})
export class IncidentFormComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
  @Input() incident: Incident | null = null;

  incidentService = inject(IncidentService);
  private alertMessage = inject(AlertsService);

  incidentForm: FormGroup;
  constructor(private fb: FormBuilder) {

    this.incidentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      category: ['',],
      priority: ['',],
      status: ['OPEN'],
      reportedBy: [''],
      description: ['', [Validators.required, Validators.minLength(10)]
      ]
    });

  }

  ngOnInit(): void {
    if (this.incident) {
      this.incidentForm.patchValue({
        title: this.incident.title,
        category: this.incident.category,
        priority: this.incident.priority,
        status: this.incident.status,
        reportedBy: this.incident.reportedBy,
        description: this.incident.description
      });
    }
  }

  saveIncident(): void {
    if (this.incidentForm.invalid) {
      this.incidentForm.markAllAsTouched();
      return;
    }
    console.log(
      'Incidente a guardar:',
      this.incidentForm.value
    );

    if (this.incident !== null) {
      this.updateIncident(this.incidentForm.value);
    } else {
      this.incidentService.createIncident(this.incidentForm.value).subscribe(
        {
          next: (data) => {
            this.saved.emit();
            this.alertMessage.success('Incidencia creada', 'La incidencia fue registrada correctamente');
            this.closeModal();
          }, error: (error) => {
            console.error(
              'Error al obtener incidentes',
              error
            );
          }
        });
    }

  }

  closeModal(): void {
    this.close.emit();
  }

  updateIncident(data: any) {
    if (this.incident !== null) {
      const id = this.incident.id;
      this.incidentService.updateIncident(id, data)
        .subscribe({
          next: () => {
            this.alertMessage.success('Incidencia Actualizada', 'La incidencia se actualizo');
            this.saved.emit();
            this.closeModal();
          },
          error: (error) => {
            console.error(
              'Error al actualizar',
              error);
          }
        });
    }
  }
}
