import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private http = inject(HttpClient)

  private apiUrl = 'http://localhost:8080/api/incidents';

  constructor() { }

  getAllIncident(): Observable<Incident[]>{
      return this.http.get<Incident[]>(this.apiUrl)
  }

  getByIdIncident(id:number){
    return this.http.get<Incident>( `${this.apiUrl}/${id}`
    );
  }

  createIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(
      this.apiUrl,
      incident
    );
  }

  updateIncident(id: any,incident: Incident): Observable<Incident> {

    return this.http.put<Incident>(
      `${this.apiUrl}/${id}`,incident);
  }

  deleteIncident(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
