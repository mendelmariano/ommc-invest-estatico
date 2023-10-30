import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './pages/components/notfound/notfound.component';
import { ProductService } from './pages/service/product.service';
import { CountryService } from './pages/service/country.service';
import { CustomerService } from './pages/service/customer.service';
import { EventService } from './pages/service/event.service';
import { IconService } from './pages/service/icon.service';
import { NodeService } from './pages/service/node.service';
import { PhotoService } from './pages/service/photo.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        AngularFireModule.initializeApp(environment.firebaseConfig),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true,
        },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
