"use strict";
// @Author: Kalpesh Shirodker: 
// https://github.com/kalpeshshirodker
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RouteMatchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
/**
 * RouteMatchService
 */
let RouteMatchService = RouteMatchService_1 = class RouteMatchService {
    //#region Instance definition
    constructor(router) {
        this.router = router;
        // Make this service a singleton
        if (RouteMatchService_1.instance) {
            return RouteMatchService_1.instance;
        }
        // save reference for later use
        RouteMatchService_1.instance = this;
    }
    static get urlTree() {
        const router = RouteMatchService_1.instance.router;
        const cn = router.getCurrentNavigation();
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
     * ...
     * }
    
     * @param url
     * @param group
     * @param route
     */
    static urlFragmentMatcher(url, group, route) {
        const urlTree = RouteMatchService_1.urlTree;
        if (!urlTree && !(urlTree instanceof router_1.UrlTree)) {
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
};
RouteMatchService = RouteMatchService_1 = __decorate([
    core_1.Injectable()
], RouteMatchService);
exports.RouteMatchService = RouteMatchService;
