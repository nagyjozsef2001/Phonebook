import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FormComponent } from './pages/form/form.component';
import { LoginComponent } from './pages/login/login.component';

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
    path: 'form',
    component: FormComponent
  },
  {
    path: 'login',
    component:LoginComponent
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
