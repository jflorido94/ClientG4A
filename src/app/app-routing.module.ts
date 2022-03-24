import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('@features/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'conditions',
    loadChildren: () =>
      import('@features/condition/condition.module').then(
        (m) => m.ConditionModule
      ),
  },
  {
    path: 'tags',
    loadChildren: () =>
      import('@features/tags/tags.module').then((m) => m.TagsModule),
  },
  {
    path: 'states',
    loadChildren: () =>
      import('@features/states/states.module').then((m) => m.StatesModule),
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
