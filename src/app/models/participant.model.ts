export class Participant {
    constructor(
        public SurveyStartTs: Date = new Date(),
        public SurveyEndTs: Date = new Date(),
        public TQ1: boolean|string = "",
        public TQ2: boolean|string = "",
        public ProlificId?: string,
        public Token?: string,
        public Country?: string,
        public Gender?: string,
        public Age?: string,
        public MaritalStatus?: string,
        public NumberOfChildren?: number,
        public NumberOfYoungChildren?: number,
        public Minority?: boolean,
        public Debts?: string,
        public Income?: string,
        public Education?: string,
        public LegalKnowledge?: string,
        public InvolvedInLegalDispute?: boolean,
        public ExperienceWithCourtProceedings?: boolean,
        public CourtProceedingsSatisfaction?: number,
        public ExperienceWithCourtProceedingsText?: string,
        public ExperienceWithMediation?: boolean,
        public MediationSatisfaction?: number,
        public ExperienceWithMediationText?: string,
        public ExperienceWithArbitration?: boolean,
        public ArbitrationSatisfaction?: number,
        public ExperienceWithArbitrationText?: string,
        public BF1?: number,
        public BF2?: number,
        public BF3?: number,
        public BF4?: number,
        public BF5?: number,
        public BF6?: number,
        public BF7?: number,
        public BF8?: number,
        public BF9?: number,
        public BF10?: number,
        public BF11?: number,
        public BF12?: number,
        public BF13?: number,
        public BF14?: number,
        public BF15?: number,
        public TK1?: string,
        public TK2?: string,
        public TK3?: string,
        public TK4?: string,
        public TK5?: string,
        public TK6?: string,
        public TK7?: string,
        public TK8?: string,
        public TK9?: string,
        public TK10?: string,
        public ST1Number?: number,
        public ST1Feelings: any = [],
        public ST1Speed?: number,
        public ST1Privacy?: number,
        public ST1PublicVindication?: number,
        public ST1NeutralOpinion?: number,
        public ST1MinimizeCosts?: number,
        public ST1MaintainImproveRelationship?: number,
        public ST1CreatePrecedent?: number,
        public ST1MinMaxCompensation?: number,
        public ST1CreativeSolution?: number,
        public ST1ControlOfProcess?: number,
        public ST1ControlOfOutcome?: number,
        public ST1ShiftResponsibility?: number,
        public ST1EnsuringCompliance?: number,
        public ST1TransformationOfTheParties?: number,
        public ST1ImproveUnderstanding?: number,
        public ST1RecognitionApology?: number,
        public ST1Classification?: string,
        public ST1StrengthPosition?: string,
        public ST1Selection: string = "",
        public ST1SelectionText: string = "",
        public ST2Number?: number,
        public ST2Feelings: any = [],
        public ST2Speed?: number,
        public ST2Privacy?: number,
        public ST2PublicVindication?: number,
        public ST2NeutralOpinion?: number,
        public ST2MinimizeCosts?: number,
        public ST2MaintainImproveRelationship?: number,
        public ST2CreatePrecedent?: number,
        public ST2MinMaxCompensation?: number,
        public ST2CreativeSolution?: number,
        public ST2ControlOfProcess?: number,
        public ST2ControlOfOutcome?: number,
        public ST2ShiftResponsibility?: number,
        public ST2EnsuringCompliance?: number,
        public ST2TransformationOfTheParties?: number,
        public ST2ImproveUnderstanding?: number,
        public ST2RecognitionApology?: number,
        public ST2Classification?: string,
        public ST2StrengthPosition?: string,
        public ST2Selection: string = "",
        public ST2SelectionText: string = "",
        public ST3Number?: number,
        public ST3Feelings: any = [],
        public ST3Speed?: number,
        public ST3Privacy?: number,
        public ST3PublicVindication?: number,
        public ST3NeutralOpinion?: number,
        public ST3MinimizeCosts?: number,
        public ST3MaintainImproveRelationship?: number,
        public ST3CreatePrecedent?: number,
        public ST3MinMaxCompensation?: number,
        public ST3CreativeSolution?: number,
        public ST3ControlOfProcess?: number,
        public ST3ControlOfOutcome?: number,
        public ST3ShiftResponsibility?: number,
        public ST3EnsuringCompliance?: number,
        public ST3TransformationOfTheParties?: number,
        public ST3ImproveUnderstanding?: number,
        public ST3RecognitionApology?: number,
        public ST3Classification?: string,
        public ST3StrengthPosition?: string,
        public ST3Selection: string = "",
        public ST3SelectionText: string = ""
    )
    {}
}