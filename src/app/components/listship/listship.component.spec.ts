import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListshipComponent } from './listship.component';

describe('ListshipComponent', () => {
  let component: ListshipComponent;
  let fixture: ComponentFixture<ListshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
