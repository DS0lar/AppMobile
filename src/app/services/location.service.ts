import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://dev.matiivilla.cl/duoc/location/'

  constructor(private http:HttpClient) { }
  //region
  async getRegion(){
    return await lastValueFrom(this.http.get<ApiResponse<any>>(`${this.apiUrl}region`));
  }

  async getComuna(regionId:number){
    return await lastValueFrom(this.http.get<ApiResponse<any>>(`${this.apiUrl}comuna/` + regionId));
  }

}
