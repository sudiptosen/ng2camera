import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPicComponent } from './new-pic.component';

describe('NewPicComponent', () => {
  let component: NewPicComponent;
  let fixture: ComponentFixture<NewPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
