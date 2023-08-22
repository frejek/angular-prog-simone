import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  /*circleInfoPopup(nome: string, indirizzo: string, lat: string, lon: string): string {                           // dal servizio del marker mi faccio passare i dati del db     
    return `` +                                                           
      `<div><span class="title"> Citta:</span> ${nome}</div>` +
      `<div><span class="title">Indirizzo:</span> ${indirizzo}</div>` +
      `<div><span class="title">LatLon:</span>${lat} ${lon} </div>`
  }*/

  markerInfoPopup(nome: string, indirizzo: string, lat: string, lon: string): string {                           // dal servizio del marker mi faccio passare i dati del db     
    return `` +
      `<div><span class="title">Citta:</span> ${nome}</div>` +
      `<div><span class="title">Indirizzo:</span> ${indirizzo}</div>` +
      `<div><span class="title">LatLon:</span> ${lat} ${lon} </div>`
  }

  polylineInfoPopup(nome_p: string, nome_a: string) : string{
    return `` +
      `<div><span>Connessione:</span> ${nome_p} - ${nome_a}</div>` 
  }
}
