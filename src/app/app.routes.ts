import {Routes} from '@angular/router';
import {RekenbladComponent} from './rekenblad/rekenblad.component';

export const routes: Routes = [
  {
    path: ':seed',
    component: RekenbladComponent
  }, {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  }];
