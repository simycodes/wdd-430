import { Component } from '@angular/core';

// The interface component is used to link to be created component to i) 
// The html file the component/its variables will be displayed in (root html) on the browser,
// ii) the html file in which component will be directly used in,
// iii) The css file the component will will
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  serverElements = [{type: 'server', name: 'testServer', content: 'This is a test server'}];
  
  // HERE serverData: {serverName: string, serverContent: string} REPRESENTS THE INCOMING 
  // $event FROM cockpit COMPONENT
  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }
}
