import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTracksDashboardComponent } from './admin-tracks-dashboard.component';

describe('AdminTracksDashboardComponent', () => {
  let component: AdminTracksDashboardComponent;
  let fixture: ComponentFixture<AdminTracksDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTracksDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTracksDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
