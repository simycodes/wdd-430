import { Component, EventEmitter, Output, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})

export class CockpitComponent {
  // CREATION OF USER DEFINED EVENTS
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  onAddServer(serverNameInput: HTMLInputElement) {
   // THIS WILL EMIT/CREATE AN EVENT(AN EVENT OBJECT) OF serverCreated SENT TO 
   // (serverCreated)="onServerAdded($event) IN THE app TEMPLATE
   // emit() IS A METHOD FROM THE EventEmitter<> CLASS/OBJECT THAT EMITS AN EVENT WITH PROVIDED ARGUMENTS
   this.serverCreated.emit({
      serverName: serverNameInput.value,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }

  onAddBlueprint(serverNameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: serverNameInput.value,
      serverContent: this.serverContentInput.nativeElement.value,
    }); 
  }
  
}
