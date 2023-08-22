import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { ApiMarkerService } from 'src/app/services/api-marker.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  private map!: L.Map;
  constructor(private router: Router, private apiMarkerService: ApiMarkerService) {}

  onCreateMarker() {
    this.router.navigate(['/create-marker']);
  }

  // questo deve essere fatto direttamente dalla mappa PER ORA LO METTO MA NON SERVE
  onUpdateMarker() {
    this.router.navigate(['/update-marker']);
  }


  onCreatePolyline() {
    this.router.navigate(['/create-polyline']);
  }

  
  // questo deve essere fatto direttamente dalla mappa PER ORA LO METTO MA NON SERVE
  onUpdatePolyline() {
    this.router.navigate(['/update-polyline']);
  }

  onListMarker() {
    this.router.navigate(['/list-marker']);
  }

  onDeleteMarker() {
   this.router.navigate(['/delete-marker']);
  }

  onDeletePolyline() {
    this.router.navigate(['/delete-polyline']);
  }

  //onPolyline() {
  //  this.router.navigate(['/polyline']);
  //}
}
  


