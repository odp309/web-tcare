import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelStatusComponent } from './label-status.component';

describe('LabelStatusComponent', () => {
  let component: LabelStatusComponent;
  let fixture: ComponentFixture<LabelStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabelStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
