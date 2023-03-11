import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
@Injectable()
export class MicroFrontendRouteReuseStrategy extends RouteReuseStrategy {
    shouldDetach(): boolean {
        // маршрут не сохраняется
        return false;
    }
    store(): void { }
    shouldAttach(): boolean {
        return false;
    }
    // время присоединения маршрута
    retrieve(): DetachedRouteHandle {
        return 0;
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig || (future.data['app'] && (future.data['app'] === curr.data['app']));
    }
}