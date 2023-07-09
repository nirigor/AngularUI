export class Item {
    constructor(
        public stepNumber: number,
        public phaseSteps: number,
        public phaseName: string,
        public showNext: boolean,
        public isVisible: boolean
    )
    {}
    setValue(key: string, value: any) {
        switch(key){
            case 'stepNumber':
                this.stepNumber = value;
                break;
            case 'phaseSteps':
                this.phaseSteps = value;
                break;
            case 'phaseName':
                this.phaseName = value;
                break;
            case 'showNext':
                this.showNext = value;
                break;
            case 'isVisible':
                this.isVisible = value;
                break;
            default:
                break;
        }
    }
}