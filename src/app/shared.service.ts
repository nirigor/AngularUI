import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './models/item.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://127.0.0.1:8000';
  // readonly APIUrl = 'http://16.171.144.39/api';

  readonly BASIC = 12;
  readonly STYLES1 = 15;
  readonly STYLES2 = 30;
  readonly INTRO = 6;
  readonly STORIES1 = 16;
  readonly STORIES2 = 16;
  readonly STORIES3 = 16;

  steps: Item[] = [];
  stepDict: {[name: string]: number} = {}

  constructor(private http:HttpClient) { }

  initSteps(isPaid: boolean): [Item[], {[name: string]: number}] {
    if (this.steps.length != 0 && Object.keys(this.stepDict).length != 0) return [this.steps, this.stepDict]
    
    let tmp = 0;
    
    // BASIC
    for (let i = 1;  i <= this.BASIC + 9; i++) {
      tmp = this.steps.push(new Item(i, this.BASIC, 'BASIC', false, true));
      this.stepDict[`BASIC_${i}`] = tmp - 1;
    }

    // Congrats 1
    tmp = this.steps.push(new Item(this.BASIC, this.BASIC, 'BASIC', false, true));
    this.stepDict['CONGRATS_1'] = tmp - 1;

    // STYLES
    for (let i = 1;  i <= this.STYLES1; i++) {
      tmp = this.steps.push(new Item(i, this.STYLES1, 'STYLES1', false, true));
      this.stepDict[`BF_${i}`] = tmp - 1;
    }

    for (let i = 1;  i <= this.STYLES2; i++) {
      tmp = this.steps.push(new Item(i, this.STYLES2, 'STYLES2',false, true));
      this.stepDict[`TK_${i}`] = tmp - 1;
    }

    // Congrats 2
    tmp = this.steps.push(new Item(this.STYLES2, this.STYLES2, 'STYLES2',false, true));
    this.stepDict['CONGRATS_2'] = tmp - 1;

    // STORIES
    for (let i = 1;  i <= this.INTRO; i++) {
      tmp = this.steps.push(new Item(i, this.INTRO, 'INTRO', true, true));
      this.stepDict[`INTRO_${i}`] = tmp - 1;
    }

    for (let i = 1;  i <= this.STORIES1; i++) {
      tmp = this.steps.push(new Item(i, this.STORIES1, 'STORIES1', false, true));
      this.stepDict[`STORIES1_${i}`] = tmp - 1;
    }

    for (let i = 1;  i <= this.STORIES2; i++) {
      tmp = this.steps.push(new Item(i, this.STORIES2, 'STORIES2', false, true));
      this.stepDict[`STORIES2_${i}`] = tmp - 1;
    }

    for (let i = 1;  i <= this.STORIES3; i++) {
      tmp = this.steps.push(new Item(i, this.STORIES3, 'STORIES3', false, true));
      this.stepDict[`STORIES3_${i}`] = tmp - 1;
    }


    if (isPaid) {
      this.steps[this.stepDict['BASIC_1']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_2']]['isVisible'] = false;
      for (let step = 2; step < this.stepDict['BF_1']; step++) {
        this.steps[step]['phaseSteps'] = this.BASIC - 2;
        this.steps[step]['stepNumber'] -= 2;
      }
    }

    return [this.steps, this.stepDict];
  }

  submitSurvey(data:any){
    return this.http.post(this.APIUrl, data);
  }

  setItem(key: string, value: string, type: string){
    switch(type) {
      case 'session':
        sessionStorage.setItem(key, value);
        break;
      case 'local':
        localStorage.setItem(key, value);
        break;
      default:
        localStorage.setItem(key, value);
    }
  }

  getItem(key: string, type: string){
    switch(type) {
      case 'session':
        return sessionStorage.getItem(key);
      case 'local':
        return localStorage.getItem(key);
      default:
        return localStorage.getItem(key);
    }
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
}
