import { NgModule } from '@angular/core';
import { ConfigModule, ExternalRoutesModule } from '@spartacus/core';
import { BaseStorefrontModule } from "@spartacus/storefront";
import { SpartacusConfigurationModule } from './spartacus-configuration.module';
import { SpartacusFeaturesModule } from './spartacus-features.module';


@NgModule({
  declarations: [],
  imports: [

    SpartacusFeaturesModule,
    SpartacusConfigurationModule,
    BaseStorefrontModule,
    ExternalRoutesModule.forRoot(),
    ConfigModule.withConfig({
      routing: {
        internal: [ 
          '/**',
          '!/cart',
          '!/Open-Catalogue/**/c/**',
          '!/product/1992693/DSC-T90'
        ]
      }
    }), 
  ],
  exports: [BaseStorefrontModule]
})
export class SpartacusModule { }
