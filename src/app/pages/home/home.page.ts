import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { MemoService } from 'src/app/services/memo.service';
import { Memo } from 'src/app/models/memo.model';
import { trigger, animate, keyframes, transition, style } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('btn', [
      transition('true <=> false', [
        style({
          height: '{{height}}', 
          opacity: 0, 
          width: '{{width}}', 
          left: '{{left}}',
          top: '{{top}}'
        }),
        animate(500, keyframes([
          style({ opacity: 1, transform: ' scale(0)', offset: 0 }),
          style({ opacity: 1, transform: ' scale(1.5)', offset: 0.6 }),
          style({ opacity: 0, transform: ' scale(2.5)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class HomePage implements OnInit{
  
  private contacts: Contact[];
  private memos: Memo[];
  private rippleData: any = {}
  ripple: boolean = true;
  constructor(
    private contactService: ContactService,
    private memoService: MemoService
  ) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });

    this.memoService.getMemos().subscribe(data => {
      this.memos = data;
    });
  }

  toggleRipple(e) {
    this.rippleData = this.rippleEffect(e);
    this.ripple = !this.ripple;
  }

  rippleEffect(e) {
    var x = Math.max(e.target.clientWidth - e.offsetX, e.offsetX);
    var y = Math.max(e.target.clientHeight - e.offsetY, e.offsetY);
    var l = Math.max(x, y);
    let param = {
      width: l +'px',
      height: l +'px',
      left: (e.offsetX - l/2) + "px",
      top: (e.offsetY - l/2) + "px"
    };
    return param;
  }
}
