export  class ThrotleRule {
    refillRate: number;
    bucketSize: number;

    constructor(bucketSize: number, refillRate: number){
        this.bucketSize = bucketSize;
        this.refillRate = refillRate;
    }

    public  getBucketSize() {
        return this.bucketSize;
    }

    public  getRefillRate() {
        return this.refillRate;
    }
}