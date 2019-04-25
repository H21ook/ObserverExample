import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'detail-contact', loadChildren: './pages/contact/detail-contact/detail-contact.module#DetailContactPageModule' },
  { path: 'add-contact', loadChildren: './pages/contact/add-contact/add-contact.module#AddContactPageModule' },
  { path: 'add-memo', loadChildren: './pages/memo/add-memo/add-memo.module#AddMemoPageModule' },
  { path: 'detail-memo', loadChildren: './pages/memo/detail-memo/detail-memo.module#DetailMemoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
