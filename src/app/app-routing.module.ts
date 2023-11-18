import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'error-page',
    loadChildren: () => import('./pages/error-page/error-page.module').then( m => m.ErrorPagePageModule)
  },
  {
    path: 'forgotten-pass',
    loadChildren: () => import('./pages/forgotten-pass/forgotten-pass.module').then( m => m.ForgottenPassPageModule)
  },
  {
    path: 'qr-reader',
    loadChildren: () => import('./pages/qr-reader/qr-reader.module').then( m => m.QrReaderPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
