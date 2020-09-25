class TaskFactory {

    static currentId = 0;

    static generateRandomTasks(count, minTime = 0, maxTime = 100) {
        return new Array(count).map((val) => this.generateRandomTask(minTime, maxTime));
    }

    static generateRandomTask(minTime, maxTime) {
        return new TaskFactory(Math.random() * (max - min) + min);
    }

    constructor(exeTime) {
        this.exeTime = exeTime;
        this.id = currentId++;
    }

    execute() {
        for(let i = 1; i <= this.exeTime; i++);
    }
}

module.exports.TaskFactory = TaskFactory;
