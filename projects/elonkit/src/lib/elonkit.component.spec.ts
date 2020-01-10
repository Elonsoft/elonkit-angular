import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElonkitComponent } from './elonkit.component';

describe('ElonkitComponent', () => {
  let component: ElonkitComponent;
  let fixture: ComponentFixture<ElonkitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElonkitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElonkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
