const Bottleneck = require("bottleneck");

class RateLimitedService {
    constructor(minTime, maxConcurrent) {
        this.limiterInstance = new Bottleneck({
            minTime: minTime,
            maxConcurrent: maxConcurrent,
        });
    }

    schedule(fn) {
        return this.limiterInstance.schedule(fn);
    }
}

module.exports = {RateLimitedService}
