// @Author: Kalpesh Shirodker: 
// https://github.com/kalpeshshirodker

import { Injectable } from '@angular/core';
import {
  Navigation,
  Route, Router,
  UrlMatchResult, UrlSegment, UrlSegmentGroup, UrlTree
} from '@angular/router';

/**
 * RouteMatchService 
 */

@Injectable()
export class RouteMatchService {

  private static instance: RouteMatchService;

  private static get urlTree(): UrlTree | undefined {

    if (RouteMatchService == undefined || RouteMatchService.instance == undefined || RouteMatchService.instance.router == undefined) {
      return undefined;
    }

    const router: Router = RouteMatchService.instance.router;

    const cn: Navigation | null = router.getCurrentNavigation();

    if (cn) {
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
   * 
   * You can use additional parameters using &param=value&param=value, e.g.: #new&id=12&foo=bar
   * ...
   * }
   * @param url
   * @param group
   * @param route
   */
  static urlFragmentMatcher(url: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult | null {

    const urlTree: UrlTree | undefined = RouteMatchService.urlTree;

    if (!urlTree && !((urlTree as unknown) instanceof UrlTree)) {
      return null;
    }

    const urlClear: UrlTree = (urlTree as UrlTree);

    if (!urlClear.fragment) {
      // url doesnt contain a fragment; ignore url matching and continue
      return null;
    }

    const fragmentParams: string[] = urlClear.fragment.split('&');

    // read the route data for fragment match config
    const data = route.data;
    if (data && data['matcherconfig']) {

      // fragment is not the same
      if (fragmentParams[0] !== data['matcherconfig'].fragment) {
        return null;
      }

      let params: any = {};

      // get extra params
      if(fragmentParams.length > 1){
        for (let i = 1; i < fragmentParams.length; i++) {
          const element = fragmentParams[i];

          const indexOfEquals: number = element.indexOf('=');

          params[element.substring(0,indexOfEquals)] = new UrlSegment(element.substring(indexOfEquals+1), {});

        }
      }

      return ({ consumed: url, posParams: params });

    }

    return null;

  }

  //#region Instance definition
  constructor(protected readonly router: Router) {

    // Make this service a singleton
    if (RouteMatchService.instance) {
      return RouteMatchService.instance;
    }

    // save reference for later use
    RouteMatchService.instance = this;

  }

  //#endregion
}