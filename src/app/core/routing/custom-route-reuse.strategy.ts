import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy
} from '@angular/router';

interface StoredRoute {
  handle: DetachedRouteHandle;
  timeoutId: ReturnType<typeof setTimeout>;
}

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private readonly storedRoutes = new Map<string, StoredRoute>();
  private readonly cacheDuration = 2 * 60 * 1000;

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.isTaskListRoute(route);
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (!handle) {
      return;
    }

    const key = this.getRouteKey(route);
    const previous = this.storedRoutes.get(key);

    if (previous) {
      clearTimeout(previous.timeoutId);
    }

    const timeoutId = setTimeout(() => {
      this.storedRoutes.delete(key);
    }, this.cacheDuration);

    this.storedRoutes.set(key, { handle, timeoutId });
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.storedRoutes.has(this.getRouteKey(route));
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRoutes.get(this.getRouteKey(route))?.handle ?? null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === current.routeConfig;
  }

  private isTaskListRoute(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig?.path === 'tasks' && route.parent?.routeConfig?.path === 'projects/:id';
  }

  private getRouteKey(route: ActivatedRouteSnapshot): string {
    const projectId = route.parent?.paramMap.get('id') ?? 'unknown';
    return `/projects/${projectId}/tasks`;
  }
}
