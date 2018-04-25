var Job = require('job.base');

var upgraderJob = Object.create(Job);
upgraderJob.jobType = 'upgrader';
upgraderJob.assignCreepLevels = { min: 1, optimal: 5, max: 5};

upgraderJob.needsScheduling = function() {
    return true;
}

module.exports = upgraderJob;