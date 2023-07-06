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
    this.matIconRegistry.addSvgIcon('competitor', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/competitor.svg'))
    this.matIconRegistry.addSvgIcon('avoider', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/avoider.svg'))
    this.matIconRegistry.addSvgIcon('problem-solver', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/problem-solver.svg'))
    this.matIconRegistry.addSvgIcon('aim', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/aim.svg'))
    this.matIconRegistry.addSvgIcon('fire', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/fire.svg'))
    this.matIconRegistry.addSvgIcon('info', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/info.svg'))
    this.matIconRegistry.addSvgIcon('letter', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/letter.svg'))
    this.matIconRegistry.addSvgIcon('lock', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/lock.svg'))
    this.matIconRegistry.addSvgIcon('congrats', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/congrats.svg'))
    this.matIconRegistry.addSvgIcon('handshake', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/handshake.svg'))
    this.matIconRegistry.addSvgIcon('twins', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/twins.svg'))
  }
}
