import { RateLimiter } from "./algorithms/rate-limiter.js";
import { TokenBucket } from "./algorithms/token-bucket.js";
import { ThrotleRule } from "./throttle-rule.js";
import { ThrotleRulesService } from "./throttle-rule-service.js";


export class RateLimiterService {
    clientRulesCache: Map<String, ThrotleRule>;
     rateLimiterHashMap:Map<String, RateLimiter>;
     throtleRulesService:ThrotleRulesService;

    constructor(){
        this.throtleRulesService = ThrotleRulesService.getInstance();
        this.clientRulesCache = new Map();
        this.rateLimiterHashMap = new Map();
    }


    isRateLimitedUserRequest( userId:string):boolean{
        this.createUserIfNotTheir(userId);
        return this.rateLimiterHashMap.get(userId)!.allowRequest();
    }

     createUserIfNotTheir( userId:String):void{
        if(!this.clientRulesCache.has(userId)){
        let  clientRules:ThrotleRule  = this.throtleRulesService.getClientRules(userId)!;
        console.log('---------------------rate limiter service-----------------',clientRules)
            this.clientRulesCache.set(userId, clientRules);
        }
        if(!this.rateLimiterHashMap.has(userId)){
            let throtleRule :ThrotleRule = this.clientRulesCache.get(userId)!;
            let rateLimiter :RateLimiter = new TokenBucket(throtleRule.getBucketSize(), throtleRule.getRefillRate());
            this.rateLimiterHashMap.set(userId,rateLimiter);
        }
    }
}
