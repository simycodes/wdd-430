import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";

interface Server {
    id: number;
    name: string;
    status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
    // GET THE serverService
    constructor(private serverService: ServersService) {}

    // resolve FROM ANGULAR ROUTER ALWAYS USES THESE TWO SNAPSHOT ARGUMENTS
    // resolve LOADS / FETCHES DATA IN ADVANCE BEFORE DISPLAYING IT IN COMPONENT
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<Server> | Promise<Server> | Server {
        return this.serverService.getServer(+route.params['id']);
    }
}