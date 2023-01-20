import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})

export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = 'No server was created';
  serverName = 'testServer';
  serverCreated = false;
  serverCreated2 = false;
  servers =['testServer','testServerTwo'];

  // Constructor behaves more like useEffect in React - get re-render after each load
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 3000)
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreated2 = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created successfully.Server Name is ' + this.serverName;
  }

  onUpdateServerName($event: Event) {
    console.log($event);
    // <HTMLInputElement> is the data type of the event coming in
    this.serverName = (<HTMLInputElement>event.target).value;
    console.log(this.serverName);
  }
}
