import { Component, Input } from '@angular/core';
// IMPORTING THE LoggingService and AccountsService SERVICES (CLASS USED WITH COMMON CODE);
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

   // DEFINE THE SERVICE OBJECT VARIABLE IN THE CONSTRUCTOR
  constructor(private loggingService: LoggingService, private accountsService:
    AccountsService) {}

  onSetTo(status: string) {
    // USING A SERVICE: CALLING THE METHOD TO PROVIDE THE SERVICE
    this.accountsService.updateAccount(this.id, status);
    this.loggingService.logStatusChange(status);
  }
}
