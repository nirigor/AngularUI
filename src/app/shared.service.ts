import { Injectable } from '@angular/core';
import { Item } from './models/item.model';
import { Participant } from './models/participant.model';
import { Feedback } from './models/feedback.model';


@Injectable({
  providedIn: 'root'
})

export class SharedService {
  readonly APIUrl = 'http://127.0.0.1:8000';
  //readonly APIUrl = 'http://16.171.144.39/api';

  readonly BASIC = 12;
  readonly STYLES1 = 15;
  readonly STYLES2 = 30;
  readonly INTRO = 7;
  readonly STORIES1 = 23;
  readonly STORIES2 = 23;
  readonly STORIES3 = 23;
  readonly COMPLETE = 2;

  readonly PROGRESS_LOCATION = 'session';

  steps: Item[] = [];
  stepDict: {[name: string]: number} = {}
  feedback: any;

  constructor() { }

  initSteps(isPaid: boolean): [Item[], {[name: string]: number}] {
    if (this.steps.length != 0 && Object.keys(this.stepDict).length != 0) return [this.steps, this.stepDict]
    
    let tmp = 0;
    
    // BASIC
    for (let i = 1;  i < this.BASIC; i++) {
      tmp = this.steps.push(new Item(i, this.BASIC, 'BASIC', false, true));
      this.stepDict[`BASIC_${i}`] = tmp - 1;
    }

    for (let i = this.BASIC;  i <= this.BASIC + 9; i++) {
      tmp = this.steps.push(new Item(this.BASIC, this.BASIC, 'BASIC', false, true));
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
      tmp = this.steps.push(new Item(i, this.STYLES2, 'STYLES2', false, true));
      this.stepDict[`TK_${i}`] = tmp - 1;
    }

    // Congrats 2
    tmp = this.steps.push(new Item(this.STYLES2, this.STYLES2, 'STYLES2', false, true));
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

    // Congrats 3
    tmp = this.steps.push(new Item(this.STORIES3, this.STORIES3, 'STORIES3', false, true));
    this.stepDict['CONGRATS_3'] = tmp - 1;

    // Complete
    for (let i = 1;  i <= this.COMPLETE; i++) {
      tmp = this.steps.push(new Item(i, this.COMPLETE, 'COMPLETE', false, true));
      this.stepDict[`COMPLETE_${i}`] = tmp - 1;
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

  async submitSurvey(p: Participant) {
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

  async loadMockData() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let response = await fetch(this.APIUrl, {
      "headers" : headers,
      "method" : "GET"
    });
    let jsonObjs = await response.json();
    console.log(jsonObjs[0]);
    let p = Object.assign(new Participant, jsonObjs[0]);
    p.pop('BFAgreeablenessScore');
    p.pop('BFConscientiousnessScore');
    p.pop('BFExtraversionScore');
    p.pop('BFNeuroticismScore');
    p.pop('BFOpennessScore');
    p.pop('BFConscientiousnessScore');
    p.pop('BFAgreeablenessScore');
    p.pop('BFConscientiousnessScore');
    
    return p;
  }

  saveProgress(p: Participant, steps: Item[], step: number, isComplete: boolean, feedback: Feedback, read: boolean) {
    this.setItem('p', JSON.stringify(p), this.PROGRESS_LOCATION);
    this.setItem('steps', JSON.stringify(steps), this.PROGRESS_LOCATION);
    this.setItem('step', JSON.stringify(step), this.PROGRESS_LOCATION);
    this.setItem('isComplete', JSON.stringify(isComplete), this.PROGRESS_LOCATION);
    this.setItem('feedback', JSON.stringify(feedback), this.PROGRESS_LOCATION);
    this.setItem('read', JSON.stringify(read), this.PROGRESS_LOCATION);
  }

  getProgress(){
    return {
      p: this.getItem('p', this.PROGRESS_LOCATION),
      step: this.getItem('step', this.PROGRESS_LOCATION),
      steps: this.getItem('steps', this.PROGRESS_LOCATION),
      isComplete: this.getItem('isComplete', this.PROGRESS_LOCATION),
      feedback: this.getItem('feedback', this.PROGRESS_LOCATION),
      read: this.getItem('read', this.PROGRESS_LOCATION)
    }
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
  
  getRandomNumber(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  getCases() {
    let n1, n2, n3 = 0;
    while ((n1 == n2) || (n1 == n3) || (n2 == n3)) {
      n1 = this.getRandomNumber(1, 10);
      n2 = this.getRandomNumber(1, 10);
      n3 = this.getRandomNumber(1, 10);
    }
    return [n1, n2, n3];
  }

}
