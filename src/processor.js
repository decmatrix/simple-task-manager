const TaskFactory = require("./task.js");

const SIZE_OF_GENERATED_TASKS = 10000;
const MIN_EXE_TIME = 10;
const MAX_EXE_TIME = 200;

const EXE_TIME_LIMIT_Q0 = 50;
const EXE_TIME_LIMIT_Q1 = 100;

let q0 = [];
let q1 = [];
let q2 = [];

let completedTasksList = [];
let tasksList = TaskFactory.generateRandomTasks(SIZE_OF_GENERATED_TASKS, MIN_EXE_TIME, MAX_EXE_TIME);
let currentTask = null;

function getTaskWithMinimalRestOfExeTime() {
    let minimalRestOfExeTime = currentTask.getExecutionTime();
    let taskWithMinimalRestTime = null;

    let currentRestOfExeTime;
    for(let task of q2) {
        currentRestOfExeTime = task.getExecutionTime();

        if(currentRestOfExeTime <= minimalRestOfExeTime) {
            taskWithMinimalRestTime = task;
        }
    }

    return taskWithMinimalRestTime;
}

function setNextTaskIfNeed() {

    if(q0.length != 0) {
        if(currentTask == null) {
            currentTask = q0.shift();
        }
    } else if(q1.length != 0) {
        if(currentTask == null) {
            currentTask = q1.shift();
        }
    } else if(q2.length != 0) {
        if(currentTask == null) {
            currentTask = q2.shift();
        } else {
            let nextTask = getTaskWithMinimalRestOfExeTime();

            if(nextTask != null) {
                currentTask = nextTask;
            }
        }   
    }
}

function moveTaskTo(place, task) {
    place.push(task);
    currentTask = null;
}

function isEnd() {
    return tasksList.length == 0 &&
           q0.length == 0 && 
           q1.length == 0 &&
           q2.length == 0 && 
           currentTask == null;
}

function pushNewTaskIfArrived(currentTime) {
    if(tasksList.length != 0 && tasksList[0].isArrived(currentTime)) {
        let nextNewTask = tasksList.shift();
        nextNewTask.setTimeExeLimit(EXE_TIME_LIMIT_Q0);

        q0.push(nextNewTask);
    }
}

function executeTaskPerUnitTime() {
    if(currentTask != null) {

        currentTask.executePerUnitTime();

        if(currentTask.isCompleted()) {
            
            moveTaskTo(completedTasksList, currentTask);
        } else if(currentTask.isReachedTheLimitOfExeTime() && 
           currentTask.limitExeTimeEqualTo(EXE_TIME_LIMIT_Q0)) {
    
            currentTask.setTimeExeLimit(EXE_TIME_LIMIT_Q1);
            moveTaskTo(q1, currentTask);
        } else if(currentTask.isReachedTheLimitOfExeTime() &&
            currentTask.limitExeTimeEqualTo(EXE_TIME_LIMIT_Q1)) {

            moveTaskTo(q2, currentTask);
        }
    }
}

// entry point
(function() {
    console.log("Run processor...");

    let currentTime = 0;
    do {
        pushNewTaskIfArrived(currentTime);
        setNextTaskIfNeed();
        executeTaskPerUnitTime();

        currentTime++;
    } while(!isEnd());

    console.log("Tasks completed: ", completedTasksList.length);
    console.log("Processor was finished work...");
})();