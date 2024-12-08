import { RateLimiterService } from "./rate-limiter-service.js";

export class UserIdentificationService {

    rateLimiterService:RateLimiterService;

    constructor(){
        this.rateLimiterService = new RateLimiterService();
    }
    public  serveRequest( clientId:string):string{

        let isAllowed :boolean = this.rateLimiterService.isRateLimitedUserRequest(clientId);
        if(isAllowed){
            return "Request Served";
        } else return "Too Many Requests please try again";
    }
}