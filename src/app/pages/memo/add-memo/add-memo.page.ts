import { Component, OnInit } from '@angular/core';
import { Memo } from 'src/app/models/memo.model';
import { MemoService } from 'src/app/services/memo.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-memo',
  templateUrl: './add-memo.page.html',
  styleUrls: ['./add-memo.page.scss'],
})
export class AddMemoPage implements OnInit {

  private memo: Memo = {};
  saveBtnDisabled: boolean = true;

  constructor(
    private memoService: MemoService,
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  changeName() {
    if(this.memo.name) {
      this.saveBtnDisabled = false;
    } else {
      this.saveBtnDisabled = true;
    }
  }
  save() {
    this.memoService.addMemo(this.memo);
    this.navCtrl.navigateBack('/home');
  }
}
