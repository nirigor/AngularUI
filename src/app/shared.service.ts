import { Injectable } from '@angular/core';
import { Item } from './models/item.model';
import { Participant } from './models/participant.model';
import { Feedback } from './models/feedback.model';
import { Haptics } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  readonly APIUrlDev = `${window.location.protocol}//${window.location.hostname}:8000/api`;
  readonly APIUrlProd = window.location.origin + '/api';
  readonly BASIC = 11;
  readonly STYLES1 = 16;
  readonly STYLES2 = 10;
  readonly INTRO = 7;
  readonly STORIES1 = 24;
  readonly STORIES2 = 23;
  readonly STORIES3 = 23;
  readonly COMPLETE = 2;

  readonly PROGRESS_LOCATION = 'session';
  readonly DEFAULT_TIMEOUT = 5000;

  steps: Item[] = [];
  stepDict: {[name: string]: number} = {}
  feedback: any;
  APIUrl: string = "";
  isPaid: boolean = false;
  constructor() { }

  vibrate() {
      Haptics.vibrate({duration: 50});
  }

  initSteps(isPaid: boolean): [Item[], {[name: string]: number}] {
    if (this.steps.length != 0 && Object.keys(this.stepDict).length != 0) return [this.steps, this.stepDict]
    let ts = new Date();
    let tmp = 0;
    
    // BASIC
    for (let i = 1;  i < this.BASIC; i++) {
      tmp = this.steps.push(new Item(i, this.BASIC, 'BASIC', false, true, ts, ts, 0));
      this.stepDict[`BASIC_${i}`] = tmp - 1;
    }

    for (let i = this.BASIC;  i <= this.BASIC + 9; i++) {
      tmp = this.steps.push(new Item(this.BASIC, this.BASIC, 'BASIC', false, true, ts, ts, 0));
      this.stepDict[`BASIC_${i}`] = tmp - 1;
    }

    // Congrats 1
    tmp = this.steps.push(new Item(this.BASIC, this.BASIC, 'BASIC', false, true, ts, ts, 0));
    this.stepDict['CONGRATS_1'] = tmp - 1;

    // STYLES
    for (let i = 1;  i <= this.STYLES1; i++) {
      tmp = this.steps.push(new Item(i, this.STYLES1, 'STYLES1', false, true, ts, ts, 500));
      this.stepDict[`BF_${i}`] = tmp - 1;
    }

    for (let i = 1;  i <= this.STYLES2; i++) {
      tmp = this.steps.push(new Item(i, this.STYLES2, 'STYLES2', false, true, ts, ts, 1500));
      this.stepDict[`TK_${i}`] = tmp - 1;
    }

    // Congrats 2
    tmp = this.steps.push(new Item(this.STYLES2, this.STYLES2, 'STYLES2', false, true, ts, ts, 0));
    this.stepDict['CONGRATS_2'] = tmp - 1;

    // STORIES
    for (let i = 1;  i <= this.INTRO; i++) {
      tmp = this.steps.push(new Item(i, this.INTRO, 'INTRO', true, true, ts, ts, 0));
      this.stepDict[`INTRO_${i}`] = tmp - 1;
    }

    for (let i = 1;  i <= this.STORIES1; i++) {
      tmp = this.steps.push(new Item(i, this.STORIES1, 'STORIES1', false, true, ts, ts, 1000));
      this.stepDict[`STORIES1_${i}`] = tmp - 1;
    }

    for (let i = 1;  i <= this.STORIES2; i++) {
      tmp = this.steps.push(new Item(i, this.STORIES2, 'STORIES2', false, true, ts, ts, 1000));
      this.stepDict[`STORIES2_${i}`] = tmp - 1;
    }

    for (let i = 1;  i <= this.STORIES3; i++) {
      tmp = this.steps.push(new Item(i, this.STORIES3, 'STORIES3', false, true, ts, ts, 1000));
      this.stepDict[`STORIES3_${i}`] = tmp - 1;
    }

    // Congrats 3
    tmp = this.steps.push(new Item(this.STORIES3, this.STORIES3, 'STORIES3', false, true, ts, ts, 0));
    this.stepDict['CONGRATS_3'] = tmp - 1;

    // Complete
    for (let i = 1;  i <= this.COMPLETE; i++) {
      tmp = this.steps.push(new Item(i, this.COMPLETE, 'COMPLETE', false, true, ts, ts, 0));
      this.stepDict[`COMPLETE_${i}`] = tmp - 1;
    }

    // if (isPaid) {
    //   this.steps[this.stepDict['BASIC_1']]['isVisible'] = false;
    //   this.steps[this.stepDict['BASIC_2']]['isVisible'] = false;
    //   for (let step = 2; step < this.stepDict['BF_1']; step++) {
    //     this.steps[step]['phaseSteps'] = this.BASIC - 2;
    //     this.steps[step]['stepNumber'] -= 2;
    //   }
    // }

    return [this.steps, this.stepDict];
  }

  async submitSurvey(p: Participant) {
    if (['127.0.0.1', '192.168.1.128', 'localhost'].includes(window.location.hostname)) {
      this.APIUrl = this.APIUrlDev;
    } else {
      this.APIUrl = this.APIUrlProd;
    }

    let feedback:{[key: string]: any} = {};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    p.ST1Feelings = JSON.stringify(p.ST1Feelings);
    p.ST2Feelings = JSON.stringify(p.ST2Feelings);
    p.ST3Feelings = JSON.stringify(p.ST3Feelings);

    let response = await fetch(this.APIUrl, {
      "headers" : headers,
      "body" : JSON.stringify(p),
      "method" : "POST"
    });

    feedback['data'] = await response.json();
    feedback['status'] = response.status;

    return feedback;
  }

  saveProgress(p: Participant, steps: Item[], step: number, isComplete: boolean, feedback: Feedback, read: boolean) {
    this.setItem('p', JSON.stringify(p), this.PROGRESS_LOCATION);
    this.setItem('steps', JSON.stringify(steps), this.PROGRESS_LOCATION);
    this.setItem('step', JSON.stringify(step), this.PROGRESS_LOCATION);
    this.setItem('isComplete', JSON.stringify(isComplete), this.PROGRESS_LOCATION);
    this.setItem('feedback', JSON.stringify(feedback), this.PROGRESS_LOCATION);
    this.setItem('read', JSON.stringify(read), this.PROGRESS_LOCATION);
  }

  getProgress() {
    return {
      p: this.getItem('p', this.PROGRESS_LOCATION),
      step: this.getItem('step', this.PROGRESS_LOCATION),
      steps: this.getItem('steps', this.PROGRESS_LOCATION),
      isComplete: this.getItem('isComplete', this.PROGRESS_LOCATION),
      feedback: this.getItem('feedback', this.PROGRESS_LOCATION),
      read: this.getItem('read', this.PROGRESS_LOCATION)
    }
  }

  setItem(key: string, value: string|null, type: string) {
    if (value == null) value = "";
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
    let value: string|null;
    switch(type) {
      case 'session':
        value = sessionStorage.getItem(key);
        break;
      case 'local':
        value = localStorage.getItem(key);
        break;
      default:
        value = localStorage.getItem(key);
    }
    if (value == null) return { state: false, value: "" };
    return { state: true, value: value };
  }
  
  getRandomNumber(min: number, max: number):number{
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  normalize(n: number):number {
    // if (n == 9) return 6;
    // if (n == 8) return 3;
    // if (n == 7) return 2;
    return n;
  }

  getCases() {
    let n1 : number = 0;
    let n2 : number = 0;
    let n3 : number = 0;
    while ((n1 == n2) || (n1 == n3) || (n2 == n3)) {
      n1 = this.getRandomNumber(1, 30);
      n2 = this.getRandomNumber(1, 30);
      n3 = this.getRandomNumber(1, 30);
    }
    return [this.normalize(n1), this.normalize(n2), this.normalize(n3)];
  }

  clearItems(){
    if (this.PROGRESS_LOCATION == 'session') { 
      sessionStorage.clear(); 
    } else {
      localStorage.clear();
    }
  }

  async fetchWithTimeout(resource: string, timeout: number) {
    const options = { timeout : timeout };
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
  
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
  
    return response;
  }
  
  async getIp() {
    try {
      const response = await this.fetchWithTimeout('https://ipinfo.io/json', this.DEFAULT_TIMEOUT);
      if (response.ok) {
        const body = await response.json();
        return body['ip'];
      }
    }
    catch (error) {
      console.log(error);
      return "Unknown";
    }
  }

  async getCoutry() {
    const ip = await this.getIp();
    if (ip == "Unknown") return ip;
    try {
      const response = await this.fetchWithTimeout(`https://api.iplocation.net/?ip=${ip}`, this.DEFAULT_TIMEOUT);
      if (response.ok) {
        const body = await response.json();
        return body['country_name'];
      }
    }
    catch (error) {
      console.log(error);
      return "Unknown";
    }
  }
}
