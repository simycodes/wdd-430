import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DocumentsComponent } from "./documents/documents.component";
import { MessageListComponent } from "./messages/message-list/message-list.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { DocumentDetailComponent } from "./documents/document-detail/document-detail.component";
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";


const appRoutes: Routes = [
    {path: '', redirectTo: '/documents', pathMatch: 'full'}, // THIS IS THE DEFAULT ROUTE
    {path: 'documents', component: DocumentsComponent, children: [
        { path: 'new', component: DocumentEditComponent},
        { path: ':id', component:DocumentDetailComponent },
        { path: ':id/edit', component: DocumentEditComponent},
        // PLACE DYNAMIC PARAMS CLOSE TO EACH OTHER AT THE END :id THEN :id/edit
        // BECAUSE 'new' MAY BE CONSIDERED AS AN ID IF PLACED AFTER :id
    ]},
    {path: 'messages', component: MessageListComponent, resolve: [] },
    {path: 'contacts', component: ContactsComponent, children: [
        { path: 'new', component: ContactEditComponent},
        { path: ':id', component: ContactDetailComponent },
        { path: ':id/edit', component: ContactEditComponent}, 
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}