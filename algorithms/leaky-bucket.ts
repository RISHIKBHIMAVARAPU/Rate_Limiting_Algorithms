import { RateLimiter } from "./rate-limiter.js";

/*
   10  , 10  , <=10,
*/
export class LeakyBucket implements RateLimiter {
    private   maxBucketSize:number ;
    private   leakRate : number ;
    private   lastLeakTime : number;
    private queue : any;

    constructor( maxBucketSize:number,  leakRate:number){
        this.maxBucketSize = maxBucketSize;
        this.leakRate = leakRate;
        this.lastLeakTime = performance.now();
        this.queue = [];  
    }


     allowRequest():boolean {
        if(this.queue.size<this.maxBucketSize){ 
            this.queue.add(1);
            return true;
        }
        return false;
    }

    private  leak():void{
        if(this.queue.size>0){
            let leakingToken = this.queue.shift();
            console.log('----leak happend----',leakingToken);
        }else{
            console.log("---nothing to leak----")
        }
    }

}

// we can use setInterval function for calling this leak function

