var creepMover = {
    MAX_NO_PATH_TICKS: 75,
    sourceBlacklisted: { },
    harvest: function(creep) {
        var dropped = creep.room.find(FIND_DROPPED_ENERGY);
        if(dropped.length > 0)
        {
            if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(dropped[0].pos);
            }
        }
        if(creep.memory.source != null)
        {
            var source = Game.getObjectById(creep.memory.source);
            if(source == null) { return; }
            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
            {
                if(creep.memory.moveticks > 0)
                {
                
                    var moveres = creepMove.moveTo(creep,source);
                    
                    if(moveres == ERR_NO_PATH)
                    {
                        creep.memory.nopathticks++;
                        if(creep.memory.nopathticks > creepMover.MAX_NO_PATH_TICKS)
                        {
                            console.log("Path waiting exhausted - resetting");
                            creepMover.findSource(creep);
                        }
                    }
                    else
                    {
                        creep.memory.nopathticks = 0;
                        creep.memory.moveticks--;
                    }
                }
                else
                {
                    
                    creepMover.findSource(creep);
                    if(!creep.memory.source || !Game.getObjectById(creep.memory.source))
                    {
                        console.log("Couldn't find a valid source for "+creep.name);
                    }
                }
            }
        }
        else
        {
            
            creepMover.findSource(creep);
    
        }
    },
    findSource: function(creep)
    {
        //var newsource = creep.pos.findClosestByPath(FIND_SOURCES, {filter: function(o) { return _.has(creepMover.sourceBlacklisted, o.id)}});
        console.log("Finding new source for "+creep.memory.name);
        // Couldn't get the filter method of findClosestPath working, so doing it a bit ugly instead
        var sources = creep.room.find(FIND_SOURCES);
        sources = _.filter(sources, (s) => !_.has(creepMover.sourceBlacklisted, s.id));
        var newsource = creep.pos.findClosestByPath(sources, {});
        if(newsource) { console.log(newsource+" should be banned: "+ _.has(creepMover.sourceBlacklisted, newsource.id)); }
            else { console.log("No new source could be found for "+creep.memory.name); }
        if(newsource)
        {
            console.log("Setting creep "+creep.name+" to move to source "+newsource.id);
            creep.memory.source = newsource.id;
            creep.memory.moveticks = 50;
        }
    },
    pickUp: function(creep)
    {
        var storages = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_STORAGE || (structure.structureType == STRUCTURE_CONTAINER)))
                
        }});
        Memory.stores = storages;
        if(storages.length > 0)
        {
            var filledStorages = _.filter(storages, (structure) => {
                    return ((structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 0|| (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >0))) })
                    
            var closest = creep.pos.findClosestByPath(filledStorages);
            if(!closest && filledStorages.length > 0)
            {
                closest = storages[0];
            }
            if(filledStorages.length == 0)
            {
                var flag = Game.flags["Wait"];
                //creep.say("Waiting");
                if(creep.pos.getRangeTo(flag.pos) > 2)
                {
                    creepMover.moveTo(creep,flag.pos);
                }
            }
            if(closest && creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creepMover.moveTo(creep,closest);
            }
        }
        else
        {
           var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creepMover.moveTo(creep,source);
            }
        }
    },
    moveTo: function(creep,pos)
    {
        var moveres = creep.moveTo(pos);
        var looker = creep.pos.lookFor(LOOK_STRUCTURES);
        if(looker.length == 0)
        {
            var conssite = creep.pos.lookFor(LOOK_CONSTRUCTION_SITES);
            if(conssite.length == 0) {
                console.log("Building new road at "+creep.pos);
                creep.pos.createConstructionSite(STRUCTURE_ROAD);
            }
        }
        return moveres;
    }
};

module.exports = creepMover;