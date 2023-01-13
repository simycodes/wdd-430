import { Component } from '@angular/core';

// The '@Component' is a decorator used to specify the metadata for the component 
// class defined immediately below it.
@Component({
    'selector': 'app-server', 
    'templateUrl': './server.component.html'
})

// Actual angular component class definition - a component is a TS class in angular 
export class ServerComponent {
    serveId = 10;
    serverStatus = 'offline';
    serverLastMaintained = 'December 2022'

    getServerStatus() {
        return this.serverStatus;
    }
    
    getServerLastMaintained() {
        return this.serverLastMaintained;
    }
}
