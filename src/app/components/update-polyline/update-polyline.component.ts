
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiPolylineService } from 'src/app/services/api-polyline.service';
import { UpdateMarkerComponent } from '../update-marker/update-marker.component';
import { ApiMarkerService } from 'src/app/services/api-marker.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-update-polyline',
  templateUrl: './update-polyline.component.html',
  styleUrls: ['./update-polyline.component.css']
})
export class UpdatePolylineComponent implements OnInit {
  // queste due proprietà le leghiamo con il valore "value" selezionato nel tag select attraverso il Two away Binding l'associazione a due vie per mostrare 
  // in html il colore esadecimale scelto
  selectedValueColor!: string;                          // PICCOLA NOTA PER ME :questo valore poi lo devo passare all'pi per inserirlo nel database
  selectedValueDraggable!: boolean;
  // value!: boolean;                                   // ERA PRIMA
  updatePolylineForm!: FormGroup;                               // variabile di template che contiene tutti i dati del form a cui posso accedere
  dataPolyline: any;

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

  constructor(public fb: FormBuilder, private router: Router, private http: HttpClient, private apiPolylineService: ApiPolylineService) {

    this.updatePolylineForm = fb.group({
      'id': ['', Validators.required],
      'nome_p': ['', Validators.required],                  // Posso specificare il placeholder su 'nome' se volessi
      'nome_a': ['', Validators.required],                  // se non volessimo mettere nome_a obbligatorio basta mettere  'nome_a': [''] 
      'lat_p': ['', Validators.required],
      'lat_a': ['', Validators.required],
      'lon_p': ['', Validators.required],
      'lon_a': ['', Validators.required],
      'colore': ['colore',Validators.required],
    });
  }

  //markers: any;
  //listingdata:Array<any> = [];
  ngOnInit(): void {
    // Vado a prendere nel db la lista aggiornata dei marker e mostro la lista aggiornata
    this.apiPolylineService.getPolylines().subscribe((res: any) => {                       // dal db arriva una stringa json  
      //this.listingdata = this.dataMarkers.results.row;
      // this.dataMarkers = res;                                                         
      //this.dataMarkers = res.data;                               
      this.dataPolyline = JSON.parse(JSON.stringify(res));                             // oppure   JSON.parse(JSON.stringify(res));             
      
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
    if(!this.updatePolylineForm.valid) {                      // se i campi non sonop stati compilati interrompo immediatamente il codice in quel punto altrimenti leggo i dati
      alert("Compilarte tutti i campi obbligatori");
      return;                                               
    } 
  
    // Leggo i dati del form
    let id = this.updatePolylineForm.value.id;
    let nome_p = this.updatePolylineForm.value.nome_p; 
    let nome_a = this.updatePolylineForm.value.nome_a; 
    let lat_p = this.updatePolylineForm.value.lat_p;
    let lat_a = this.updatePolylineForm.value.lat_a;
    let lon_p = this.updatePolylineForm.value.lon_p;
    let lon_a = this.updatePolylineForm.value.lon_a;
    let colore = this.updatePolylineForm.value.colore;
    
    // PIPE
    // La funzione pipe è la catena di montaggio dalla tua origine dati osservabile attraverso i tuoi operatori. Proprio come la materia prima in una fabbrica 
    // subisce una serie di fermate prima di diventare un prodotto finito, i dati di origine possono passare attraverso una pipeline di operatori in cui 
    // è possibile manipolare, filtrare e trasformare i dati per adattarli al proprio caso d'uso. Non è raro utilizzare 5 (o più) operatori all'interno 
    // di una catena osservabile, contenuta all'interno della funzione pipe.

    /*
    Ad esempio, una soluzione typeahead costruita con osservabili può utilizzare un gruppo di operatori per ottimizzare sia la richiesta che il processo 
    di visualizzazione:
    inputValue
    .pipe(
      // wait for a 200ms pause
      debounceTime(200),
      // if the value is the same, ignore
      distinctUntilChanged(),
      // if an updated value comes through while request is still active cancel previous request and 'switch' to new observable
      switchMap(searchTerm => typeaheadApi.search(searchTerm))
    )
    // create a subscription
    .subscribe(results => {
      // update the dom
    });
     */

    // Le Pipe in Angular ci aiutano a formattare o trasformare i dati da visualizzare nel nostro template.
    // pipe() che è lo strumento consigliato per applicare degli operatori che attuano delle trasformazioni sui dati emessi da un Observable, 
    // specialmente nel caso in cui si vogliano combinare più operatori.

    // Questo metodo richiede che tra i due processi esista una relazione di parentela. Sono simili ai filtri in AngularJS.
    // first() emette il primo valore o il primo valore dell'espressione fornita in base alla condizione emetyte il primo valore che la soddisfa.
    // Ho preso spunto da questa guida: https://www.learnrxjs.io/learn-rxjs/operators/filtering/first
    //this.apiService.createMarker(nome, indirizzo, lat, lon, colore, draggable).subscribe(data => {
    
    // First consegnerà un EmptyError (errore vuoto) alla callback error dell'Observer se l'Observable viene completato prima che venga 
    // inviata qualsiasi notifica successiva. Se non vuoi questo comportamento, usa invece take(1).
    this.apiPolylineService.updatePolyline(id, nome_p, nome_a, lat_p, lon_p, lat_a, lon_a, colore).pipe(first()).subscribe((data: any) => {  // ricevo l'oggetto marker su data appena
      console.log(data);
      this.router.navigate(['/']);
    });
    
    // Questi sono i dati che ho inserito nel database e li mostro nella console accedo con controls perchè polyline è un oggetto
    console.log(
      this.updatePolylineForm.controls['id'].value,
      this.updatePolylineForm.controls['nome_p'].value,
      this.updatePolylineForm.controls['nome_a'].value,
      this.updatePolylineForm.controls['lat_p'].value,
      this.updatePolylineForm.controls['lon_p'].value,
      this.updatePolylineForm.controls['lat_a'].value,
      this.updatePolylineForm.controls['lon_a'].value,
      this.updatePolylineForm.controls['colore'].value,
    );
  }

  // funzione icona bottone home
  home() {
    this.router.navigate(['/']);
  }
 }

