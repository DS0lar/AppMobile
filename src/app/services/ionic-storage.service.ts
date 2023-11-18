import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IonicStorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Si ya está inicializado, no lo inicialices nuevamente
    if (this._storage !== null) {
      return;
    }

    // Intenta obtener el almacenamiento de forma asíncrona
    const storage = await this.storage.create();

    // Si se obtiene correctamente, asigna el almacenamiento
    this._storage = storage;
  }

  // Método para obtener un valor del almacenamiento
  async get(key: string) {
    await this.init();
    const value = await this._storage?.get(key);
    return value;
  }

  // Método para guardar un valor en el almacenamiento
  async set(key: string, value: any) {
    await this.init();
    await this._storage?.set(key, value);
  }
}
