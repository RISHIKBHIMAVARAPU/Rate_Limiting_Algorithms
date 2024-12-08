import { RateLimiter } from "./rate-limiter.js";

export class SlidingWindow implements RateLimiter{
    private windowSize:number;
    private windowCapacity : number;
    private currWindowCnt : number;
    private windowTime : number;

    constructor(windowSize:number, windowCapacity:number){
        this.windowSize= 5;
        this.windowCapacity = 10;
        this.windowTime= performance.now();
        this.currWindowCnt =0;
    }


    allowRequest(): boolean {
        let currTime = performance.now();
        let timeDifference = currTime-this.windowTime;
        if(timeDifference<this.windowCapacity){
            if(this.currWindowCnt<this.windowSize){
                this.currWindowCnt++;
                console.log("---req goes in the current window------")
                return true;
            }else return false;
        }else{
            this.windowTime= performance.now();
            this.currWindowCnt=1;
            return true;
        }
    }
}

