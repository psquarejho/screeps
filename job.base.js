var Job = {
    persistant: false,

    // Minimum assigned creeps, optimal assigned creeps, maximum assigned creeps
    assignCreepLevel: { min: 0, optimal: 0, max: 0},
    assignedCreeps: [],
    jobType: 'base',
    creepSizes: [  { body: [ MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY], minCapacity: 500}, { body: [MOVE,MOVE,WORK,WORK,CARRY,CARRY], minCapacity: 400 }, , { body: [ MOVE,WORK,CARRY] }, ],
}

module.exports = Job;