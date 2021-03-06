import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contacts: Observable<Contact[]>;
  private contactCollection: AngularFirestoreCollection<Contact>;

  constructor(private afs: AngularFirestore) { 

    this.contactCollection = this.afs.collection<Contact>('contacts');
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        })
      })
    );

  }

  getContacts(): Observable<Contact[]> {
    return this.contacts;
  }

  getContact(id: string): Observable<Contact> {
    return this.contactCollection.doc<Contact>(id).valueChanges().pipe(
      take(1),
      map(contact => {
        contact.id = id;
        return contact;
      })
    );
  }

  addContact(contact: Contact): Promise<DocumentReference> {
    return this.contactCollection.add(contact);
  }

  updateContact(contact: Contact): Promise<void> {
    return this.contactCollection.doc(contact.id).update(contact);
  }

  deleteContact(id: string): Promise<void> {
    return this.contactCollection.doc(id).delete();
  }
}
