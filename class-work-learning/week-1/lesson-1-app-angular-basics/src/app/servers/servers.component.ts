import { Component } from '@angular/core';

@Component({
  // selector: 'app-servers',
  // selector: '[app-servers]',
  selector: '.app-servers',
  templateUrl: './servers.component.html', // This is external way of writing components HTML
  // Template alone is inline HTMl can be done here mostly if HTMl code to write is little
  // ` '' "" can be used for inline css
  // template: ` 
  // <app-server></app-server>
  // <app-server></app-server>
  // `,
  styleUrls: ['./servers.component.css'] // this is an array so many style sheets can be linked
  // Below is inline styling for a component : Either work with styleUrls or styles - not both but each allow linking several style sheets since they exist as an array
  // styles: [` 
  //   h3 {
  //     color: red;
  //   }
  // `]
})
export class ServersComponent {

}
