var upgraderJob = Object.create(null);
upgraderJob.jobType = 'upgrader';
upgraderJob.assignCreepLevels = { min: 1, optimal: 5, max: 5};
upgraderJob.assignedCreeps = {};

upgraderJob.needsScheduling = function() {
    return true;
}

upgraderJob.getJobId = function(job) {
    return this.jobType;
}

module.exports = upgraderJob;