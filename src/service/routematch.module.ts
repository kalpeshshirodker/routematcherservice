// @Author: Kalpesh Shirodker: 
// https://github.com/kalpeshshirodker

import { NgModule , ModuleWithProviders} from "@angular/core";
import { Router, RouterModule } from '@angular/router';
import { RouteMatchService } from './routematch.service';

@NgModule({
  imports: [ RouterModule ],
  providers: [ {
      provide: RouteMatchService,
      useFactory :(router: Router): RouteMatchService => {
        return new RouteMatchService(router);
      },
      deps : [ Router ]
      } ]
})
export class RouteMatchModule {
}
  