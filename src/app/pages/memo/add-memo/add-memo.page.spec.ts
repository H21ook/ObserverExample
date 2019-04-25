import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemoPage } from './add-memo.page';

describe('AddMemoPage', () => {
  let component: AddMemoPage;
  let fixture: ComponentFixture<AddMemoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
