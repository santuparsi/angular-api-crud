import { Routes } from '@angular/router';
import { Add } from './Components/add/add';
import { Edit } from './Components/edit/edit';
import { ViewAll } from './Components/view-all/view-all';

export const routes: Routes = [
    { path: 'add', component: Add },
    { path: 'edit/:name', component: Edit },
    { path: 'view', component: ViewAll }
];
