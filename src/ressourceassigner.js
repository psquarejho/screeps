var queues = require('queues');
var jobs = require('jobs');
var ressourceassigner = { 

    assignCreeps: function(room) {

        var queue = Memory.queues[room];
        var availablecreeps = {};

        for(var c in Game.creeps)
        {
            if(Game.creeps[c].room == room)
            {
                availablecreeps[c] = Game.creeps[c];
            }
        }
        var tospawn = 0;
        var jobsbelowminimum = [];
        console.log(JSON.stringify(queue));
        for(var i = 0; i < queue.length; i++)
        {
            var jo = queue[i];
            console.log(JSON.stringify(jo));
            var j = jo.jobType;
            var ji = jobs[j].getJobId(ji);
            // Remove stale creeps from the assignedCreeps object
            for(var c in jo.assignedCreeps)
            {
                if(availablecreeps[c] == undefined)
                {
                    jo.assignedCreeps[c];
                }
            }
            while(false && Object.keys(jo.assignedCreeps).length < jo.assignCreepLevels.min)
            {
                var cname = Object.keys(availablecreeps)[0];
                var c = availablecreeps[cname];
                delete availablecreeps[cname];
                console.log("Trying to assign "+cname+" to job "+jobs[jobType].getJobId(j));
                j.assignedCreeps[cname] = true;
                if(Object.keys(availablecreeps).length == 0)
                {
                    break;
                }
            }
            console.log(JSON.stringify(jo.assignedCreeps));
            tospawn += jo.assignCreepLevels.min; //- Object.keys(jo.assignedCreeps).length;
            jobsbelowminimum.push(ji);
        }
        console.log("Need to spawn "+tospawn+" creeps for jobs "+jobsbelowminimum.join(","));
    }


}

module.exports = ressourceassigner;