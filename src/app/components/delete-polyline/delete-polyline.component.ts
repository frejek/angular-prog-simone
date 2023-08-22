import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs";
import { ApiPolylineService } from "src/app/services/api-polyline.service";


@Component({
  selector: 'app-delete-polyline',
  templateUrl: './delete-polyline.component.html',
  styleUrls: ['./delete-polyline.component.css']
})
export class DeletePolylineComponent {
  deletePolylineForm!: FormGroup;           // variabile di template che contiene tutti i dati del form a cui posso accedere

  constructor(public fb: FormBuilder, private apiPolylineService: ApiPolylineService, private router: Router, private http: HttpClient) {               // fb è una istanza a cui potremo accedere ai sui metodi etc
    this.deletePolylineForm = fb.group({
      'id': ['', Validators.required],
      //'lat': ['', Validators.required],
      //'lon': ['', Validators.required],
    });
  }

  ngOnInit() {
    
    // lettura dei dati MOLTO PROBABILMENTE LA DEVO FARE IN localhost:4200
    // this.apiService.getMarker().subscribe((data: any) => {
    //   console.log(data);
    // });
  } 

  onSubmit(): void {
    if(!this.deletePolylineForm.valid) {
      alert("Compilare tutti i campi obbligatori");
      return;
    } 

    let id = this.deletePolylineForm.value.id;
   

    this.apiPolylineService.deletePolyline(id).subscribe((res: any) => {
      console.log(res);
    });
                 
    this.router.navigate(['/']);
    
    
    // Questi sono i dati del marker che ho cancellato
    console.log(
      this.deletePolylineForm.controls['id'].value,
    );
  }

  home() {                                // Icon Button Home
    this.router.navigate(['/']);
  }
}
