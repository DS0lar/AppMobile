
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserMultiFormatReader, Result, BarcodeFormat } from '@zxing/library';
import { DataService } from '../../services/data.service';
import { IonicStorageService } from 'src/app/services/ionic-storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.page.html',
  styleUrls: ['./qr-reader.page.scss'],
})
export class QrReaderPage implements OnInit {
  coordenadas: any = null;
  qrResult: string = '';
  codeReader: BrowserMultiFormatReader;
  isScanning: boolean = false;
  showInfo: boolean = false; // Agrega esta propiedad
  scanned: boolean = false; // Agrega esta propiedad
  userData: {
    nombre: string;
    apellido: string;
    carrera: string;
    profilePicture?: string; // Agrega esta propiedad
    rut: string;
    datosEscaneados?: string[];
    region?: string;
    comuna?: string;
  } = {
    nombre: '',
    apellido: '',
    carrera: '',
    rut: '',
  };

  @ViewChild('videoElement', { static: true }) videoElement: ElementRef | undefined;

  constructor(private dataService: DataService, private storage: IonicStorageService, private geolocation: Geolocation) {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit() {
    this.getUserInfo();
    this.obtenerGeolocalizacion();
/*
    // Obtener ubicación del usuario al iniciar la página
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Actualizar el contenido de los elementos en el HTML con las coordenadas
          const latitudeElement = document.getElementById('latitude');
          const longitudeElement = document.getElementById('longitude');

          if (latitudeElement && longitudeElement) {
            latitudeElement.innerText = 'Latitud: ' + latitude;
            longitudeElement.innerText = 'Longitud: ' + longitude;
          }

          // Puedes hacer lo que quieras con las coordenadas aquí, por ejemplo, almacenarlas en el Local Storage
          localStorage.setItem('latitude', latitude.toString());
          localStorage.setItem('longitude', longitude.toString());
        },
        (error) => {
          console.error(error);
          // Manejar errores aquí si la obtención de ubicación falla
        }
      );
    } else {
      console.error('Geolocalización no es compatible en este navegador.');
      // Manejar casos donde la geolocalización no es compatible
    }
*/

  }



  openScanner() {
    if (this.videoElement) {
      const hints = new Map<BarcodeFormat, any>();
      hints.set(BarcodeFormat.QR_CODE, {});

      this.codeReader
        .decodeFromInputVideoDevice(undefined, this.videoElement.nativeElement)
        .then((result: Result) => {
          this.qrResult = result.getText();
          const datosEscaneados = this.qrResult.split(',');

          // Obtén la región y la comuna si están disponibles
          const region = datosEscaneados[0]; // Suponiendo que la región está en la primera posición
          const comuna = datosEscaneados[1]; // Suponiendo que la comuna está en la segunda posición

          // Actualiza solo las propiedades relevantes de userData
          this.userData = {
            ...this.userData,
            datosEscaneados: datosEscaneados,
          };

          if (region && !this.userData.region) {
            this.userData.region = region;
          }

          if (comuna && !this.userData.comuna) {
            this.userData.comuna = comuna;
          }

          console.log('Datos escaneados:', datosEscaneados);

          // Actualiza solo las propiedades relevantes en el localStorage
          this.storage.set('usuario', {  // Usa la misma clave 'usuario' aquí
            ...this.userData,
          })
          .then(() => {
            // Llama a getUserInfo después de actualizar el localStorage
            this.getUserInfo();
          })
          .catch((error) => {
            console.error(error);
          });

          this.showInfo = true;
          setTimeout(() => {
            this.closeScanner();
          }, 0);
        })
        .catch((error: any) => {
          console.error(error);
        });

      this.isScanning = true;
      this.scanned = true;
    }
  }
  obtenerGeolocalizacion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.coordenadas = resp.coords;
    }).catch((error) => {
      console.error('Error al obtener la geolocalización', error);
    });
  }



  closeScanner() {
    this.codeReader.reset();
    this.qrResult = '';
    this.isScanning = false;
  }

  // En tu componente QrReaderPage
  async getUserInfo() {
    this.storage.get('usuario').then((userData) => {
      if (userData) {
        const regionNombre = userData.region;
        const comunaNombre = userData.comuna;

        console.log('Region Nombre:', regionNombre);
        console.log('Comuna Nombre:', comunaNombre);

        // Combina los datos del usuario y los datos escaneados en 'userData'
        this.userData = {
          ...userData,
          region: regionNombre,
          comuna: comunaNombre,
          profilePicture: userData.profilePicture, // Agrega esta línea
        };
      }
    });
  }


}
