import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTanentComponent } from './create-tanent.component';

describe('CreateTanentComponent', () => {
  let component: CreateTanentComponent;
  let fixture: ComponentFixture<CreateTanentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTanentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
