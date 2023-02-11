import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,
    CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    // GET THE ROUTER TO USE IN CREATING PROTECTED ROUTE USING ActivatedRouteSnapshot AND RouterStateSnapshot
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated().then((authenticated: boolean)=> {
            if(authenticated) {
                return true;
            }
            else {
                this.router.navigate(['/']);
            }
        })
    }

    // canActivateChild MAKES THE SUB ROUTES-COMPONENTS TO BE A PROTECTED ROUTE
    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}