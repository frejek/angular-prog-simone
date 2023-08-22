import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiPolylineService } from 'src/app/services/api-polyline.service';


@Component({
  selector: 'app-create-polyline',
  templateUrl: './create-polyline.component.html',
  styleUrls: ['./create-polyline.component.css']
})
export class CreatePolylineComponent implements OnInit{
  // Questa proprietà la lego con il valore "value" selezionato nel tag select attraverso il Two away Binding l'associazione a due vie per motrare 
  // in html per mostrare poi nell'ahtml il colore esadecimale scelto
  selectedValueColor!: string;                                            // valore selezionato  
  value!: boolean;

  polylineForm!: FormGroup;

  public allColors: any[] = [
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

  constructor(private fb: FormBuilder, private apiPolylineService: ApiPolylineService, private router: Router) {

    this.polylineForm = fb.group({
      'nome_p': ['', Validators.required],
      'nome_a': ['', Validators.required],
      'lat_p': ['', Validators.required],
      'lon_p': ['', Validators.required],
      'lat_a': ['', Validators.required],
      'lon_a': ['', Validators.required],
      'colore': ['colore', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if(!this.polylineForm) {                                  // se i campi sono vuoti allora recuperiam o i dati dal form
      alert("Compilarte tutti i campi obbligatori");
      return;
    }

    let nome_p = this.polylineForm.value.nome_p;      
    let nome_a = this.polylineForm.value.nome_a;            
    let lat_p = this.polylineForm.value.lat_p;
    let lon_p = this.polylineForm.value.lon_p
    let lat_a = this.polylineForm.value.lat_a;
    let lon_a = this.polylineForm.value.lon_a;
    let colore = this.polylineForm.value.colore;

    

    // AVVISO: mi da questo errore Undefined property: stdClass::nome_a  (quindi non legge la proprietà dell'oggetto nome_a)
    this.apiPolylineService.createPolyline(nome_p, nome_a, lat_p, lon_p, lat_a, lon_a, colore).pipe(first()).subscribe(data => {
      console.log(data);
      this.router.navigate(['/']);
    });
  }

  home() {
    this.router.navigate(['/']);
  }

  
}

