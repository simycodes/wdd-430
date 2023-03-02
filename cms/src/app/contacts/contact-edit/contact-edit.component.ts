import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { Contact } from '../contact.model';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent {
  originalContact: Contact;
  // document references the edited version of the document displayed in the form. 
  contact: Contact;
  // editMode indicates whether an existing document is to be edited, or a new document is being created.
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  contactAlreadyAdded: boolean;
  // contactGroup: Contact[] = [];

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {}

    ngOnInit() {
    // CHECK IF A CONTACT ID IS PASSED TO KNOW IF WE EDITING OR ADDING A NEW DOCUMENT
    this.route.params.subscribe((params: Params) => { 
      this.id = params['id'];
      // CHECK IF ANY DOCUMENT ID IS PASSED
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);

      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      // copies originalDocument object and into this.document object - no reference passed
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      // Determine if the contact has a group (in other words, the group property has
      // a value).
      if(this.originalContact.group?.length !== 0){
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        // console.log(this.groupContacts);
      }
    })
  }

  // FUNCTION TO ADD AND UPDATE A CONTACT ITEM
  onSubmit(contactForm: NgForm) {
    // GET VALUES FROM FORM AND ASSIGN THEM
    let id = " ";
    let name = contactForm.value.name;
    let email = contactForm.value.email;
    let phone = contactForm.value.phone;
    let imageUrl = contactForm.value.imageUrl;
    let groupsC:any = this.groupContacts || [];
    console.log(groupsC);
    // let groupsC = contactForm.value.group;
    //CREATE NEW DOCUMENT USING THE DATA FROM THE USER 
    const newContact = new Contact(id,name,email, phone, imageUrl, groupsC);

    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact)
    }
    else {
      this.contactService.addContact(newContact);
    }
    // GO BACK TO THE DOCUMENTS ONLY PAGE
    this.router.navigate(['/contacts']);
  }

  // DRAG AND DROP FUNCTIONALITY
  // Method to Add a New Contact to the Group.This method first gets the dragData 
  // from $event passed into the method, and assigns it to the selectedContact variable. 
  addToGroup($event: any) {
   const selectedContact: Contact = $event.dragData;
   const invalidGroupContact = this.isInvalidContact(selectedContact);
   if (invalidGroupContact){
      return;
   }
   this.groupContacts.push(selectedContact);
  }

  // this method determines if the newContact to be added to the group is 
  // already in the current contact’s group array.
  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id) {
        this.contactAlreadyAdded = true;
        return true;
      }
    }
    this.contactAlreadyAdded = false;
    return false;
  }

  // Method to Remove a New Contact from the Group
  onRemoveItem(index: number) {
   if (index < 0 || index >= this.groupContacts.length) {
      return;
   }
   this.groupContacts.splice(index, 1);
  }

  onCancel() {
    // GO BACK TO THE DOCUMENTS ONLY PAGE
    this.router.navigate(['/contacts']);
  }
}
