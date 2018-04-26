var creepmover = require('creepmover');

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

upgraderJob.createJobs = function() {
    var j = {
        jobType: 'upgrader',
        ttl: 1000,
        creeps: {},
        assignCreepLevels: upgraderJob.assignCreepLevels,
        weight: 50,
    }
    return j;
}

upgraderJob.work = function(creep) {
    if(creep.memory.upgrading && creep.carry.energy == 0) {
        creep.memory.upgrading = false;
        creep.say('harvesting');
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
        creep.memory.upgrading = true;
        creep.say('upgrading');
    }

    if(creep.memory.upgrading) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creepmover.moveTo(creep,creep.room.controller);
        }
    }
    else {
        if(creep.carry.energy < creep.carryCapacity) {
            creepmover.pickUp(creep);                
        }
    }
}
module.exports = upgraderJob;