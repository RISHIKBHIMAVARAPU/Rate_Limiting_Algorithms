export class ThrotleRule {
    constructor(bucketSize, refillRate) {
        this.bucketSize = bucketSize;
        this.refillRate = refillRate;
    }
    getBucketSize() {
        return this.bucketSize;
    }
    getRefillRate() {
        return this.refillRate;
    }
}
