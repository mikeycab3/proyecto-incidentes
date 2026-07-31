import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incidentFilter',
  standalone: true
})
export class IncidentFilterPipe implements PipeTransform {

   transform(incidents: any[], searchText: string): any[] {

    if (!incidents || !searchText) {
      return incidents;
    }

    const search = searchText.toLowerCase().trim();

    return incidents.filter(incident =>
      incident.title?.toLowerCase().includes(search) ||
      incident.description?.toLowerCase().includes(search)
    );
  }

}
