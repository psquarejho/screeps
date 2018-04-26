var utils = require("utils");

var creepSizes =  [  { body: [ MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY], minCapacity: 500}, { body: [MOVE,MOVE,WORK,WORK,CARRY,CARRY], minCapacity: 400 }, , { body: [ MOVE,WORK,CARRY] }, ];
/*var creepDefs = {
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
 
    };*/
var spawner = {

    
    /** Basic spawner function **/
    run: function(room) {
        /* Garbage collection */
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        var room = Game.rooms[room];   
        var spawns = room.find(FIND_MY_SPAWNS);
        var spawn = null;
        for(var i = 0; i < spawns.length; i++)
        {
            s = spawns[i];
            if(s.spawning == null)
            {
                spawn = s;
                break;
            }
        }
        if(!spawn)
        {
            //console.log("Room "+roomname+" in room list, but no spawn - investigate");
            return;
        }
        var doSpawn = null;
        var controllerLevel = room.controller.level;
        var roomCapacity = room.energyCapacityAvailable;
        var newcreepname = "worker#"+room.name+"#"+Game.time;
        for(var i in creepSizes)
        {
            var sizedef = creepSizes[i];
            if((_.has(sizedef,"minCapacity") && sizedef["minCapacity"] < roomCapacity) || !(_.has(sizedef,"minCapacity")))
            {   
                console.log("Checking spawn for name "+newcreepname+", body: "+JSON.stringify(sizedef));
                if(spawn.spawnCreep(sizedef["body"], newcreepname, { dryRun: true}) == OK)
                {
                    doSpawn = sizedef["body"];
                    break;
                }
            }
        }
        if(doSpawn) 
        {
            console.log("Spawning in "+room + doSpawn);
            var res = spawn.spawnCreep(doSpawn, newcreepname, {});
            doSpawn = null;
        }    
    }
};

module.exports = spawner;