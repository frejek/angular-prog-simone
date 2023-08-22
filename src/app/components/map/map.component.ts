import { AfterViewInit, Component, OnInit, } from '@angular/core';
import * as L from 'leaflet';

import { Marker } from '../../models/marker.model';
import { ApiMarkerService } from 'src/app/services/api-marker.service';
import { ApiPolylineService } from 'src/app/services/api-polyline.service';

// Mi costruisce i Marker
const iconRetinaUrl = 'assets/marker-icon-2x.png';                      // icona goccia
const iconUrl = 'assets/marker-icon.png';                               // icona
const shadowUrl = 'assets/marker-shadow.png';                           // ombreggiatura
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],      
  popupAnchor: [1, -34],      
  tooltipAnchor: [16, -28],   
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit{
  private map!: L.Map;
  positionMarkers: any;

  constructor(private apiMarkerService: ApiMarkerService, private apiPolylineService: ApiPolylineService) {}

  ngOnInit(): void {}                                                       // Vengono inializzati tutti i componenti prima
  
  ngAfterViewInit(): void {                                                 // Una volta fatta l'inializzazione vado ad inializzare la mia mappa
    this.initMap();
    
    // this.markerService.readDataMarker(this.map);
    // DATI PRESI DAL DATABASE
    this.apiMarkerService.getDataCircleMarkers(this.map);                  // leggo i dati dal database Al servizio passo la mappa in modo tale da poterla gestire nel servizio
    this.apiPolylineService.getPolylinesMap(this.map);
    //this.apiMarkerService.clearMarkers(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      // center: [ 45.4561, 9.1296 ],                               // Posizione di partenza
      center: [0, 0],  
      zoom: 12
    }).setView([40.712728, -74006015], 12); 
     

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    
    
    const options = {
      draggable: true
    }
    
    //------------------------------------------------------------------------------------------------------------------------------------------
    // Come camera di partenza prende quella che ho impostato nel servizio in api.marker.service

    // INSERIMENTO DELL'IMMAGINE in Popup
    const libertyStatueImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Odaiba_Statue_of_Liberty.jpg/330px-Odaiba_Statue_of_Liberty.jpg";
    const libertyStatueMarker = L.marker([40.684209, -74.044425]).addTo(this.map).bindPopup(`
      <h5>Statua della libertà</h5>
      <p>La statua della Libertà è probabilmente il monumento più famoso della città di New York e di tutti gli Stati Uniti d'America.</p>
      <img src="${libertyStatueImg}" />
    `);
    // .openPopup();
    
    const brooklynBridgeImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Brooklyn_Bridge_-_New_York_City.jpg/390px-Brooklyn_Bridge_-_New_York_City.jpg";
    const brooklynBridgeMarker = L.marker([40.706344, -73.997439]).bindPopup(`
      <h5 class="brooklyn_title">Ponte di brooklyn</h5>
      <p>Il ponte di Brooklyn (in inglese Brooklyn Bridge), completato nel 1883 su progetto dell'ingegnere tedesco John Augustus Roebling.</p>
      <img src="${brooklynBridgeImg}" />
    `).addTo(this.map);
    
    const popupItem = L.popup().setLatLng([40.712728, -74006015]).setContent('<h2>New York</h2>')
    
    this.map.fitBounds([
      [libertyStatueMarker.getLatLng().lat, libertyStatueMarker.getLatLng().lng],
      [brooklynBridgeMarker.getLatLng().lat, brooklynBridgeMarker.getLatLng().lng],
      [popupItem.getLatLng()!.lat, popupItem.getLatLng()!.lng]
    ]);

    //-----------------------------------------------------------------------------------------------------------------------------------------------------
    
    //let markerItem: L.Marker<any>;
    let mapClickCount = 0;
    this.map.on('click', (e: {
      latlng: L.LatLng
    }) => {  
      mapClickCount = 1;                                                            // Menu contestuale
      // console.log('click', e.latlng.lat, e.latlng.lng);                          // Il tipo di azione  
      
      setTimeout(() => {
        // Creo il marker dopo 250ms
        if(mapClickCount === 1) {
          console.log('click', e.latlng.lat, e.latlng.lng);   
          console.log("Ho aggiunto un marker perchè sono trascorsi 250ms, altrimenti creo un Circle");
          const markerItem = L.marker(e.latlng).addTo(this.map).bindPopup(e.latlng.toString()).addTo(this.map);
          mapClickCount = 0;
          markerItem.on('contextmenu', (e: {latlng: L.LatLng}) => this.map.removeLayer(markerItem))
            .bindTooltip(`"click dx cancella marker. <br> LatLng: " ${e.latlng.lat} ${e.latlng.lng}`);
        }                                                                         
      },  250);
    });

    this.map.on('dblclick', (e: {
      latlng: L.LatLng
    }) => {                                                                     // Menu contestuale
      console.log('dbclick', e.latlng.lat);                                     // Il tipo di azione  
      mapClickCount = 0;
      const markerCircle = L.circleMarker(e.latlng, {
        color: 'orange',
      }).addTo(this.map).bindPopup(e.latlng.toString());                        // lo converto in una stringa
      console.log("Ho aggiunto un circle perchè sono trascorsi meno di 250ms");
      markerCircle.on('contextmenu', (e: {latlng: L.LatLng}) => this.map.removeLayer(markerCircle))
        .bindTooltip(`"click dx cancella circle. <br> LatLng: " ${e.latlng.lat} ${e.latlng.lng}`);
    });

    // QUA HO AGGIUNTO ANCHE IL POLYLINE
    /*let clickMap = 0;                                           // Inializzazione del conteggio
    const points: Array<L.LatLng> = [];

    // quando smettiamo di fare clic due volte creo il polyline             // ORIGINALE
    this.map.on('mousedown', (e: {latlng: L.LatLng}) => {
      console.log('mousedown', e.latlng);
      points.push(e.latlng);                                                // aggiungo al vettore l'ultima posizione
      clickMap +=1;
      if(clickMap === 2) {
        const polyline = L.polyline(points, {
          color: 'green', weight: 3                            
        }).addTo(this.map);
        polyline.on('contextmenu', (e: {latlng: L.LatLng}) => this.map.removeLayer(polyline))
        .bindTooltip("click dx cancella polyline");
        
        clickMap = 0;                                               // riporto il conteggioa zero lo rinializzo
        points.length = 0;
      }
    });*/







