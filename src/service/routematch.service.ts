// @Author: Kalpesh Shirodker: 
// https://github.com/kalpeshshirodker

import { Navigation, NavigationStart,
 Route, Router,
 RouterEvent,
 UrlMatchResult, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { Injectable , ReflectiveInjector} from '@angular/core';
import { filter } from 'rxjs/operators';

/**
 * RouteMatchService 
 */

@Injectable()
export class RouteMatchService {

  static instance: RouteMatchService;
  
  static get urlTree(): UrlTree {

    const router: Router = RouteMatchService.instance.router;

    const cn : Navigation = router.getCurrentNavigation();

    if( cn ) {
      return cn.extractedUrl;
    }

    return undefined;
  }

/**
 * Custom Url matcher for matching fragment in the current browser url
 *
 * Usage : Setup route config as follows
 * const route: Route = { ...
 * data: {
 *   matcher: {
 *     fragment: 'new'
 *   }
 * },
 * matcher: urlFragmentMatcher
 * ...
 * }

 * @param url
 * @param group
 * @param route
 */
  static urlFragmentMatcher (url: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult {

    const urlTree: UrlTree = RouteMatchService.urlTree;
    
    if (!urlTree && !(urlTree instanceof UrlTree)) {
      return null;
    }

    if (!urlTree.fragment) {
      // url doesnt contain a fragment; ignore url matching and continue
      return null;
    }

    // read the route data for fragment match config
    const data = route.data;
    if (data && data.matcherconfig) {

      if (urlTree.fragment === data.matcherconfig.fragment) {
        return ({ consumed: url });
      }

    }

    return null;

  }

  //#region Instance definition
  constructor(protected readonly router: Router) {

    // Make this service a singleton
    if(RouteMatchService.instance) {
      return RouteMatchService.instance;
    }

    // save reference for later use
    RouteMatchService.instance = this;

  }

  //#endregion
}
