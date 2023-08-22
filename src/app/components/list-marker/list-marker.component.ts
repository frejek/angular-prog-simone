import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMarkerService } from 'src/app/services/api-marker.service';

@Component({
  selector: 'app-list-marker',
  templateUrl: './list-marker.component.html',
  styleUrls: ['./list-marker.component.css']
})
export class ListMarkerComponent {
  id: any;
  singleMarker: any;

  constructor(private apiMarkerService: ApiMarkerService, private router: Router) {}

  ngOnInit() {
      this.apiMarkerService.getSingleMarkerId(this.id).subscribe((res: any) => {
      this.singleMarker = res;
        
        /*let nome;
        let indirizzo;
        let lat;
        let lon;
        let colore;
        let draggable;

        for (let c of this.singleMarker.data) {  // scandisco i dati del singolo marker
          const id = c.id[0];
          const nome = c.nome[1];
          const indirizzo = c.indirizzo[2];
          const lat = c.lat[3];
          const lon = c.lon[4];
          const colore = c.colore[5];
          const draggable = c.draggable[6];
        }*/
      });
  }

  home() {
    this.router.navigate(['/']);
  }
}
