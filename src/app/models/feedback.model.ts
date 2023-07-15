export class Feedback {
    constructor(
        public BFOpennessScore: number = 0,
        public BFAgreeablenessScore: number = 0,
        public BFExtraversionScore: number = 0,
        public BFConscientiousnessScore: number = 0,
        public BFNeuroticismScore: number = 0,
        public TKAccommodatingScore: number = 0,
        public TKCompetingScore: number = 0,
        public TKAvoidingScore: number = 0,
        public TKCompromisingScore: number = 0,
        public TKCollaboratingScore: number = 0,
        public Valid?: boolean,
        public Message?: boolean,
        public Token?: string,
    )
    {}

    getPersonality() {
        let plist = [];
        let max = Math.max(this.BFAgreeablenessScore, this.BFConscientiousnessScore, this.BFExtraversionScore, this.BFNeuroticismScore, this.BFOpennessScore);
        if (this.BFAgreeablenessScore = max) plist.push('Agreeableness');
        if (this.BFOpennessScore = max) plist.push('Openness');
        if (this.BFExtraversionScore = max) plist.push('Extraversion');
        if (this.BFConscientiousnessScore = max) plist.push('Conscientiousness');
        if (this.BFNeuroticismScore = max) plist.push('Neuroticism');
        if (plist.length == 1) return `${plist[0]}`
        if (plist.length == 2) return `${plist[0]} and ${plist[1]}`
        return `${plist.slice(0, -1).join(', ')} and ${plist.pop()}`
    }

    getNegotiationStyle() {
        let plist = [];
        let max = Math.max(this.TKAccommodatingScore, this.TKCompetingScore, this.TKAvoidingScore, this.TKCompromisingScore, this.TKCollaboratingScore);
        if (this.TKAccommodatingScore = max) plist.push('Accommodating');
        if (this.TKCompetingScore = max) plist.push('Competing');
        if (this.TKAvoidingScore = max) plist.push('Avoiding');
        if (this.TKCompromisingScore = max) plist.push('Compromising');
        if (this.TKCollaboratingScore = max) plist.push('Collaborating');
        if (plist.length == 1) return `${plist[0]}`
        if (plist.length == 2) return `${plist[0]} and ${plist[1]}`
        return `${plist.slice(0, -1).join(', ')} and ${plist.pop()}`
    }
}
