export class ThrotleRulesService {
    constructor() {
        this.clientThrotleRules = new Map();
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new ThrotleRulesService();
        }
        return this.instance;
    }
    createRule(clientId, throtleRule) {
        this.clientThrotleRules.set(clientId, throtleRule);
    }
    getClientRules(clientId) {
        return this.clientThrotleRules.get(clientId);
    }
}
