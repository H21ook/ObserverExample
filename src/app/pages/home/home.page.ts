import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { MemoService } from 'src/app/services/memo.service';
import { Memo } from 'src/app/models/memo.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  private contacts: Contact[];
  private memos: Memo[];

  private contactListHide: boolean = false;
  constructor(
    private contactService: ContactService,
    private memoService: MemoService
    ) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });

    this.memoService.getMemos().subscribe(data => {
      if(this.contacts) {
        this.contactListHide = true;
      } else {
        this.contactListHide = false;
      }
      console.log(this.contacts);
      this.memos = data;
    });
  }
}
