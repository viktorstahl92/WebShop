import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Components/admin/add-product/add-product.component';
import { ChangeProductComponent } from './Components/admin/change-product/change-product.component';
import { UpdateOrderComponent } from './Components/admin/update-order/update-order.component';
import { UpdateUserComponent } from './Components/admin/update-user/update-user.component';
import { LoginComponent } from './Components/log-in/log-in.component';
import { MainComponent } from './Components/main/main.component';
import { OrderInfoComponent } from './Components/order-info/order-info.component';
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent },
  { path: 'overview', redirectTo: '', pathMatch: 'full' },
  { path: 'admin/addproduct', component: AddProductComponent },
  { path: 'admin/updateuser/:id', component: UpdateUserComponent},
  { path: 'admin/updateproduct/:id', component: ChangeProductComponent},
  { path: 'order/:id', component: OrderInfoComponent},
  { path: 'admin/updateorder/:id', component: UpdateOrderComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
