export class Item {
    constructor(
        public stepNumber: number,
        public phaseSteps: number,
        public phaseName: string,
        public showNext: boolean,
        public isVisible: boolean
    )
    {}
}