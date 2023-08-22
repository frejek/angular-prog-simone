import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiMarkerService } from 'src/app/services/api-marker.service';

@Component({
  selector: 'app-create-marker',
  templateUrl: './create-marker.component.html',
  styleUrls: ['./create-marker.component.css']
})
export class CreateMarkerComponent {
  // queste due proprietà le leghiamo con il valore "value" selezionato nel tag select attraverso il Two away Binding l'associazione a due vie per motrare 
  // in html il colore esadecimale scelto
  
  selectedValueColor!: string;                                              
  selectedValueDraggable!: boolean;

  // Per singoli componenti come select usiamo [formControl] per il controllo su questo campo di selezione
  // colore = new FormControl('colore');              
  // draggable = new FormControl('');
  
  value!: boolean;   // ERA PRIMA
  markerForm!: FormGroup;                           // variabile di template che contiene tutti i dati del form a cui posso accedere

  public allColors: any[] =[                        // ANDRO A COLORARE COME MARKER I cirgleMarker
    {label: 'bianco', value: 'ffffff'},             // Bianco
    {label: 'nero', value: '000000'},               // Nero
    {label: 'acqua', value: '00ffff'},              // acqua
    {label: 'blue', value: '0000ff'},               // blue
    {label: 'fuchsia', value: 'ff00ff'},            // fuchsia
    {label: 'grey', value: '808080'},               // grey
    {label: 'green', value: '008000'},              // green
    {label: 'lime', value: '00ff00'},               // lime (verde sfosforescente)
    {label: 'marrone', value: '800000'},            // marrone
    {label: 'navy', value: '000080'},               // navy (viola tendente al blu)
    {label: 'olive', value: '808000'},              // olive
    {label: 'purple', value: '800080'},             // purple (viola)
    {label: 'red', value: 'ff0000'},                // red (viola)
    {label: 'silver', value: 'c0c0c0'},             // silver (grigio chiaro)
    {label: 'teal', value: '008080'},               // teal (verde mare)
    {label: 'yellow', value: 'ffff00'},             // yellow
  ];

  // E dentro le graffe metteremo tutta la lista dei controlli ossia dei campi che vuole questo gruppo di form
  constructor(public fb: FormBuilder, private apiMarkerService: ApiMarkerService, private router: Router) {               // fb è una istanza a cui potremo accedere ai sui metodi etc
    
    this.markerForm = fb.group({
      'nome': ['', Validators.required],              // Posso specificare il placeholder su 'nome' se volessi
      'indirizzo': ['', Validators.required],
      'lat': ['', Validators.required],
      'lon': ['', Validators.required],
      'colore': ['colore', Validators.required],
      'draggable': ['draggable', Validators.required]     // se non volessimo mettere draggable obbligatorio basta mettere  'draggable': [''] 
    });
  }

  ngOnInit() {
    
    // lettura dei dati 
    //this.apiMarkerService.getMarkers().subscribe((data: any) => {
    //  console.log(data);
    //});
  } 

  onSubmit(): void {
    if(!this.markerForm.valid) {                          // se i dati non sono stati compilati andiamo a prendere i dati di input
      alert("Compilarte tutti i campi obbligatori");
      return;
    } 
    
    let nome = this.markerForm.value.nome;
    let indirizzo = this.markerForm.value.indirizzo;
    let lat = this.markerForm.value.lat;
    let lon = this.markerForm.value.lon;
    let colore = this.markerForm.value.colore;
    let draggable = this.markerForm.value.draggable;
    
    // Le Pipe in Angular ci aiutano a formattare o trasformare i dati da visualizzare nel nostro template. 
    // Questo metodo richiede che tra i due processi esista una relazione di parentela. Sono simili ai filtri in AngularJS.
    // Emette il primo valore o il primo valore dell'espressione fornita oppure in base alla valutazione dellprima condizione soddisfatta.
    // Ho preso spunto da questa guida: https://www.learnrxjs.io/learn-rxjs/operators/filtering/first
    //this.apiService.createMarker(nome, indirizzo, lat, lon, colore, draggable).subscribe(data => {
      
    this.apiMarkerService.createMarker(nome, indirizzo, lat, lon, colore, draggable).pipe(first()).subscribe(data => {  // riceve l'oggetto marker appena creato su data
      console.log(data);
      this.router.navigate(['/']);
    });
    
    // Questi sono i dati che ho inserito nel database
    console.log(
      this.markerForm.controls['nome'].value,
      this.markerForm.controls['indirizzo'].value,
      this.markerForm.controls['lat'].value,
      this.markerForm.controls['lon'].value,
      this.markerForm.controls['colore'].value,
      this.markerForm.controls['draggable'].value,
    );

    
    // CONNESSIONE NORMALE AL DATABASE 
    // this.apiService.createMarker(nome, indirizzo, lat, lon, colore, draggable).subscribe(data => {
    //   console.log(data);
      //this.router.navigate(['/']);
    //});


    // console.log(this.markerForm);
  }

  home() {                                // Icon Button Home
    this.router.navigate(['/']);
  }
}

