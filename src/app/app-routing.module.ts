import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CreateMarkerComponent } from './components/create-marker/create-marker.component';
import { UpdateMarkerComponent } from './components/update-marker/update-marker.component';
import { MapComponent } from './components/map/map.component';
import { CreatePolylineComponent } from './components/create-polyline/create-polyline.component';
import { UpdatePolylineComponent } from './components/update-polyline/update-polyline.component';
import { ListMarkerComponent } from './components/list-marker/list-marker.component';
import { DeleteMarkerComponent } from './components/delete-marker/delete-marker.component';
import { DeletePolylineComponent } from './components/delete-polyline/delete-polyline.component';

const routes: Routes = [
  {path: '', component: ToolbarComponent},
  //{path: '', component: MapComponent},
  {path: 'create-marker', component: CreateMarkerComponent},
  {path: 'update-marker', component: UpdateMarkerComponent},
  {path: 'create-polyline', component: CreatePolylineComponent},
  {path: 'update-polyline', component: UpdatePolylineComponent},
  {path: 'list-marker', component: ListMarkerComponent},
  {path: 'delete-marker', component: DeleteMarkerComponent},
  {path: 'delete-polyline', component: DeletePolylineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
