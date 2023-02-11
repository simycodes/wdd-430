import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth-guard.service";
import { canDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";

// DEFINING ANGULAR ROUTING FOR PAGES - EACH ROUTE IS AN OBJECT-EACH PAGE IS A COMPONENT
const appRoutes: Routes = [
    { path: '', component: HomeComponent }, // empty path is http://localhost:4200/

    {
        path: 'users', component: UsersComponent, children: [  // http://localhost:4200/users
            { path: ':id/:name', component: UserComponent },
        ]
    },

    {
        path: 'servers', 
        // canActivate: [AuthGuard], 
        canActivateChild: [AuthGuard],
        component: ServersComponent, 
        children: [
            { path: ':id', component: ServerComponent },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [canDeactivateGuard] }
        ]
    },

    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

// NOT NESTED
// const appRoutes: Routes = [
//   { path: '', component: HomeComponent }, // empty path is http://localhost:4200/
//   { path: 'users', component: UsersComponent }, // http://localhost:4200/users
//   { path: 'users/:id/:name', component: UserComponent },
//   { path: 'servers', component: ServersComponent },
//   { path: 'servers/:id', component: ServerComponent },
//   { path: 'servers/:id/edit', component: EditServerComponent }
// ]