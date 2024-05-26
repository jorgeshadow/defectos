import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamsnapshotsComponent } from './webcamsnapshots.component';

describe('WebcamsnapshotsComponent', () => {
  let component: WebcamsnapshotsComponent;
  let fixture: ComponentFixture<WebcamsnapshotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamsnapshotsComponent]
    });
    fixture = TestBed.createComponent(WebcamsnapshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
