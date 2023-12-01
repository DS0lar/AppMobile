
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import { Region } from 'src/app/models/region';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';

// Importa IonicStorageService
import { IonicStorageService } from 'src/app/services/ionic-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario: any = {}; // Define usuario aquí
  @ViewChild('profilePicture', { static: false }) profilePicture?: ElementRef<any>;

  regiones: Region[] = [];
  comunas: any[] = [];
  regionSel: number = 0;
  comunaSel: number = 0;
  formularioRegistro: FormGroup;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public alertController: AlertController,
    private locationService: LocationService,
    // Inyecta IonicStorageService
    private storage: IonicStorageService,
  ) {
    this.formularioRegistro = this.fb.group({
      'user': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    });

    this.profilePicture = new ElementRef(null); // Agrega esta línea para asignar un valor inicial
  }

  ngOnInit() {
    this.cargarRegion();
  }

  async cargarComuna() {
    try {
      const req = await this.locationService.getComuna(this.regionSel);
      this.comunas = req.data;
    } catch (error: any) {
      console.log("ERROR", error);
    }
  }

  async cargarRegion() {
    try {
      const req = await this.locationService.getRegion();
      this.regiones = req.data;
      console.log("REGIONES", this.regiones);
    } catch (error) {

    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    const imageUrl = image.webPath;

    // Verifica si profilePicture está definido antes de acceder a su propiedad
    if (this.profilePicture) {
      // Set the image source
      this.profilePicture.nativeElement.src = imageUrl;
    }

    // Save the image URL to Ionic Storage
    await this.storage.set('profilePicture', imageUrl);

    // Actualiza la propiedad usuario
    this.usuario.profilePicture = imageUrl;
  }

  async guardar() {
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Hay datos sin llenar',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    } else {
      var usuario = {
        nombre: f.user,
        password: f.password,
        region: this.regionSel,
        comuna: this.comunaSel,
        profilePicture: await this.storage.get('profilePicture'), // Retrieve the image URL
      };

      // Usa Ionic Storage para guardar datos
      await this.storage.set('usuario', usuario);

      this.formularioRegistro.reset();
      this.router.navigate(['/login']);
    }
  }
}

