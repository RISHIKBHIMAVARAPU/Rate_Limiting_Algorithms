/*
   10  , 10  , <=10,
*/
export class TokenBucket {
    constructor(maxBucketSize, refillRate) {
        this.maxBucketSize = maxBucketSize;
        this.refillRate = refillRate;
        this.currentBucketSize = maxBucketSize;
        this.lastRefillTimeStamp = performance.now();
    }
    allowRequest() {
        this.refill();
        if (this.currentBucketSize >= 1) {
            this.currentBucketSize -= 1;
            console.log("  current bucket Size: " + this.currentBucketSize);
            return true;
        }
        return false;
    }
    refill() {
        let now = performance.now();
        let tokensToAdd = Math.floor((now - this.lastRefillTimeStamp) * this.refillRate / 1e9);
        console.log("before refilled : " + this.currentBucketSize + "  ");
        this.currentBucketSize = Math.min(this.currentBucketSize + tokensToAdd, this.maxBucketSize);
        console.log("After refilled : " + this.currentBucketSize);
        this.lastRefillTimeStamp = now;
    }
}
