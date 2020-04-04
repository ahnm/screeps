var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var spawnCreepFactory = require('spawn.creepfactory');
var construction = require('construction');

module.exports.loop = function () {
    var tower = Game.getObjectById('b9d781551c02ef189d63533a');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for (var name in Game.spawns){
        spawnCreepFactory.run(Game.spawns[name]);
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

    for(var name in Game.rooms){
        var room = Game.rooms[name];
        construction.run(room);
    }
    
    console.log(Game.cpu.getUsed());
}