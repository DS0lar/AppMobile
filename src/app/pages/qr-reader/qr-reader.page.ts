import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserMultiFormatReader, Result, BarcodeFormat } from '@zxing/library';


@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.page.html',
  styleUrls: ['./qr-reader.page.scss'],
})
export class QrReaderPage implements OnInit {
  qrResult: string = '';
  codeReader: BrowserMultiFormatReader;
  isScanning: boolean = false;
  qrScanned: boolean = false;

  @ViewChild('videoElement', { static: true }) videoElement: ElementRef | undefined;
  @ViewChild('canvas', { static: true }) canvasElement: ElementRef | undefined;
  @ViewChild('capturedImage', { static: true }) capturedImage: ElementRef | undefined;


  constructor() {
    this.codeReader = new BrowserMultiFormatReader();

  }

  ngOnInit() {
  }

  openScanner() {
    if (this.videoElement) {
      const hints = new Map<BarcodeFormat, any>();
      hints.set(BarcodeFormat.QR_CODE, {});
      this.codeReader

        .decodeFromInputVideoDevice(undefined, this.videoElement.nativeElement)
        .then((result: Result) => {
          this.qrResult = result.getText();
          let datosEscaneados = this.qrResult.split(',');

          var qrCode = {
            profesor: datosEscaneados[0],
            hora: datosEscaneados[1],
            sala: datosEscaneados[2],
            dia: datosEscaneados[3]
          }
          localStorage.setItem('qrCode', JSON.stringify(qrCode));
          this.isScanning = false;
          this.qrScanned = true;

          if (this.videoElement && this.canvasElement && this.capturedImage) {
            const video = this.videoElement.nativeElement;
            const canvas = this.canvasElement.nativeElement;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const capturedImage = canvas.toDataURL('image/png');
            // Ahora puedes hacer lo que quieras con capturedImage
            this.capturedImage.nativeElement.src = capturedImage;
          }
        })
        .catch((error: any) => {
          console.error(error);
          this.isScanning = false;
        });

      this.isScanning = true;
    }
  }

  closeScanner() {
    this.codeReader.reset();
    this.qrResult = '';
  }

  

}
