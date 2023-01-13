import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // needed for TS ,TS feature

// All components used in app must be registered/made known to angular in the app.module.ts file
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component'; // don't add ts at end of file -- TS adds this

@NgModule({
  declarations: [  // All user defined component used in the app must be imported and indicated here
    AppComponent,
    ServerComponent,
    ServersComponent
  ],
  imports: [ // All angular sub modules to be used in app must be imported and indicated here
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
