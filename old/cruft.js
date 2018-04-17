function old()
{
    var room = Game.spawns['Spawn1'].room;
    //var room = null;
    var towersNeedingEnergy = room.find(FIND_MY_STRUCTURES, {filter: function(o) { return (o.structureType == STRUCTURE_TOWER && o.energy < (o.energyCapacity-100)) }});
    console.log("Energy: "+room.energyAvailable+"/"+room.energyCapacityAvailable + " Towers needing energy: "+towersNeedingEnergy.length);
    if(room.energyCapacityAvailable == room.energyAvailable && towersNeedingEnergy.length == 0)
    {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length > 0)
        {
            for(var name in harvesters)
            {
                var c = harvesters[name];
                c.memory.origrole = c.memory.role;
                c.memory.role = 'builder';
                console.log("Switched "+name+' to building');
            }
        }   
    }
    else
    { 
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.origrole == 'harvester');
        if(harvesters.length > 0)
        {
            for(var c in harvesters)
            {
                var creep = harvesters[c]
                creep.memory.role = creep.memory.origrole;
                delete creep.memory.origrole;
                console.log("Switched "+creep.memory.Namespace+" back to harvesting");
            }
        }
    }
    };

module.exports = {

};