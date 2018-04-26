var jobs = require('jobs');


var queue = {
    getQueue: function(room)
    {
        if(Memory.queues == undefined)
        {
            Memory.queues = {};
        }
        var q = Memory.queues[room];
        if(q == undefined || q.ttl <= 0)
        {
            q = {
                ttl: 500,
                jobs: [],
            }
        }
        q.ttl--;
        Memory.queues[room] = q;

        return q;

    },
    setQueue: function(room, queue) 
    {
        Memory.queues[room] = queue;
    },
    hasJob: function(queue,job)
    {
        var jobid = jobs[job.jobType].getJobId(job);
        for(var i = 0; i < queue.jobs.length; i++)
        {
            var queueitem = queue.jobs[i];
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
            queue.jobs.push(job);
        }
        return queue;
    }
}

module.exports = queue