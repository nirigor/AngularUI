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
    private domSanitizer: DomSanitizer,
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
    this.matIconRegistry.addSvgIcon('anger', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/anger.svg'))
    this.matIconRegistry.addSvgIcon('sadness', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/sadness.svg'))
    this.matIconRegistry.addSvgIcon('frustration', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/frustration.svg'))
    this.matIconRegistry.addSvgIcon('fear', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/fear.svg'))
    this.matIconRegistry.addSvgIcon('happiness', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/happiness.svg'))
    this.matIconRegistry.addSvgIcon('confusion', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/confusion.svg'))
    this.matIconRegistry.addSvgIcon('hate', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/hate.svg'))
    this.matIconRegistry.addSvgIcon('indifference', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/indifference.svg'))
    this.matIconRegistry.addSvgIcon('curiosity', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/curiosity.svg'))
    this.matIconRegistry.addSvgIcon('stress', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/stress.svg'))
    this.matIconRegistry.addSvgIcon('speed', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/speed.svg'))
    this.matIconRegistry.addSvgIcon('privacy', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/privacy.svg'))
    this.matIconRegistry.addSvgIcon('control', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/control.svg'))
    this.matIconRegistry.addSvgIcon('createprecedent', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/createprecedent.svg'))
    this.matIconRegistry.addSvgIcon('createsolution', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/createsolution.svg'))
    this.matIconRegistry.addSvgIcon('eyes', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/eyes.svg'))
    this.matIconRegistry.addSvgIcon('lightbulb', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/lightbulb.svg'))
    this.matIconRegistry.addSvgIcon('neutralopinion', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/neutralopinion.svg'))
    this.matIconRegistry.addSvgIcon('pray', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/pray.svg'))
    this.matIconRegistry.addSvgIcon('publicvindication', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/publicvindication.svg'))
    this.matIconRegistry.addSvgIcon('shift', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/shift.svg'))
    this.matIconRegistry.addSvgIcon('transformation', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/transformation.svg'))
    this.matIconRegistry.addSvgIcon('sm-major', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/sm-major.svg'))
    this.matIconRegistry.addSvgIcon('sm-serious', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/sm-serious.svg'))
    this.matIconRegistry.addSvgIcon('sm-common', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/sm-common.svg'))
    this.matIconRegistry.addSvgIcon('sm-misunderstanding', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/sm-misunderstanding.svg'))
    this.matIconRegistry.addSvgIcon('sm-minor', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/sm-minor.svg'))
    this.matIconRegistry.addSvgIcon('mouse', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/mouse.svg'))
    this.matIconRegistry.addSvgIcon('lion', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/lion.svg'))
    this.matIconRegistry.addSvgIcon('adjudication', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/adjudication.svg'))
    this.matIconRegistry.addSvgIcon('arbitration', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/arbitration.svg'))
    this.matIconRegistry.addSvgIcon('negotiation', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/negotiation.svg'))
    this.matIconRegistry.addSvgIcon('waives', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/waives.svg'))
    this.matIconRegistry.addSvgIcon('publiccomplaint', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/publiccomplaint.svg'))
    this.matIconRegistry.addSvgIcon('adjudication-1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/adjudication-1.svg'))
    this.matIconRegistry.addSvgIcon('arbitration-1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/arbitration-1.svg'))
    this.matIconRegistry.addSvgIcon('negotiation-1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/negotiation-1.svg'))
    this.matIconRegistry.addSvgIcon('mediation-1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/mediation-1.svg'))
    this.matIconRegistry.addSvgIcon('letgo-1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/letgo-1.svg'))
  }
}
