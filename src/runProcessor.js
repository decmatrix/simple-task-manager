const TaskFactory = require("./task.js").TaskFactory;
const RRScheduling = require("./rr.js").RRScheduling;
const SRTFScheduling = require("./srtf.js").SRTFScheduling;

const QUEUE_SIZE = 10;
const MAX_TASKS = 1000;
const MIN_EXECUTE_TIME = 0;
const MAX_EXECUTE_TIME = 200;

let q0 = new RRScheduling(QUEUE_SIZE, 50);
let q1 = new RRScheduling(QUEUE_SIZE, 100);
let q2 = new SRTFScheduling(QUEUE_SIZE);


// entry point
(function() {
    console.log("Run processor...");

    TaskFactory.generateRandomTasks(QUEUE_SIZE, MIN_EXECUTE_TIME, MAX_EXECUTE_TIME).forEach(
        (task) => q0.pushTask(task)
    );

    

    
})();



