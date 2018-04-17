var roleTower = {
    run: function(tower)
    { 
        if(tower) {
            
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                console.log("Hostile: "+closestHostile);
                var attackret = tower.attack(closestHostile);
                console.log(attackret);
                return;
            }
            if(tower.room.energyCapacityAvailable == tower.room.energyAvailable) {
                var damagedStructures = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => ((structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax && structure.hits < 230000))
                });
                Memory.damagedStructures = damagedStructures;
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => ((structure.hits < structure.hitsMax && structure.hits < 5000) || (structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax && structure.hits < 230000))
                });
                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }

        }
    }
}

module.exports = roleTower;