var queues = require('queues');
var jobs = require('jobs');
var ressourceassigner = { 

    assignCreeps: function(room) {

        var queue = Memory.queues[room];
        var availablecreeps = {};

        for(var c in Game.creeps)
        {
            if(Game.creeps[c].room.name == room)
            {
                availablecreeps[c] = Game.creeps[c];
            }
        }
        console.log("Available Creeps: "+JSON.stringify(availablecreeps));
        var tospawn = 0;
        var jobsbelowminimum = [];
        console.log("Queue: "+JSON.stringify(queue));
        for(var i = 0; i < queue.jobs.length; i++)
        {
            var jo = queue.jobs[i];
            var j = jo.jobType;
            var ji = jobs[j].getJobId(ji);
            // Remove stale creeps from the assignedCreeps object
            for(var c in jo.creeps)
            {
                if(availablecreeps[c] == undefined)
                {
                    jo.creeps[c];
                }
            }
            while(Object.keys(availablecreeps).length > 0 && Object.keys(jo.creeps).length < jo.assignCreepLevels.min)
            {
                console.log(JSON.stringify(availablecreeps));
                var cname = Object.keys(availablecreeps)[0];
                var c = availablecreeps[cname];
                delete availablecreeps[cname];
                console.log("Trying to assign "+cname+" to job "+ji);
                jo.creeps[cname] = true;
                if(Object.keys(availablecreeps).length == 0)
                {
                    break;
                }
            }
            tospawn += jo.assignCreepLevels.min - Object.keys(jo.creeps).length;
            jobsbelowminimum.push(ji);
        }
        console.log("Need to spawn "+tospawn+" creeps for jobs "+jobsbelowminimum.join(","));
        return (tospawn > 0);
    }


}

module.exports = ressourceassigner;