import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeMapComponent } from './native-map.component';

describe('NativeMapComponent', () => {
  let component: NativeMapComponent;
  let fixture: ComponentFixture<NativeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NativeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NativeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
