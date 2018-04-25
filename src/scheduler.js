var joblist = { 
    upgrader: require('job.upgrader'),
};

var scheduler = {
    /** @param {Array} jobqueue **/
    run: function(jobqueue)
    {
        console.log(joblist);
        for(var i in joblist)
        {
            var j = joblist[i];
            j.needsScheduling();
        }
    }
}

module.exports = scheduler;