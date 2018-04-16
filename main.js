var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawner = require('spawner');
var roleTower = require('role.tower');
var roleDelivery = require('role.delivery');

var rooms = Game.rooms;
/* Howto respawn
   Place spawn point
   Place container (only with container the delivery role will function)
   AI will take care of the rest for now
*/
module.exports.loop = function () {
    Memory.room = Game.spawns['Spawn1'].room;
     var room = Game.spawns['Spawn1'].room;
    //var room = null;
    var towersNeedingEnergy = room.find(FIND_MY_STRUCTURES, {filter: function(o) { return (o.structureType == STRUCTURE_TOWER && o.energy < (o.energyCapacity-100)) }});
    console.log("Energy: "+room.energyAvailable+"/"+room.energyCapacityAvailable + " Towers needing energy: "+towersNeedingEnergy.length);
    if(room.energyCapacityAvailable == room.energyAvailable && towersNeedingEnergy.length == 0)
    {
        var deliveries = _.filter(Game.creeps, (creep) => creep.memory.role == 'delivery');
        if(deliveries.length > 0)
        {
            for(var name in deliveries)
            {
                var c = deliveries[name];
                c.memory.origrole = c.memory.role;
                c.memory.role = 'builder';
                console.log("Switched "+c.memory.name+' to building');
            }
        }   
    }
    else
    { 
        var deliveries = _.filter(Game.creeps, (creep) => creep.memory.origrole == 'delivery');
        if(deliveries.length > 0)
        {
            for(var c in deliveries)
            {
                var creep = deliveries[c]
                creep.memory.role = creep.memory.origrole;
                delete creep.memory.origrole;
                console.log("Switched "+creep.memory.name+" back to harvesting");
            }
        }
    }
    spawner.run();

    for(var name in Game.creeps) {
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
     }
}

