var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			console.log('' + targets.length);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
			}
			else {
				creep.say('😴 idle');
				creep.moveTo(Game.flags.Idle, {visualizePathStyle: {stroke: '#ffffff'}});
			}
	    }
	    else {
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
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;