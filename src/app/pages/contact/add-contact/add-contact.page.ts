import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {

  private contact: Contact = {};
  saveBtnDisabled: boolean = true;

  constructor(
    private contactService: ContactService,
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  changePhoneNumber() {
    if(this.contact.phonenumber) {
      this.saveBtnDisabled = false;
    } else {
      this.saveBtnDisabled = true;
    }
  }
  save() {
    this.contactService.addContact(this.contact);
    this.navCtrl.navigateBack('/home');
  }
}
