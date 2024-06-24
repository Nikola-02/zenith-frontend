import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTracksCreateComponent } from './admin-tracks-create.component';

describe('AdminTracksCreateComponent', () => {
  let component: AdminTracksCreateComponent;
  let fixture: ComponentFixture<AdminTracksCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTracksCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTracksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
