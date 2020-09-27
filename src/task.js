class TaskFactory {

    #exeTime = null;
    #id = null;
    #arriveTime = null;
    #isCompleted = false;
    #executionTime = 0;
    #limitExeTime = null;
    #isReachedLimitOfExeTime = false;

    static #currentId = 0;
    static #currentArriveTime = 0;

    static generateRandomTasks(count, minTime, maxTime) {
        return new Array(count).fill(null).map((val) => this.generateRandomTask(minTime, maxTime));
    }

    static generateRandomTask(minTime, maxTime) {
        return new TaskFactory(getRnd(minTime, maxTime));
    }

    constructor(exeTime) {
        this.#exeTime = exeTime;
        this.#id = TaskFactory.#currentId++;
        this.#arriveTime = TaskFactory.#currentArriveTime;
        TaskFactory.#currentArriveTime += getRnd(1, 10);
    }

    getExecutionTime() {
        return this.#executionTime;
    }

    getTaskId() {
        return this.#id;
    }

    setTimeExeLimit(limitExeTime) {
        this.#limitExeTime = limitExeTime;
    }

    resetTimeExeLimit() {
        setTimeExeLimit(null);
    }

    isArrived(currentTime) {
        return this.#arriveTime == currentTime;
    }

    isCompleted() {
        return this.#isCompleted;
    }

    isReachedTheLimitOfExeTime() {
        return this.#isReachedLimitOfExeTime;
    }

    limitExeTimeEqualTo(timeLimit) {
        return this.#limitExeTime = this.limitExeTime;
    }

    executePerUnitTime() {
        this.#executionTime++;

        if(this.#executionTime == this.#exeTime) {
            this.#isCompleted = true;
        }

        if(this.#executionTime == this.#limitExeTime) {
            this.#isReachedLimitOfExeTime = true;
        }
    }
}

function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = TaskFactory;
