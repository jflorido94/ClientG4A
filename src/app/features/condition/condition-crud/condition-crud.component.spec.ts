import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionCrudComponent } from './condition-crud.component';

describe('ConditionCrudComponent', () => {
  let component: ConditionCrudComponent;
  let fixture: ComponentFixture<ConditionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
