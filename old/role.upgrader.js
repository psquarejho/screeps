var creepMover = require('util.creepMover');
//var roleBuilder = require('role.builder');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_STORAGE) || (structure.structureType == STRUCTURE_CONTAINER))
            }
        });
        if(containers.length == 0)
        {
//            roleBuilder.run(creep);
//            return;
        }
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
                creepMover.moveTo(creep,creep.room.controller);
            }
        }
        else {
           	if(creep.carry.energy < creep.carryCapacity) {
                creepMover.pickUp(creep);                
           	}
        }
	}
};

module.exports = roleUpgrader;