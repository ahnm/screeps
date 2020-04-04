var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.ticksToLive < 10){
            creep.say('💀 suicide');
            delete creep.memory;
            creep.suicide();
            return;
        }
        
        if (creep.memory.job == 'harvest'){
            if (creep.memory.source == undefined || creep.memory.source == ''){
                var sources = creep.room.find(FIND_SOURCES);
                var sourceCounts = {};
                
                for (var idx in sources) {
                    sourceCounts[sources[idx].id] = 0;
                }
            
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.source != undefined);    
            
                for (var idx in harvesters){
                    var harvester = harvesters[idx];
                    sourceCounts[harvester.memory.source]++;
                }
                
                var minSourceCount = Number.MAX_SAFE_INTEGER;
                var minSourceId;
                
                for (var key in sourceCounts){
                    if (minSourceCount > sourceCounts[key]){
                        minSourceId = key;
                        minSourceCount = sourceCounts[key];
                    }
                }

                creep.memory.source = minSourceId;
            }

            var source = Game.getObjectById(creep.memory.source);

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.say('🔄 harvest');
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
            if (creep.store.getUsedCapacity() == creep.store.getCapacity()) {
                creep.memory.job = 'deliver';
                delete creep.memory.source;
            }
        }
        else if (creep.memory.job == 'deliver'){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('🚚 deliver');
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.say('⚡ upgrade');
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }

            if (creep.store.getFreeCapacity() == creep.store.getCapacity()){
                creep.memory.job = 'harvest';
            }
        }
        else if (creep.memory.job == undefined || creep.memory.job == ''){
            creep.memory.job = 'harvest';
        }
	}
};

module.exports = roleHarvester;