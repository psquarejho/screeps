var creepMover = require('util.creepMover');
var roleBuilder = require('role.builder');

var roleDelivery = {

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
        if(creep.carry.energy == 0 && creep.memory.state != "collecting")
        {
            creep.memory.state = "collecting";
            creep.say("collecting");
        }
        if(creep.carry.energy == creep.carryCapacity && creep.memory.state != "delivering")
        {
            creep.memory.state = "delivering";
            creep.say("delivering");
        }
	    if(creep.memory.state == "collecting") {
	        creepMover.pickUp(creep);
        }
        else {
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
            else
            {
                console.log("Creeper "+creep.name+": No targets for delivery");
            }
        }
	}
};

module.exports = roleDelivery;