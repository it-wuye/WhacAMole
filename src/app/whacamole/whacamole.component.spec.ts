import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhacamoleComponent } from './whacamole.component';

describe('WhacamoleComponent', () => {
  let component: WhacamoleComponent;
  let fixture: ComponentFixture<WhacamoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhacamoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhacamoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