//-------------------------------------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
// Eventi di localizazione  - OTTENGO LA MIA LOCALIZZAZIONE --- INTERESSANTE

// clic dx -> console -> ... -> Moore tools -> sensors

// this.map.on('locationfound', (e:) => console.log('found', e));    // base
/*
this.map.on('locationfound', (e: {
  accuracy: number, latlng: L.LatLng
}) => {
  const markerItem =  L.marker(e.latlng).addTo(this.map).bindPopup("La mia posizione");
  L.circle(e.latlng, {
    // radius: e.accuracy,
    radius:20,
    color: 'red',
  }).addTo(this.map);
  this.map.fitBounds([
    [markerItem.getLatLng().lat, markerItem.getLatLng().lng]
  ]);
  
});

// this.map.on('locationerror', (e) => console.log('error', e));     // base
this.map.on('locationerror', (e: {message: string}) => console.log('error', e));

this.map.locate();
*/

  /*
    castelloSforzesco.on("click", () => console.log("click"));
    castelloSforzesco.on("dbclick", () => console.log("Doble click"));
    castelloSforzesco.on("mousedown", () => console.log("Cliccando con il puntatore del mouse sopra l'elemento - mouseup"));
    castelloSforzesco.on("mouseup", () => console.log("Smetto di fare click - mousep"));
    castelloSforzesco.on("mouseover", () => console.log("Mouseover - Psso sopra con il mouse sopra l'elemento"));
    castelloSforzesco.on("mouseout", () => console.log("Mouseout - Esco con il mouse dall'elemento"));
    castelloSforzesco.on("contextmenu", () => console.log("contextmenu - Click dx del mouse per aprire un menu contestuale"));
  */

    

  }


  
}
