import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsModalFormComponent } from './cs-modal-form.component';

describe('CsModalFormComponent', () => {
  let component: CsModalFormComponent;
  let fixture: ComponentFixture<CsModalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsModalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
