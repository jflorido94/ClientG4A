import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesCrudComponent } from './states-crud.component';

describe('StatesCrudComponent', () => {
  let component: StatesCrudComponent;
  let fixture: ComponentFixture<StatesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatesCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
