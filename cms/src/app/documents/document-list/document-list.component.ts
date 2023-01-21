import { Component } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  documents: Document[] = [
    new Document( '1', 'R. Kent Jackson', 'Hello! This is my first message',
    'www.simonMule.com', null),
    new Document( '1', 'R. Kent Jackson', 'Hello! This is my first message',
    'www.simonMule.com', null),
  ];
}
