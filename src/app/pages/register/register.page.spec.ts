import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPage } from './register.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientsService } from 'src/app/services/clients.service';

import { RouterTestingModule } from '@angular/router/testing';

import { IonicModule } from '@ionic/angular';
import { Client } from 'src/app/models/Client';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        IonicModule,
        RouterTestingModule
      ],
      providers: [
        ClientsService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('identification field validity', () => {
    const id = component.userForm.controls.identification;
    expect(id.valid).toBeFalsy();
  });

  it('identification field required', () => {
    let errors = {};
    const id = component.userForm.controls.identification;
    errors = id.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('firstname field validity', () => {
    const name = component.userForm.controls.name;
    expect(name.valid).toBeFalsy();
  });

  it('firstname field required', () => {
    let errors = {};
    const name = component.userForm.controls.name;
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('lastname field validity', () => {
    const lastName = component.userForm.controls.lastName;
    expect(lastName.valid).toBeFalsy();
  });

  it('lastname field required', () => {
    let errors = {};
    const lastName = component.userForm.controls.lastName;
    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('birthday field validity', () => {
    const birthDay = component.userForm.controls.birthDay;
    expect(birthDay.valid).toBeFalsy();
  });

  it('birthday field required', () => {
    let errors = {};
    const birthDay = component.userForm.controls.birthDay;
    errors = birthDay.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('submitting a new client', () => {
    expect(component.userForm.valid).toBeFalsy();
    component.userForm.controls.identification.setValue(112659);
    component.userForm.controls.name.setValue('fredy');
    component.userForm.controls.lastName.setValue('blandon');
    component.userForm.controls.birthDay.setValue('1997-07-18T06:58:04.153-05:00');
    expect(component.userForm.valid).toBeTruthy();
  });

});
