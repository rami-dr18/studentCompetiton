import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitProjectComponent } from './submit-project.component';

describe('SubmitProjectComponent', () => {
  let component: SubmitProjectComponent;
  let fixture: ComponentFixture<SubmitProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
