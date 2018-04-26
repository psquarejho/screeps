var jobs = require('jobs');
var queues = require('queues');

var jobrunner = {

    run: function(room)
    { 
        var queue = queues.getQueue(room);
        console.log("Queue in jobrunner "+JSON.stringify(queue));   
        for(var ji in queue.jobs)
        {
            var j = queue.jobs[ji];
            for(var c in j.creeps)
            {
                var co = Game.creeps[c];
                console.log("Calling work for "+j.jobType+" with worker "+c)
                jobs[j.jobType].work(co);
            }
        }
    }
}

module.exports = jobrunner;