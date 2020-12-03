import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptor } from './api-http-interceptor';
import { NgxsModule } from '@ngxs/store';
const routes: Routes = [
  { path: '', component: ConnexionComponent }
];

ReactiveFormsModule
@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot ()
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,    useClass: ApiHttpInterceptor,     multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
