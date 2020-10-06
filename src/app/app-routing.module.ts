import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FloorSchemeComponent } from './floor-scheme/floor-scheme.component';
import { MainWithPlatformsComponent } from './main-with-platforms/main-with-platforms.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlatformSchemeComponent } from './platform-scheme/platform-scheme.component';

const routes: Routes = [
  { path: '', component: MainWithPlatformsComponent},
  { path: 'platformScheme', component: PlatformSchemeComponent},
  { path: 'floorScheme', component: FloorSchemeComponent},
  { path: '**', component: NotFoundComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
