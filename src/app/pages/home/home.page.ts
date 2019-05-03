import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { MemoService } from 'src/app/services/memo.service';
import { Memo } from 'src/app/models/memo.model';
import { trigger, animate, keyframes, transition, style, state } from '@angular/animations';
import { transcode } from 'buffer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    // trigger('test1', [
    //   transition('void => *', [
    //     style({transform: 'translateX(-100%)'}),
    //     animate(1000, keyframes([
    //       style({opacity: 0, transform: 'translateX(0)', offset: 0}),
    //     ]))
    //   ]),
    //   transition('* => void', [
    //     animate(1000, keyframes([
    //       style({opacity: 1, transform: 'translateX(0)', offset: 0}),
    //       style({opacity: 1, transform: 'translateX({{x}}px)', offset: 0.7}),
    //       style({opacity: 0, transform: 'translateX(100%)', offset: 1})
    //     ]))
    //   ])
    // ])
    trigger('test1', [
      // state('true', style({ height: '0px', width: '0px' })),
      // state('false', style({ height: '50px', width: '50px' })),
      // transition('true => *', [
      //   // style({transform: 'translateX(50%), translateY(50%)'}),
      //   animate(1000, keyframes([
      //     style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
      //     style({ opacity: 1, transform: 'translateX(-300px)', offset: 0.5 }),
      //   ]))
      // ]),
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
          // style({ opacity: 1, transform: 'scale(0)', offset: 0 }),
          style({ opacity: 0, transform: ' scale(1)', offset: 1 }),
        ]))
      ])
    ])

  ]
})
export class HomePage implements OnInit{
  
  private contacts: Contact[];
  private memos: Memo[];
  private show: boolean = true;
  private ripple: any = {}
  openClose: boolean = true;
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

  toggleDiv(e) {
    console.log(e);
    var d = Math.max(e.toElement.clientWidth - e.offsetX, e.offsetX);
    this.ripple.x = e.clientX + 'px';
    this.ripple.y = e.clientY + 'px';
    console.log(d);
    this.ripple.width = this.ripple.height = d * 2 +'px';
    this.ripple.left = 0 + "px"; // - d / 2 + 'px';
    this.ripple.top = 0 + "px"; // - e.offsetY - e.clientX + 'px';
    console.log(this.ripple);
    // this.show = this.show ? false : true;
    this.openClose = this.openClose === false ? true : false;
  }
}
