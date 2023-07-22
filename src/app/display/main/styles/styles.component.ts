import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { Participant } from 'src/app/models/participant.model';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.css', '../main.component.css']
})
export class StylesComponent {
  @Input() p: Participant = new Participant()
  @Input() step = 0;
  @Input() steps: Item[] = [];
  @Input() stepDict: {[name: string]: number} = {};
  @Output("nextClick") nextClick: EventEmitter<any> = new EventEmitter();
}
