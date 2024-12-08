import { RateLimiterService } from "./rate-limiter-service.js";
export class UserIdentificationService {
    constructor() {
        this.rateLimiterService = new RateLimiterService();
    }
    serveRequest(clientId) {
        let isAllowed = this.rateLimiterService.isRateLimitedUserRequest(clientId);
        if (isAllowed) {
            return "Request Served";
        }
        else
            return "Too Many Requests please try again";
    }
}
