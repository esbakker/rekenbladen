import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekenbladComponent } from './rekenblad.component';

describe('RekenbladComponent', () => {
  let component: RekenbladComponent;
  let fixture: ComponentFixture<RekenbladComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RekenbladComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RekenbladComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
