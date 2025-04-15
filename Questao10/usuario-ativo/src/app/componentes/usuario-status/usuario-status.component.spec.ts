import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioStatusComponent } from './usuario-status.component';

describe('UsuarioStatusComponent', () => {
  let component: UsuarioStatusComponent;
  let fixture: ComponentFixture<UsuarioStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
