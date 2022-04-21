import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/log-in/log-in.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './Components/register/register.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { MainComponent } from './Components/main/main.component';
import { UserBasicComponent } from './Components/admin/user-basic/user-basic.component';
import { AddProductComponent } from './Components/admin/add-product/add-product.component';
import { UpdateUserComponent } from './Components/admin/update-user/update-user.component';
import { ChangeProductComponent } from './Components/admin/change-product/change-product.component';
import { AdminMainComponent } from './Components/admin/admin-main/admin-main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    UserBasicComponent,
    AddProductComponent,
    UpdateUserComponent,
    ChangeProductComponent,
    AdminMainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
