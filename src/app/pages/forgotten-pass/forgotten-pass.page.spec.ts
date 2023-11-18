import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgottenPassPage } from './forgotten-pass.page';

describe('ForgottenPassPage', () => {
  let component: ForgottenPassPage;
  let fixture: ComponentFixture<ForgottenPassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ForgottenPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
