var jobs = {
    'upgrader': require('job.upgrader'),
}

jobs.base = {
    jobType: 'base',
    needsScheduling: function(job) { return false; },
    getJobId: function(job) {
        return 'base';
    },
}

module.exports = jobs;