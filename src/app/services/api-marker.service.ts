import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import { Observable, map } from 'rxjs';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class ApiMarkerService {

  //dataGeo: string = '/assets/data/usa_data.geojson';                  // path api default        
  baseUrl: string = "http://localhost/geo_crud_api/markers/";
  // lettura dati dei marker dal database
  getData = this.baseUrl + 'get_marker.php';
  dataMarkers: any;

  constructor(private http: HttpClient, private popupService: PopupService) { }
  
    getMarkers(): Observable<Object> {       // posso mttere anche :any
      return this.http.get(this.baseUrl + 'get_marker.php');
    }

    getSingleMarkerId(id: number) {
      return this.http.get(this.baseUrl + 'get_marker.php?=' +'id');
    }
    
    // recupero tutti  marker dal db e li mostro nella mappa
    //c: any;
    getDataCircleMarkers(map: L.Map): void {                              // Rivevo la Map con le coordinate di partenza
      this.http.get(this.getData).subscribe((response: any)=> {           // ricevo una stringa json
      //console.log(response);
      this.dataMarkers = response; 
      
      /*for (const c of this.dataMarkers.data) {
        let id = c.id[0];
        let nome = c.nome[1];
        let indirizzo = c.indirizzo[2];
        let lat = c.lat[3];
        let lon = c.lon[4];
        let colore = c.colore[5];
        let draggable = c.draggable[6];*/

        // -----------------------------------------------------------------------------------------------------------------------------------------------------
        // GESTIONE CirclerMarker DINAMICO
        /*this.dataMarkers.data.map((c: any) => {
          const circleMarkerItem =  new L.CircleMarker([c.lat, c.lon], { color: c.colore, radius: 30, fillOpacity:0.3, /*fill:false,*/ /*weight:5 },).addTo(map)
            .bindPopup(this.popupService.circleInfoPopup(c.nome, c.indirizzo, c.lat, c.lon)).bindTooltip("Città");
        });*/
        
        //------------------------------------------------------------------------------------------------------------------------------------------------------
        // GESTIONE MARKER DINAMICO
        this.dataMarkers.data.map((c: any) => {
          const markerItem =  L.marker([c.lat, c.lon], {draggable: true}).addTo(map)
            .bindPopup(this.popupService.markerInfoPopup(c.nome, c.indirizzo, c.lat, c.lon)).bindTooltip("Città");
          
          markerItem.on("dblClick", () => {     // oppure posso usare "contextmenu"
            console.log(`Marker della posizione, (${c.nome}) => ${c.lat} / ${c.lon} Marker eliminato!!!`);
            map.removeLayer(markerItem);
          });
        });
        
        //----------------------------------------------------------------------------------------------------------------------------------------------------
        // Centra la telecamera sui marker
        map.fitBounds([
          ...this.dataMarkers.data.map((c: { lat: number; lon: number; }) => [c.lat, c.lon] as [number, number]),
        ]);
        

        // costruisco in modo dinamico Marker
        /* map.fitBounds([
          [c.getLatlon().lat[0], c.getLatlon().lon[0]],
          [c.getLatlon().lat[1], c.getLatlon().lon[1]],
          [c.getLatlon().lat[2], c.getLatlon().lon[2]],
          [c.getLatlon().lat[3], c.getLatlon().lon[3]],
          [c.getLatlon().lat[4], c.getLatlon().lon[4]],
        ]); 
    */    
      //}
    });
  }

  createMarker(nome: string, indirizzo: string, lat: number, lon: number, colore: string, draggable: boolean) {
    return this.http.post(
      this.baseUrl + 'insert_marker.php', 
      {nome, indirizzo, lat, lon, colore, draggable},
    ).pipe(map(marker => {                                // Retorna un oggetto Marker
      return marker;
    }));
  } 

  // Modifica marcatore dal form
  updateMarker(id: number, nome: string, indirizzo: string, lat: number, lon: number, colore: string, draggable: boolean) {
    return this.http.put(                                                                                                      // oerazione put
      this.baseUrl + 'update_marker.php?id=' + id,
      //`${this.baseUrl}update_marker_mod.php?id=${id}`,                    // qeusta va bene 
      {nome, indirizzo, lat, lon, colore, draggable}
    ).pipe(map(marker  => {
      return marker;
    }));                                          // mi restituisce oggetto marker 
  }

  deleteMarker(id: number) {                          // Non devo restituire nessun marker il marker è stato eliminato
    return this.http.delete(this.baseUrl + 'delete_marker.php?id=' + id);
  }
}

  

