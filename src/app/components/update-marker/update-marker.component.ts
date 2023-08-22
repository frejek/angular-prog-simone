import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiMarkerService } from 'src/app/services/api-marker.service';

@Component({
  selector: 'app-update-marker',
  templateUrl: './update-marker.component.html',
  styleUrls: ['./update-marker.component.css']
})
export class UpdateMarkerComponent implements OnInit {
  
  // queste due proprietà le leghiamo con il valore "value" selezionato nel tag select attraverso il Two away Binding l'associazione a due vie per mostrare 
  // in html il colore esadecimale scelto
  selectedValueColor!: string;                          // PICCOLA NOTA PER ME :questo valore poi lo devo passare all'pi per inserirlo nel database
  selectedValueDraggable!: boolean;
  // value!: boolean;                                   // ERA PRIMA
  updateMarkerForm!: FormGroup;                               // variabile di template che contiene tutti i dati del form a cui posso accedere
  dataMarkers: any;

  public allColors: any[] = [                        // ANDRO A COLORARE COME MARKER I cirgleMarker
    {label: 'bianco', value: 'ffffff'},             
    {label: 'nero', value: '000000'},               
    {label: 'acqua', value: '00ffff'},              
    {label: 'blue', value: '0000ff'},               
    {label: 'fuchsia', value: 'ff00ff'},            
    {label: 'grey', value: '808080'},               
    {label: 'green', value: '008000'},              
    {label: 'lime', value: '00ff00'},               
    {label: 'marrone', value: '800000'},            
    {label: 'navy', value: '000080'},               // viola tendente al blu
    {label: 'olive', value: '808000'},              // olive
    {label: 'purple', value: '800080'},             // viola
    {label: 'red', value: 'ff0000'},                
    {label: 'silver', value: 'c0c0c0'},             // grigio chiaro
    {label: 'teal', value: '008080'},               // verde mare
    {label: 'yellow', value: 'ffff00'},             
  ];

  constructor(public fb: FormBuilder, private router: Router, private http: HttpClient, private apiMarkerService: ApiMarkerService) {

    this.updateMarkerForm = fb.group({
      'id': ['', Validators.required],
      'nome': ['', Validators.required],                  // Posso specificare il placeholder su 'nome' se volessi
      'indirizzo': ['', Validators.required],
      'lat': ['', Validators.required],
      'lon': ['', Validators.required],
      'colore': ['colore',Validators.required],
      'draggable': ['draggable', Validators.required]     // se non volessimo mettere draggable obbligatorio basta mettere  'draggable': [''] 
    });
  }

  //markers: any;
  //listingdata:Array<any> = [];
  ngOnInit(): void {
    // Vado a prendere nel db la lista aggiornata dei marker e mostro la lista aggiornata
    this.apiMarkerService.getMarkers().subscribe((res: any) => {                       // dal db arriva una stringa json  
      //this.listingdata = this.dataMarkers.results.row;
      // this.dataMarkers = res;                                                         
      //this.dataMarkers = res.data;                               
      this.dataMarkers = JSON.parse(JSON.stringify(res));                             // oppure   JSON.parse(JSON.stringify(res));             
      
      /*for(const c of this.dataMarkers.data) {
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

  onSubmit(): void {
    // un controllo che ho messo in più
    if(!this.updateMarkerForm.valid) {
      alert("Compilarte tutti i campi obbligatori");
      return;
    } 
  
    // Leggo i dati del form
    let id = this.updateMarkerForm.value.id;
    let nome = this.updateMarkerForm.value.nome; 
    let indirizzo = this.updateMarkerForm.value.indirizzo;
    let lat = this.updateMarkerForm.value.lat;
    let lon = this.updateMarkerForm.value.lon;
    let colore = this.updateMarkerForm.value.colore;
    let draggable = this.updateMarkerForm.value.draggable;
    
    // pipe() trasforma i dati osservabili di origine in un prodotto finito. La si può vedere come una materia prima che subisce una serie di fermate prima di diventare 
    // un prodotto finito. Nel mio caso mi aiuta a formattare e trasformare i dati da visualizzare nel mio template. Mentra first() restituisce il primo valore
    // o il primo risultato a seguito della valutazione di una espressione.
    this.apiMarkerService.updateMarker(id, nome, indirizzo, lat, lon, colore, draggable).pipe(first()).subscribe((data: any) => {  // ricevo l'oggetto marker su data appena
      console.log(data);
      this.router.navigate(['/']);
    });
    
    // Questi sono i dati che ho inserito nel database e li mostro nella console
    console.log(
      this.updateMarkerForm.controls['id'].value,
      this.updateMarkerForm.controls['nome'].value,
      this.updateMarkerForm.controls['indirizzo'].value,
      this.updateMarkerForm.controls['lat'].value,
      this.updateMarkerForm.controls['lon'].value,
      this.updateMarkerForm.controls['colore'].value,
      this.updateMarkerForm.controls['draggable'].value,
    );
  }

  // funzione icona bottone home
  home() {
    this.router.navigate(['/']);
  }
  
  listaMarker() {
    this.router.navigate(['/contact-marker']);
  }

}


