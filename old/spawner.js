var creepSizes =  [  { body: [ MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY], minCapacity: 500}, { body: [MOVE,MOVE,WORK,WORK,CARRY,CARRY], minCapacity: 400 }, , { body: [ MOVE,WORK,CARRY] }, ];
var creepDefs = {
        "harvester": {
            hardMinimum: 3,
            aimFor: 5,
            sizes: [{ body: [MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], minCapacity: 1200 }, { body: [ MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY ], minCapacity: 700}, { body: [ MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY], minCapacity: 500}, { body: [MOVE,MOVE,WORK,WORK,CARRY,CARRY], minCapacity: 400 }, , { body: [ MOVE,WORK,CARRY] }, ],
        },
        "delivery": {
            hardMinimum: 2,
            aimFor: 4,
            sizes: creepSizes,
        },
        "upgrader": {
            aimFor: 2,
            sizes: [ { body: [MOVE, WORK, CARRY] } ],
        },
        "builder": {
            hardMinimum: 1,
            aimFor: 1,
            sizes: creepSizes,
            minRoomLevel: 2,
        },
 
    };
var spawner = {

    
    /** Basic spawner function **/
    run: function() {
        /* Garbage collection */
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        for(var roomname in Game.rooms)
        {
            var room = Game.rooms[roomname];   
            var spawns = room.find(FIND_MY_SPAWNS);
            var spawn = spawns[0];
            if(!spawn)
            {
                console.log("Room "+roomname+" in room list, but no spawn - investigate");
                continue;
            }
            var doSpawn = null;
            for(var role in creepDefs)
            {
                var roledef = creepDefs[role];
                var rolecreeps = _.filter(Game.creeps, (creep) => ((creep.memory.role == role && !_.has(creep.memory.origrole)) || (_.has(creep.memory,"origrole") && creep.memory.origrole == role)));
                var hardspawn = false;
                var tryspawn = false;
                if(_.has(roledef,"hardMinimum") && rolecreeps.length < roledef["hardMinimum"])
                {
                    console.log("Room "+roomname+" - doing hard spawn for role "+role);
                    hardspawn = true;
                    tryspawn = true;
                }
                if(rolecreeps.length < roledef["aimFor"] && !hardspawn)
                {
                    console.log("Room "+roomname+" - trying spawn for role "+role);
                    tryspawn = true;
                }
                
                if((hardspawn || tryspawn) )
                {
                    var controllerLevel = room.controller.level;
                    if(_.has(roledef,"minRoomLevel" && controllerLevel < roledef["minRoomLevel"]))
                    {
                        console.log("Skipping spawn of "+rolename+" because room level is not high enough")
                    }
                    else
                    {
                        var roomCapacity = room.energyCapacityAvailable;
                        var triedandskipped = false;
                        for(var i in roledef["sizes"])
                        {
                            var sizedef = roledef["sizes"][i];
                            if(!hardspawn && triedandskipped)
                            {
                                // We don't NEED a smaller creep right now
                                break;
                            }

                            if((_.has(sizedef,"minCapacity") && sizedef["minCapacity"] < roomCapacity) || !(_.has(sizedef,"minCapacity")))
                            {
                                if(spawn.canCreateCreep(sizedef["body"]) == 0)
                                {
                                    doSpawn = { "role": role, "size": sizedef["body"] };
                                    break;
                                }
                                else
                                {
                                    triedandskipped = true;
                                }
                            }
                        }
                    }
            
                }
                if(doSpawn) { console.log("doSpawn defined for " + role); break; }    
            }
            if(doSpawn)
            {
                console.log("Spawning for role "+doSpawn["role"]+" - body: "+doSpawn["size"]);
                spawn.createCreep(doSpawn["size"], undefined, { "role": doSpawn["role"]});
                doSpawn = null;
            }
            
        }
        //console.(biggestspawnablecreep);
        /* var harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester' || creep.memory.origrole == 'harvester'));
        Memory.harvesters = harvesters;
        if(harvesters.length < 4 && Game.spawns['Spawn1'].canCreateCreep(biggestspawnablecreep) == 0) {
            var newName = Game.spawns['Spawn1'].createCreep(biggestspawnablecreep, undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
        if(upgraders.length < 3 && Game.spawns['Spawn1'].canCreateCreep(biggestspawnablecreep) == 0) {
            var newName = Game.spawns['Spawn1'].createCreep(biggestspawnablecreep, undefined, { role: 'upgrader'});
            console.log('Spawned new upgrader: '+newName);
        }
        
        var room = Game.spawns['Spawn1'].room;
        
        if(room.controller.level > 1)
        {
            var builders = _.filter(Game.creeps, (creep) => (creep.memory.role == 'builder' && creep.memory.origrole == null));
            if(builders.length < 2 && Game.spawns['Spawn1'].canCreateCreep(biggestspawnablecreep) == 0) {
                var newName = Game.spawns['Spawn1'].createCreep(biggestspawnablecreep, undefined, { role: 'builder'});
                console.log('Spawning new builder: '+newName);
            }
        } */
    
    }
};

module.exports = spawner;