var jobs = require('jobs');
var queues = require('queues')
var scheduler = {
    /** @param {Array} jobqueue **/
    run: function(room,jobqueue)
    {
        console.log(jobqueue);
        for(var i in jobs)
        {
            var j = jobs[i];
            if(j.needsScheduling(j))
            {
                var jo = j.createJobs();
                jobqueue = queues.addJob(jobqueue,jo);      
            }
        }
        return jobqueue;
    }
}

module.exports = scheduler;