// THIS IS AN ACCOUNTS SERVICE - SERVICE THAT STORES COMMON FETCHED DATA IN ALL COMPONENTS
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

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
  }

  updateAccount(id: number, status: string) {
    this.accounts[id].status = status;
  }
  
}