var scheduler = require("scheduler");
var ressourceassigner = require("ressourceassigner");
var queues = require("queues");
var spawner = require("spawner");
var jobrunner = require("jobrunner");

var rooms = Game.rooms;
/* Howto respawn
   Place spawn point
   Place container (only with container the delivery role will function)
   AI will take care of the rest for now
*/
module.exports.loop = function () {
    //var room = null;
    //var towersNeedingEnergy = room.find(FIND_MY_STRUCTURES, {filter: function(o) { return (o.structureType == STRUCTURE_TOWER && o.energy < (o.energyCapacity-100)) }});
    //console.log("Energy: "+room.energyAvailable+"/"+room.energyCapacityAvailable + " Towers needing energy: "+towersNeedingEnergy.length);
    for(var r in Game.rooms)
    {
        var queue = queues.getQueue(r); 
        console.log("Running scheduler for room "+r);
        queue = scheduler.run(r,queue);
        queues.setQueue(r,queue);
        var runspawner = ressourceassigner.assignCreeps(r);
        if(runspawner) { spawner.run(r) };
        jobrunner.run(r);
        
        
    }

    /* for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.memory.name = name;
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'delivery') {
            roleDelivery.run(creep);
        }
    }
     for(var roomname in Game.rooms)
     {
        var room = Game.rooms[roomname];   
        var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        for(var i in towers)
        {
            roleTower.run(towers[i]);
        }
     } */
}
