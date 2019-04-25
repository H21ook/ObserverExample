import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMemoPage } from './detail-memo.page';

describe('DetailMemoPage', () => {
  let component: DetailMemoPage;
  let fixture: ComponentFixture<DetailMemoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMemoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
