import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { ShopComponent } from './pages/shop/shop';
import { ProductDetailsComponent } from './pages/product-details/product-details';
import { CartComponent } from './pages/cart/cart';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { AdminComponent } from './pages/admin/admin';

import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard, adminGuard] },
  { path: '**', redirectTo: '' },
];
