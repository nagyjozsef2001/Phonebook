import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FormComponent } from './pages/form/form.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: "**",
    component: ContactsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
