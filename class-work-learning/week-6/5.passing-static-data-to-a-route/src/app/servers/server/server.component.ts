import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  // INJECT THE SERVERS SERVICE AND ACTIVATED ROUTE TO GET URL PARAMS
  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // RETRIEVING URL KEY VALUE PAIRS AND FRAGMENT USING ACTIVATED ROUTE 
    const id = +this.route.snapshot.params['id']; // + MAKES ID A number FROM string
    this.server = this.serversService.getServer(id);
    // SUBSCRIBE TO THE params FOR ASYNC CHANGES IN THE ID TO CHANGE SERVER CONTENT
    this.route.params.subscribe((params: Params)=> {
      this.server = this.serversService.getServer(+params['id']);
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

}
