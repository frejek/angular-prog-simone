import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// componenti angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { PopupService } from './services/popup.service';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { CreateMarkerComponent } from './components/create-marker/create-marker.component';
import { UpdateMarkerComponent } from './components/update-marker/update-marker.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ApiMarkerService } from './services/api-marker.service';

import { UpdatePolylineComponent } from './components/update-polyline/update-polyline.component';
import { CreatePolylineComponent } from './components/create-polyline/create-polyline.component';
import { ApiPolylineService } from './services/api-polyline.service';
import { ListMarkerComponent } from './components/list-marker/list-marker.component';
import { DeleteMarkerComponent } from './components/delete-marker/delete-marker.component';
import { DeletePolylineComponent } from './components/delete-polyline/delete-polyline.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CreateMarkerComponent,
    UpdateMarkerComponent,
    ToolbarComponent,
    CreatePolylineComponent,
    UpdatePolylineComponent,
    ListMarkerComponent,
    DeleteMarkerComponent,
    DeletePolylineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    PopupService,
    ApiMarkerService,
    ApiPolylineService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
