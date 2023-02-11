import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';

// DEFINING ANGULAR ROUTING FOR PAGES - EACH ROUTE IS AN OBJECT-EACH PAGE IS A COMPONENT
const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // empty path is http://localhost:4200/

  { path: 'users', component: UsersComponent, children: [  // http://localhost:4200/users
    { path: ':id/:name', component: UserComponent },
  ] }, 

  { path: 'servers', component: ServersComponent, children: [
    { path: ':id', component: ServerComponent },
    { path: ':id/edit', component: EditServerComponent }
  ] },
]

// NOT NESTED
// const appRoutes: Routes = [
//   { path: '', component: HomeComponent }, // empty path is http://localhost:4200/
//   { path: 'users', component: UsersComponent }, // http://localhost:4200/users
//   { path: 'users/:id/:name', component: UserComponent },
//   { path: 'servers', component: ServersComponent },
//   { path: 'servers/:id', component: ServerComponent },
//   { path: 'servers/:id/edit', component: EditServerComponent }
// ]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)  //  REGISTERING OUR APP ROUTER IN ANGULAR
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
