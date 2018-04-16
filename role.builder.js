var creepMover = require('util.creepMover'); 
var roleUpgrader = require('role.upgrader');

var roleBuilder = {
    maxRepair: 5000,
    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('pickup');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.memory.targetticks = 50;
	        creep.memory.buildtarget = null;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var target = null;
	        if(creep.memory.buildtarget != null && creep.memory.targetticks > 0)
	        {
	            target = Game.getObjectById(creep.memory.buildtarget);
	            creep.memory.targettick--;
	        }
	        else
	        {
	            target = roleBuilder.findNextSite(creep);
            }
            if(!target)
            {
                roleUpgrader.run(creep);
            }
            
            if(creep.pos.getRangeTo(target.pos) > 2)
            {
                creepMover.moveTo(creep,target);
            }
            else
            {
                if(target instanceof ConstructionSite)
                {
                    creep.build(target);
                }
                else
                {
                    creep.repair(target);
                }
            }
            if(target && creep.build(target) == ERR_NOT_IN_RANGE) {
                creepMover.moveTo(creep,target);
            }
        
	    }
	    else {
            creepMover.pickUp(creep);  
	    }
	},
	findNextSite: function(creep)
	{
	    var target = null;
	    // Find all non road construction sites
	    var targets = creep.room.find(FIND_CONSTRUCTION_SITES, { filter: function (o) { return o.structureType != STRUCTURE_ROAD}} );
        if(targets.length) {
            target = creep.pos.findClosestByPath(targets);
            if(target == null)
            {
                target = targets[0];
            }
            return target;
        }
        targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length)
        {
            target = creep.pos.findClosestByPath(targets);
            if(target == null)
            {
                target = targets[0];
            }
            target = creep.findClosestByPath(targets);
            if(target == null)
            {
                target = targets[0];
            }
            return target;
        }
    
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_ROAD ||
                    structure.structureType === STRUCTURE_RAMPART ||
                    structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_WALL) 
                    && (structure.hits < structure.hitsMax && structure.hits < roleBuilder.maxRepair)) || (structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax && structure.hits < 230000)}});
    
        if(targets.length > 0)
        {
            var target = creep.pos.findClosestByPath(targets);
            if(target == null)
            {
                // There can be no path to a target be found - move towards the first target, hopefully it will resolve
                return targets[0];
            }
            return targets[0];
        }
	}
};

module.exports = roleBuilder;