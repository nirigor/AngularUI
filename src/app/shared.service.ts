import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://127.0.0.1:8000';
  
  readonly BASIC = 10;
  readonly STYLES1 = 15;
  readonly STYLES2 = 30;
  readonly STORIES1 = 2;
  readonly STORIES2 = 16;
  readonly STORIES3 = 16;
  readonly STORIES4 = 16;

  readonly sum = [
    this.BASIC,
    this.BASIC + this.STYLES1,
    this.BASIC + this.STYLES1 + this.STYLES2,
    this.BASIC + this.STYLES1 + this.STYLES2 + this.STORIES1,
    this.BASIC + this.STYLES1 + this.STYLES2 + this.STORIES1 + this.STORIES2,
    this.BASIC + this.STYLES1 + this.STYLES2 + this.STORIES1 + this.STORIES2 + this.STORIES3,
    this.BASIC + this.STYLES1 + this.STYLES2 + this.STORIES1 + this.STORIES2 + this.STORIES3 + this.STORIES4
  ]

  readonly phases = {
    'BASIC' : { 'steps' : this.BASIC, 'min' : 0, 'max' : this.BASIC },
    'STYLES1' : { 'steps' : this.STYLES1, 'min' : this.sum[0], 'max' : this.sum[1] },
    'STYLES2' : { 'steps' : this.STYLES2, 'min' : this.sum[1], 'max' : this.sum[2] },
    'STORIES1' : { 'steps' : this.STORIES1, 'min' : this.sum[2], 'max' : this.sum[3] },
    'STORIES2' : { 'steps' : this.STORIES2, 'min' : this.sum[3], 'max' : this.sum[4] },
    'STORIES3' : { 'steps' : this.STORIES3, 'min' : this.sum[4], 'max' : this.sum[5] },
    'STORIES4' : { 'steps' : this.STORIES4, 'min' : this.sum[5], 'max' : this.sum[6] }
  }

  constructor(private http:HttpClient) { }

  submitSurvey(data:any){
    return this.http.post(this.APIUrl, data);
  }

  setItem(key: string, value: string){
    localStorage.setItem(key, value);
  }

  getItem(key: string){
    return localStorage.getItem(key);
  }
  
  getRandomNumber(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  getCases() {
    let n1, n2, n3 = 0;
    while ((n1 == n2) || (n1 == n3) || (n2 == n3)) {
      n1 = this.getRandomNumber(1, 50);
      n2 = this.getRandomNumber(1, 50);
      n3 = this.getRandomNumber(1, 50);
    }
    return [n1, n2, n3];
  }

  getCurrentPhaseSteps(step: number): {[name: string]: any} {
    for (const [key, value] of Object.entries(this.phases)) {
      if (step > value.min && step <= value.max) {
        return {'phase' : key, 'steps': value.steps, 'min': value.min };
      }
    }
    return {'phase' : 'STORIES4', 'steps': this.phases['STORIES4'].steps, 'min': this.phases['STORIES4'].min };
  }
}
