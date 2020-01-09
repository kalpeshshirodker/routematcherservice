// @Author: Kalpesh Shirodker: 
// https://github.com/kalpeshshirodker

import { 
  Navigation,
  NavigationStart,
  Route, Router,
  RouterEvent,
  UrlMatchResult, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

import { filter } from 'rxjs/operators';

/**
 * Contains the references required to determine the current route for the application
 */
class RouteContext {
  private cn: Navigation;

  get currentNavigation(): Navigation {
    return this.cn;
  }

  set currentNavigation(nav: Navigation) {
    this.cn = nav;
  }

  get urlTree(): UrlTree {
    if (this.cn) {
      return this.cn.extractedUrl;
    }
    return undefined;
  }
}

/**
 * Service makes accessible the current navigation object from the Angular router
 *
 * The navigation object is used by the urlFragmentMatcher to match the route for a given
 * fragment.
 *
 */
@Injectable()
export class RouteMatchService {

  static instance: RouteMatchService;
  
  static get currentContext(): RouteContext {
    return RouteMatchService.instance.routeContext;
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

    const urlTree: UrlTree = RouteMatchService.currentContext.urlTree;
    
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
  private _routeContext: RouteContext = new RouteContext();

  get routeContext(): RouteContext {
    return this._routeContext;
  }
  constructor(protected readonly router: Router) {

    // Make this service a singleton
    if(RouteMatchService.instance) {
      return RouteMatchService.instance;
    }

    // Create instance and initialize the service
    this.initializeEvents();

    // Update the reference for the current navigation
    this.updateCurrentTransition();

    // save reference for later use
    RouteMatchService.instance = this;

  }

  private initializeEvents() {

    this.router.events
      .pipe(filter((e:RouterEvent) => e instanceof NavigationStart))
      .subscribe(e => {

        this.updateCurrentTransition();

      });

  }

  private updateCurrentTransition() {

    const nav: Navigation = this.router.getCurrentNavigation();
    this._routeContext.currentNavigation = nav;

  }

  //#endregion
}

