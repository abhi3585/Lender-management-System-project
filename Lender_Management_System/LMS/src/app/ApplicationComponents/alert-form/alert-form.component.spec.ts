import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertFormComponent } from './alert-form.component';

describe('AlertFormComponent', () => {
  let component: AlertFormComponent;
  let fixture: ComponentFixture<AlertFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertFormComponent]
    });
    fixture = TestBed.createComponent(AlertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
