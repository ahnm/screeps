
const numHarvesters = 10;
const numBuilders = 4;

var creepFactory = {
    /** @param {Spawn} spawn **/
    run: function(spawn) {
        if (spawn.spawning) { 
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1, 
                spawn.pos.y, 
                {align: 'left', opacity: 0.8});
        }
        else
        {
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
         
            var error = OK;
            var spawnAttempt = false;

            if (harvesters.length < numHarvesters){
                var newName = 'Harvester' + Game.time;
                error = spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}});
                spawnAttempt = true;
            }
            else if (builders.length < numBuilders){
                var newName = 'Builder' + Game.time;
                error = spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'builder'}});
                spawnAttempt = true;
            }

            if (spawnAttempt)
            {
                switch(error)
                {
                    case OK:
                        console.log('Spawning new harvester: ' + newName);
                        break;
    
                    case ERR_NOT_ENOUGH_ENERGY:
                        console.log('Not enough energy: ' + spawn.store[RESOURCE_ENERGY]);
                }
            }
        }
	}
};

module.exports = creepFactory;