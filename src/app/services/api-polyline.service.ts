import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Observable, map } from 'rxjs';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class ApiPolylineService {
  //dataGeo: string = '/assets/data/usa_data.geojson';                  // path api default        
  baseUrl: string = "http://localhost/geo_crud_api/polylines/";
  dataPolylines: any;

  constructor(private http: HttpClient, private popupService: PopupService) { }

  getPolylines(): any {
    return this.http.get(this.baseUrl + 'get_polyline.php');
  }

  getSinglePolyline(id: number) {
    return this.http.get(this.baseUrl + 'get_polyline.php?=' + id);
  }

  getPolylinesMap(map: L.Map) {
    this.http.get(this.baseUrl + 'get_polyline.php').subscribe((res: any) => {
      //console.log(res);
      this.dataPolylines = res;

      //this.dataPolylines = JSON.parse(JSON.stringify(res));  
       
      // Polyline dinamicamente
      /*for(const p of this.dataPolylines.data) {
        const id = p['id'];
        const nome_p = p['nome_p'];
        const nome_a = p['nome_a'];
        const lat_p = p['lat_p'];
        const lon_p = p['lon_p'];
        const lat_a = p['lat_a'];
        const lon_a = p['lon_a'];
        const colore = p['colore'];
        
        // console.log(colore);                             // mi stampa tutti i colori che ho scelto per i poligoni

        // costruisco in modo dinamico Polyline 
        const latLng: [number, number][] = [
          [lat_p, lon_p],
          [lat_a, lon_a]
        ];

        const polyline = L.polyline(latLng, {color: colore}).addTo(map);      // gli sto passando il valore del colore #00800, forse gli devo passare la chiave blue fuxia  quindi [color.label]
        
      }})}*/ 
      
      // Ho creato Polyline in modo dinamico
      this.dataPolylines.data.map((p: any) => {
        const latLng: [number, number][] = [
          [p.lat_p, p.lon_p],
          [p.lat_a, p.lon_a]
        ];
        const polyline = L.polyline(latLng, {color: p.colore}).addTo(map)
        .bindPopup(this.popupService.polylineInfoPopup(p.nome_p, p.nome_a));
      });
    });
  }

  createPolyline(nome_p: string, mome_a: string, lat_p: number, lon_p: number, lat_a: number, lon_a: number, colore: string) {
    return this.http.post(
      // `${this.baseUrl}insert_polyline.php`,
      this.baseUrl + 'insert_polyline.php',
      {nome_p, mome_a, lat_p, lon_p, lat_a, lon_a, colore}
    ).pipe(map(polyline => {
      return polyline;
    }));
  }

  updatePolyline(id: number, nome_p: string, mome_a: string, lat_p: number, lon_p: number, lat_a: number, lon_a: number, colore: string) {
    return this.http.put(
     // `${this.baseUrl}update_polyline.php?=${id}`,
     this.baseUrl + 'update_polyline.php?id=' + id,
     {nome_p, mome_a, lat_p, lon_p, lat_a, lon_a, colore} 
    ).pipe(map(polyline => {
      return polyline;
    }));
  }

  deletePolyline(id: number) {
    return this.http.delete(
      this.baseUrl + 'delete_polyline.php?id=' + id,
    );
  }


}
