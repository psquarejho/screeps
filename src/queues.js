var jobs = require('jobs');


var queue = {
    hasJob: function(queue,job)
    {
        var jobid = jobs[job.jobType].getJobId(job);
        for(var i = 0; i < queue.length; i++)
        {
            var queueitem = queue[i];
            if(jobs[queueitem.jobType].getJobId(queueitem) == jobid)
            {
                return true;
            }
        }
        return false;
    },

    addJob: function(queue,job)
    {
        if(!this.hasJob(queue,job))
        {
            queue.push(job);
        }
        return queue;
    }
}

module.exports = queue