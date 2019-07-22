import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from 'src/app/models/Client';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userForm: FormGroup;
  listClients: Client[] = [];
  isReady = false;
  newClient: Client = {
    birthdate: '',
    firstname: '',
    lastname: '',
    identification: ''
  };

  constructor(
    private clientService: ClientsService,
    private formBuilder: FormBuilder,
    public toastController: ToastController) {
    this.userForm = this.formBuilder.group({
      identification: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDay: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.clientService.getClients()
    .subscribe(
      (data) => {
        for (const item in data) {
          if (data.hasOwnProperty(item)) {
            const element = data[item];
            this.listClients.push(element);
            this.isReady = true;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async addUser() {
    if (!this.userForm.valid) {
      this.userForm.reset();
      return;
    }

    // Validation about Identification field
    const id = this.userForm.controls.identification.value.toString();
    const value = this.listClients.find(d => id === d.identification ? id : null);

    let title: string;

    if (value !== undefined) {
      title = 'Ya estás registrado Señor/a' + ' ' + value.firstname;
    } else {
      title = 'Ya estás registrado Señor/a';
    }

    const toastID = await this.toastController.create({
      message: title,
      duration: 2000,
      color: 'warning'
    });

    if (value !== undefined) {
      toastID.present();
      this.userForm.controls.identification.reset();
      return;
    }

    // Validation about Birthday field
    const toastAge = await this.toastController.create({
      message: 'Debe ser mayor de edad',
      duration: 2000,
      color: 'warning'
    });

    const birthday = new Date(this.userForm.controls.birthDay.value);
    const current = new Date();
    if ((birthday.getDate() === current.getDate()) && (current.getFullYear() - birthday.getFullYear()) < 18 ) {
      toastAge.present();
      this.userForm.controls.birthDay.reset();
      return;
    }

    // Validate correct saving data
    const toastError = await this.toastController.create({
      message: 'Error guardando usuario',
      duration: 2000,
      color: 'danger'
    });

    // Validate correct saving data
    const toastOK = await this.toastController.create({
      message: 'Gracias por registrarse',
      duration: 2000,
      color: 'success'
    });

    this.newClient.identification = id;
    this.newClient.firstname = this.userForm.controls.name.value;
    this.newClient.lastname = this.userForm.controls.lastName.value;

    let finalBirthday: string;
    const month = birthday.getMonth() + 1;
    let newMonth: string;
    if (month < 10) {
      newMonth = '0' + month.toString();
    }
    const day  = birthday.getDate();
    const year = birthday.getFullYear();
    finalBirthday = day + '-' + newMonth + '-' + year;
    this.newClient.birthdate = finalBirthday;

    this.clientService.addClient(this.newClient)
    .subscribe(
      (data) => {
        toastOK.present();
        this.userForm.reset();
      },
      (error) => {
        toastError.present();
        this.userForm.reset();
      }
    );
  }

}
