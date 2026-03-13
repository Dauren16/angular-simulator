import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: '', component: FooterComponent },
  { path: 'users', component: UsersPageComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: '**', component: NotFoundPageComponent }
];
