import { TokenBucket } from "./algorithms/token-bucket.js";
import { ThrotleRulesService } from "./throttle-rule-service.js";
export class RateLimiterService {
    constructor() {
        this.throtleRulesService = ThrotleRulesService.getInstance();
        this.clientRulesCache = new Map();
        this.rateLimiterHashMap = new Map();
    }
    isRateLimitedUserRequest(userId) {
        this.createUserIfNotTheir(userId);
        return this.rateLimiterHashMap.get(userId).allowRequest();
    }
    createUserIfNotTheir(userId) {
        if (!this.clientRulesCache.has(userId)) {
            let clientRules = this.throtleRulesService.getClientRules(userId);
            console.log('---------------------rate limiter service-----------------', clientRules);
            this.clientRulesCache.set(userId, clientRules);
        }
        if (!this.rateLimiterHashMap.has(userId)) {
            let throtleRule = this.clientRulesCache.get(userId);
            let rateLimiter = new TokenBucket(throtleRule.getBucketSize(), throtleRule.getRefillRate());
            this.rateLimiterHashMap.set(userId, rateLimiter);
        }
    }
}
