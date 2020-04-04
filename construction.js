var construction = {

    /** @param {Room} room **/
    run: function(room) {
        console.log('Construction: ' + room.name);

        var controller = room.controller;
        
        if (controller == undefined){
            console.log('Room: ' + room.name + ' does not have a room controller.');
            return;
        }

        var rcl = controller.level;
        console.log('Room control level: ' + rcl);

        var numContainers = 0;
        var numExtensions = 0;

        switch (rcl){
            case 0:
                break;
            case 1:
                numContainers = 5;
                break;
            case 2:
                numContainers = 5;
                numExtensions = 5;
                break;
            default:
                break;
        }

        var constructedExtensions = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION;
            }
        });

        var toBeConstructedExtensions = room.find(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION;
            }
        });

        if ((constructedExtensions.length + toBeConstructedExtensions.length) < numExtensions)
        {
            console.log('Construct extension' + constructedExtensions.length + ':' + toBeConstructedExtensions.length);
            var spawns = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN;
                }
            });

            console.log(spawns.length);

            for (var idx in spawns){
                var spawn = spawns[idx];
            }
        }
    }
};

module.exports = construction;