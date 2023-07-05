import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularUI';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon('money-bag', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/money-bag.svg'))
    this.matIconRegistry.addSvgIcon('credit-card', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/credit-card.svg'))
    this.matIconRegistry.addSvgIcon('fly-money', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/fly-money.svg'))
    this.matIconRegistry.addSvgIcon('above', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/above.svg'))
    this.matIconRegistry.addSvgIcon('average', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/average.svg'))
    this.matIconRegistry.addSvgIcon('below', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/below.svg'))
    this.matIconRegistry.addSvgIcon('cap', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/cap.svg'))
    this.matIconRegistry.addSvgIcon('some-knowledge', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/some-knowledge.svg'))
    this.matIconRegistry.addSvgIcon('no-knowledge', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/no-knowledge.svg'))
    this.matIconRegistry.addSvgIcon('no', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/no.svg'))
    this.matIconRegistry.addSvgIcon('yes', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/yes.svg'))
    this.matIconRegistry.addSvgIcon('smiley1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/smiley1.svg'))
    this.matIconRegistry.addSvgIcon('smiley2', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/smiley2.svg'))
    this.matIconRegistry.addSvgIcon('smiley3', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/smiley3.svg'))
    this.matIconRegistry.addSvgIcon('smiley4', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/smiley4.svg'))
    this.matIconRegistry.addSvgIcon('smiley5', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/smiley5.svg'))
    this.matIconRegistry.addSvgIcon('right-arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/right-arrow.svg'))
  }
}
