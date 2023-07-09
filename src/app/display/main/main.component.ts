import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Participant } from 'src/app/models/participant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';


interface MaritalStatuses {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  p: Participant = new Participant();
  @Input() step = 0;
  @Input() steps: Item[] = [];
  @Input() stepDict: {[name: string]: number} = {};
  
  @Output() stepUpdateEvent = new EventEmitter<number>();
  @Output() stepsUpdateEvent = new EventEmitter<Item[]>();

  read: boolean = true;

  mStatuses: MaritalStatuses[] = [
    {value: 'SI', viewValue: 'Single'},
    {value: 'MA', viewValue: 'Married'},
    {value: 'SE', viewValue: 'Separated'},
    {value: 'DI', viewValue: 'Divorced'},
    {value: 'WI', viewValue: 'Widowed'},
  ];

  constructor(
    private svc: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.step = 72;
    while(!this.steps[this.step]['isVisible']) this.step++;
    const pId = this.svc.getItem('participant', 'session');
    pId? this.p.ProlificId = pId : 'unpaid';
    this.p.SurveyStartTs = new Date();
    [ this.p.ST1Number, this.p.ST2Number, this.p.ST3Number ] = this.svc.getCases();
        
  }

  stringToBool(str: any): boolean {
    if (str == "true") { return true; }
    return false;
  }

  nextClick() {
    if (this.step == this.stepDict['BASIC_12']) this.checkB12();
    if (this.step == this.stepDict['BASIC_13']) this.checkB13();
    if (this.step == this.stepDict['BASIC_16']) this.checkB16();
    if (this.step == this.stepDict['BASIC_19']) this.checkB19();
    if (this.step == this.stepDict['STORIES1_2'] || this.step == this.stepDict['STORIES2_2'] || this.step == this.stepDict['STORIES3_2']) this.read = false;
    this.steps[this.step]['showNext'] = true;
    this.step += 1;
    while (!this.steps[this.step]['isVisible']) this.step += 1;
    this.stepUpdateEvent.emit(this.step);
  }

  checkB12() {
    if (!this.stringToBool(this.p.InvolvedInLegalDispute)) {
      this.p.ExperienceWithCourtProceedings = false;
      this.p.CourtProceedingsSatisfaction = 0;
      this.p.ExperienceWithCourtProceedingsText = '';
      this.steps[this.stepDict['BASIC_13']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_14']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_15']]['isVisible'] = false;   
          
      this.p.ExperienceWithMediation = false;
      this.p.MediationSatisfaction = 0;
      this.p.ExperienceWithMediationText = '';
      this.steps[this.stepDict['BASIC_16']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_17']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_18']]['isVisible'] = false;   

      this.p.ExperienceWithArbitration = false;
      this.p.ArbitrationSatisfaction = 0;
      this.p.ExperienceWithArbitrationText = '';
      this.steps[this.stepDict['BASIC_19']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_20']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_21']]['isVisible'] = false;   
    } else {
      this.steps[this.stepDict['BASIC_13']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_14']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_15']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_16']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_17']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_18']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_19']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_20']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_21']]['isVisible'] = true; 
    }
  }

  checkB13() {
    if (!this.stringToBool(this.p.ExperienceWithCourtProceedings)) {
      this.p.CourtProceedingsSatisfaction = 0;
      this.p.ExperienceWithCourtProceedingsText = '';
      this.steps[this.stepDict['BASIC_14']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_15']]['isVisible'] = false;
    } else {
      this.steps[this.stepDict['BASIC_14']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_15']]['isVisible'] = true;
    }
  }
  
  checkB16() {
    if (!this.stringToBool(this.p.ExperienceWithMediation)) {
      this.p.MediationSatisfaction = 0;
      this.p.ExperienceWithMediationText = '';
      this.steps[this.stepDict['BASIC_17']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_18']]['isVisible'] = false;
    } else {
      this.steps[this.stepDict['BASIC_17']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_18']]['isVisible'] = true;
    }
  }

  checkB19() {
    if (!this.stringToBool(this.p.ExperienceWithArbitration)) {
      this.p.ArbitrationSatisfaction = 0;
      this.p.ExperienceWithArbitrationText = '';
      this.steps[this.stepDict['BASIC_20']]['isVisible'] = false;
      this.steps[this.stepDict['BASIC_21']]['isVisible'] = false;
    } else {
      this.steps[this.stepDict['BASIC_20']]['isVisible'] = true;
      this.steps[this.stepDict['BASIC_21']]['isVisible'] = true;
    }
  }

  backClick() {
    if (this.steps[this.step]['stepNumber'] == 1) this.router.navigateByUrl('');
    this.step -= 1;
    if (this.step == this.stepDict['STORIES1_2'] || this.step == this.stepDict['STORIES2_2'] || this.step == this.stepDict['STORIES3_2']) this.read = true;
    while (!this.steps[this.step]['isVisible']) this.step -= 1;
    this.stepUpdateEvent.emit(this.step);
  }
}

