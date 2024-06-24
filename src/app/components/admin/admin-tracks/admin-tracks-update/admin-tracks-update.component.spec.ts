import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTracksUpdateComponent } from './admin-tracks-update.component';

describe('AdminTracksUpdateComponent', () => {
  let component: AdminTracksUpdateComponent;
  let fixture: ComponentFixture<AdminTracksUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTracksUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTracksUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
