import { Component } from '@angular/core';

// The '@Component' is a decorator used to specify the metadata for the component 
// class defined immediately below it.
@Component({
    selector: 'app-server', 
    templateUrl: './server.component.html',
    styles: [`
        .online {
           color: white;
        }
    `] 
})

// Actual angular component class definition - a component is a TS class in angular 
export class ServerComponent {
    serveId = 10;
    serverStatus = 'offline';
    serverLastMaintained = 'December 2022'

    constructor() {
        this.serverStatus = Math.random() > 0.5 ? 'Online': 'Offline';
    }

    getServerStatus() {
        return this.serverStatus;
    }

    getColor() {
        return this.serverStatus === 'Online'? 'green' : 'red';
    }
    
    getServerLastMaintained() {
        return this.serverLastMaintained;
    }
}
