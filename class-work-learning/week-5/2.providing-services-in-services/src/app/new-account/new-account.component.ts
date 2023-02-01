import { Component } from '@angular/core';;
// IMPORTING THE LoggingService and AccountsService SERVICES (CLASS USED WITH COMMON CODE);
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service'

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent {
  // DEFINE THE SERVICE OBJECT VARIABLE IN THE CONSTRUCTOR
  constructor(private loggingService: LoggingService, private accountsService
  : AccountsService) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    // USING A SERVICE: CALLING THE METHOD TO PROVIDE THE SERVICE
    this.accountsService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }

}
