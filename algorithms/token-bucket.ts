import { RateLimiter } from "./rate-limiter.js";

/*
   10  , 10  , <=10,
*/
export class TokenBucket implements RateLimiter {
    private   maxBucketSize:number ;
    private   refillRate : number ;
    private  currentBucketSize: number ;
    private  lastRefillTimeStamp :number;

    constructor( maxBucketSize:number,  refillRate:number){
        this.maxBucketSize = maxBucketSize;
        this.refillRate = refillRate;
        this.currentBucketSize = maxBucketSize;
        this.lastRefillTimeStamp = performance.now();
    }


     allowRequest():boolean {
        this.refill();
        if(this.currentBucketSize>=1){
            this.currentBucketSize-=1;
          console.log("  current bucket Size: "+this.currentBucketSize);
            return true;
        }
        return false;
    }

    private  refill():void{
        let now = performance.now();
        let tokensToAdd = Math.floor((now - this.lastRefillTimeStamp) * this.refillRate / 1e9);
        console.log("before refilled : "+this.currentBucketSize+"  ");
        this.currentBucketSize = Math.min(this.currentBucketSize+tokensToAdd,this.maxBucketSize);
        console.log("After refilled : "+this.currentBucketSize);
        this.lastRefillTimeStamp = now;
    }
}

