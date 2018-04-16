var creepMover = require('util.creepMover');
var roleBuilder = require('role.builder');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_STORAGE) || (structure.structureType == STRUCTURE_CONTAINER))
            }
        });
        if(containers.length == 0)
        {
            roleBuilder.run(creep);
            return;
        }
        if(creep.carry.energy == 0 && creep.memory.state != "harvesting")
        {
            creep.memory.state = "harvesting";
            creep.say("harvesting");
        }
        if(creep.carry.energy == creep.carryCapacity && creep.memory.state != "delivering")
        {
            creep.memory.state = "delivering";
            creep.say("dumping");
        }
	    if(creep.memory.state == "harvesting") {
            
            if(1 == 1)
            {
                creepMover.harvest(creep);
            }
            else
            {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creepMover.moveTo(creep,source);
                }
            }
        
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_STORAGE) || (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity))
                    }
            });
            Memory.storage = targets;
            if(targets.length > 0) {
                var target = creep.pos.findClosestByPath(targets);
                if(!target)
                {
                    target = targets[0];
                }
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creepMover.moveTo(creep,target);
                }
            }
            else
            {
                console.log("Creeper "+creep.name+": No targets for delivery - bringing directly to extensions");
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
            
                if(targets.length > 0) {
                    var target = creep.pos.findClosestByPath(targets);
                    if(!target)
                    {
                        target = targets[0];
                    }
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creepMover.moveTo(creep,target);
                    }
                }
            }
        }
	}
};

module.exports = roleHarvester;