const ProcessStep = require('./processStep');
const ProcessField = require('./processField');

function isValidStep(game, dataStep) {
    for (let step of game.steps) {
        if (step.coord_x === parseInt(dataStep.coord_x) &&
            step.coord_y === parseInt(dataStep.coord_y)) {
            return false;
        }
    }
    return true;
}

function processStep(game, step) {
    let field = ProcessField.makeField(game.steps, step, game.size); // make field with steps
    field = ProcessField.checkEnd(step, game.sizeWin, field); // check field to end by user step
    if (Array.isArray(field)) { // if always array then user not end game
        return ProcessStep.getCoordStep(ProcessField.analyseField(field, game.sizeWin), field, game.sizeWin); // get step computer
    } else {
        return field;
    }
}

function makeFirstRandomStep(game) {
    return {
        x: Math.floor(Math.random() * game.size),
        y: Math.floor(Math.random() * game.size),
        end: false
    }
}

module.exports.isValidStep = isValidStep;
module.exports.processStep = processStep;
module.exports.makeFirstRandomStep = makeFirstRandomStep;