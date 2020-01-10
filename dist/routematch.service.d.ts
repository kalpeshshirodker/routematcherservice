import { Route, Router, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';
/**
 * RouteMatchService
 */
export declare class RouteMatchService {
    protected readonly router: Router;
    private static instance;
    private static get urlTree();
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
    static urlFragmentMatcher(url: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult;
    constructor(router: Router);
}
