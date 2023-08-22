import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiMarkerService } from 'src/app/services/api-marker.service';

@Component({
  selector: 'app-delete-marker',
  templateUrl: './delete-marker.component.html',
  styleUrls: ['./delete-marker.component.css']
})
export class DeleteMarkerComponent {
  

  deleteMarkerForm!: FormGroup;                     // è la mia variabile template per accedere a tutti i dati del form

  constructor(public fb: FormBuilder, private apiMarkerService: ApiMarkerService, private router: Router, private http: HttpClient) {               // fb è una istanza a cui potremo accedere ai sui metodi etc
    this.deleteMarkerForm = fb.group({
      'id': ['', Validators.required],
    });
  }

  ngOnInit() {
    
    // lettura dei dati MOLTO PROBABILMENTE LA DEVO FARE IN localhost:4200
    // this.apiService.getMarker().subscribe((data: any) => {
    //   console.log(data);
    // });
  } 

  onSubmit(): void {
    if(!this.deleteMarkerForm.valid) {
      alert("Compilare tutti i campi obbligatori");
      return;
    } 
    
    // Passo questi tre campi alla funzione, gli ultimi due diciamo sono obsoleti mi servono solamente per crearmi il form altrimenti mi da errore se uso un solo campo di testo.
    let id = this.deleteMarkerForm.value.id;
    
    this.apiMarkerService.deleteMarker(id).subscribe((res: any) => {
      console.log(res);
    });
    
    this.router.navigate(['/']);
    
    // Questi sono i dati del marker che ho cancellato
    console.log(
      this.deleteMarkerForm.controls['id'].value,
    );
  }

  home() {                                // Icon Button Home
    this.router.navigate(['/']);
  }
}
