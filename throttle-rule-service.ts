import { ThrotleRule } from "./throttle-rule.js";

export class ThrotleRulesService {
    clientThrotleRules:Map<String, ThrotleRule>;
    private static instance : ThrotleRulesService;

    private constructor(){
        this.clientThrotleRules = new Map();
    }

    public static  getInstance():ThrotleRulesService{
        if (this.instance == null) {
            this.instance = new ThrotleRulesService();
        }
        return this.instance;
    }

    createRule( clientId:string,  throtleRule:ThrotleRule){
        this.clientThrotleRules.set(clientId, throtleRule);
    }

    getClientRules( clientId:String):ThrotleRule | undefined{
        return this.clientThrotleRules.get(clientId);
    }

}
