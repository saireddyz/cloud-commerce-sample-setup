import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpartacusModule } from './spartacus/spartacus.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfigModule, provideConfig } from "@spartacus/core";
import { ViewConfig } from "@spartacus/storefront/shared/config/view-config";
import { LayoutConfig } from "@spartacus/storefront/layout/config/layout-config";
//import { LoggingInterceptor } from "./logging.interceptor";
import { APP_BASE_HREF } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    
    BrowserTransferStateModule,
    /*
    ConfigModule.withConfig({
      layoutSlots: {
        header: {
          lg: {
            slots: ['SiteLogo']
          }
        },

      },
    } as LayoutConfig),*/
  ],
  providers: [
    
  { provide: APP_BASE_HREF, useValue: environment.baseHref }, 
    /*
    provideConfig(<ViewConfig>{view: {
    defaultPageSize: 2,
    infiniteScroll: {
      active: true,
      productLimit: 0,
      showMoreButton: false,
    },
  }}) , 
  */
  /*provideConfig(<LayoutConfig>{  layoutSlots: {
    header: {
      slots: [],
     // lg: {
      //  slots: ['SiteLogo']
     // }
    },
    footer: {
      slots: []
    }
}})*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
