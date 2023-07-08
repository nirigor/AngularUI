import { identifierName } from '@angular/compiler';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Item } from 'src/app/models/item.model';
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit{
  @Input() step = 0;
  @Input() steps: Item[] = [];

  dict: { [name: string]: any } = {};
  
  getStepInfo(step: number) : any {
    let basicProgress = 0;
    let stylesProgress1 = 0;
    let stylesProgress2 = 0;
    let storiesProgress1 = 0;
    let storiesProgress2 = 0;
    let storiesProgress3 = 0;    
    let storiesProgress4 = 0;

    let basicPercentArrow = '';
    let stylesPercentArrow1 = '';
    let stylesPercentArrow2 = '';
    let storiesPercentArrow1 = ''; 
    let storiesPercentArrow2 = ''; 
    let storiesPercentArrow3 = ''; 
    let storiesPercentArrow4 = ''; 
    
    let basicPercentStep = '';
    let stylesPercentStep1 = '';
    let stylesPercentStep2 = '';
    let storiesPercentStep1 = '';
    let storiesPercentStep2 = '';
    let storiesPercentStep3 = '';
    let storiesPercentStep4 = '';

    let basicVisible = false;
    let stylesVisible1 = false;
    let stylesVisible2 = false;
    let storiesVisible1 = false;
    let storiesVisible2 = false;
    let storiesVisible3 = false;
    let storiesVisible4 = false;

    let phase = this.steps[step]['phaseName'];

    switch(phase) {
      case 'BASIC':
        basicProgress = Math.floor(this.steps[step]['stepNumber'] / this.steps[step]['phaseSteps'] * 100);
        basicVisible = true;
        break;
      case 'STYLES1':
        basicProgress = 100;
        stylesVisible1 = true;
        stylesProgress1 = Math.floor(this.steps[step]['stepNumber'] / this.steps[step]['phaseSteps'] * 100);
        break;
      case 'STYLES2':
        basicProgress = 100;
        stylesProgress1 = 100;
        stylesVisible2 = true;
        stylesProgress2 = Math.floor(this.steps[step]['stepNumber'] / this.steps[step]['phaseSteps'] * 100);
        break;
      case 'INTRO':
        basicProgress = 100;
        stylesProgress1 = 100;
        stylesProgress2 = 100;
        storiesVisible1 = true;
        storiesProgress1 = Math.floor(this.steps[step]['stepNumber'] / this.steps[step]['phaseSteps'] * 100);
        break;
      case 'STORIES1':
        basicProgress = 100;
        stylesProgress1 = 100;
        stylesProgress2 = 100;
        storiesProgress1 = 100;
        storiesVisible2 = true;
        storiesProgress2 = Math.floor(this.steps[step]['stepNumber'] / this.steps[step]['phaseSteps'] * 100);
        break;
      case 'STORIES2':
        basicProgress = 100;
        stylesProgress1 = 100;
        stylesProgress2 = 100;
        storiesProgress1 = 100;
        storiesProgress2 = 100;
        storiesVisible3 = true;
        storiesProgress3 = Math.floor(this.steps[step]['stepNumber'] / this.steps[step]['phaseSteps'] * 100);
        break;
      case 'STORIES3':
        basicProgress = 100;
        stylesProgress1 = 100;
        stylesProgress2 = 100;
        storiesProgress1 = 100;
        storiesProgress2 = 100;
        storiesProgress3 = 100;
        storiesVisible4 = true;
        storiesProgress4 = Math.floor(this.steps[step]['stepNumber'] / this.steps[step]['phaseSteps'] * 100);
        break;      
    }
    
    basicPercentArrow = `${basicProgress - 10}%`;
    stylesPercentArrow1 = `${stylesProgress1 - 10}%`;
    stylesPercentArrow2 = `${stylesProgress2 - 10}%`;
    storiesPercentArrow1 = `${storiesProgress1 - 10}%`;
    storiesPercentArrow2 = `${storiesProgress2 - 10}%`;
    storiesPercentArrow3 = `${storiesProgress3 - 10}%`;
    storiesPercentArrow4 = `${storiesProgress4 - 10}%`;

    basicPercentStep = `${basicProgress - 20}%`;
    stylesPercentStep1 = `${stylesProgress1 - 20}%`;       
    stylesPercentStep2 = `${stylesProgress2 - 20}%`;     
    storiesPercentStep1 = `${storiesProgress1 - 20}%`;      
    storiesPercentStep2 = `${storiesProgress2 - 20}%`;     
    storiesPercentStep3 = `${storiesProgress3 - 20}%`;   
    storiesPercentStep4 = `${storiesProgress4 - 20}%`;   
    

    let dict: { [name: string]: any } = {};

    dict["basicProgress"] = basicProgress;
    dict["stylesProgress1"] = stylesProgress1;
    dict["stylesProgress2"] = stylesProgress2;
    dict["storiesProgress1"] = storiesProgress1;
    dict["storiesProgress2"] = storiesProgress2;
    dict["storiesProgress3"] = storiesProgress3;
    dict["storiesProgress4"] = storiesProgress4;

    dict["basicPercentArrow"] = basicPercentArrow;
    dict["stylesPercentArrow1"] = stylesPercentArrow1;
    dict["stylesPercentArrow2"] = stylesPercentArrow2;
    dict["storiesPercentArrow1"] = storiesPercentArrow1;
    dict["storiesPercentArrow2"] = storiesPercentArrow2;
    dict["storiesPercentArrow3"] = storiesPercentArrow3;
    dict["storiesPercentArrow4"] = storiesPercentArrow4;

    dict["basicPercentStep"] = basicPercentStep;
    dict["stylesPercentStep1"] = stylesPercentStep1;
    dict["stylesPercentStep2"] = stylesPercentStep2;
    dict["storiesPercentStep1"] = storiesPercentStep1;
    dict["storiesPercentStep2"] = storiesPercentStep2;
    dict["storiesPercentStep3"] = storiesPercentStep3;
    dict["storiesPercentStep4"] = storiesPercentStep4;

    dict["basicVisible"] = basicVisible;
    dict["stylesVisible1"] = stylesVisible1;
    dict["stylesVisible2"] = stylesVisible2;
    dict["storiesVisible1"] = storiesVisible1;
    dict["storiesVisible2"] = storiesVisible2;
    dict["storiesVisible3"] = storiesVisible3;
    dict["storiesVisible4"] = storiesVisible4;

    return dict;
  }

  ngOnInit(): void {
    this.dict = this.getStepInfo(this.step);
  }

  constructor(
    private svc: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dict = this.getStepInfo(this.step);
  }
}
