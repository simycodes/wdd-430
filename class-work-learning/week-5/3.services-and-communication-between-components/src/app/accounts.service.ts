// THIS IS AN ACCOUNTS SERVICE - SERVICE THAT STORES COMMON FETCHED DATA IN ALL COMPONENTS
import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from "./logging.service";

@Injectable()
export class AccountsService {
    accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  // MAKING AN EVENT
  statusUpdated = new EventEmitter<string>();

  // USING SERVICE INSIDE ANOTHER SERVICE
  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChange(status);
  }

  updateAccount(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
  
}