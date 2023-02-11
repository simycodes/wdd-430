import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute,  Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})

export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;

  // MAKE AN ACTIVATED ROUTE INSTANCE VARIABLE IN ORDER TO GET THE ID IN THE ROUTE
  // AND TO USE THE OBTAINED ID TO FETCH DATA
  constructor(private contactService: ContactService, 
    private route: ActivatedRoute, private router: Router){}

    ngOnInit() {
      // GET THE ACTUAL PASSED ID FROM THE ROUTE
      this.route.params.subscribe((params: Params)=> {
        this.id = params['id'];
        // USE THE ID FROM ROUTE TO FETCH DATA TO DISPLAY FOR DETAILED DOCUMENT ITEM
        this.contact =  this.contactService.getContact(this.id);
      })
    }

    // FUNCTION TO DELETE A DOCUMENT
    onDelete() {
      this.contactService.deleteContact(this.contact);
      // route back to the '/documents' URL
      this.router.navigateByUrl('/contacts');
      // this.router.navigate(['/documents'], {relativeTo: this.route});
    }
}
