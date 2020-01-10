# Introduction
Provide url fragment matching capability which can be used for routing based on fragment changes. By default angular router doesnt support routing based on url fragment. The service allows the user to define routes, so that the application can navigate based on fragment changes. 

For instance, we can define a route to load a component for creating a new object, when the url provided contains e.g. `<appurl>/states/#new`

# Demo
Angular Router Matcher Demo : [Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-route-matcher-demo)

# User Guide
Install `angular-fragment-matcher` using the [npm](https://www.npmjs.com/)
```typescript
$ npm i angular-fragment-matcher
```

## Configuring route config
Define the route for which you intend to use the url fragment for routing

### Configuring metadata
The `RouteMatchService.urlFragmentMatcher` requires metadata config data, inorder to match a route successfully. The following config information need to be provided in `data` object for the route config

```typescript
 matcherconfig : {
  fragment: 'new' // the name of the fragment which will be checked 
                  // i.e. <appurl>\states\#new
}
```

Complete route config, will look as follows:
```typescript
const routes: Routes = [{
    path: "",
    children : [{
      component: StateComponent,
      matcher: RouteMatchService.urlFragmentMatcher,
      data : {
        matcherconfig : {
          fragment: 'new'
        }
      }
    }]
}]
```

## Inject RouteMatchService
Inorder to configure route config to use custom url matcher, we need to inject the RouterMatcherService in the feature module. 

```typescript
import { RouteMatchService } from 'angular-fragment-matcher';
```

Define the provider for the `RouteMatchService` in `NgModule` providers array, using `useFactory` to inject the `Router` as `deps`

```typescript
// Factory function for getting an instance of RouteMatchService
export function getRouteMatchService(router: Router): RouteMatchService {
  return new RouteMatchService(router);
}

@NgModule({
  imports: [ ..., RouterModule.forChild(routes) ],
  declarations: [ ... ],
  providers: [ {
    provide: RouteMatchService,
    useFactory : getRouteMatchService, 
    deps : [ Router ]
    } ],
  exports: [ RouterModule ]
})
export class StatesModule {
  constructor(private routeMatchService: RouteMatchService) {}
}
```