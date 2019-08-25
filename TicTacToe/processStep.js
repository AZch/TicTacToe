/**
 * Получить лучший ход для компьютера
 * @param mostComp данные анализа отсортированные по компьютеру
 * @param field исходное поле
 * @param countWin количество очков необходимое для побежы
 * @param countComp необходимое количество очков для хода
 * @returns {*} найденный ход с координатами, либо undefind усли ход не найден
 */
function getMostStep(mostComp, field, countWin, countComp = 0) {
    let step;
    if (mostComp.length > 0) {
        for (let compData of mostComp) {
            if (compData.comp < countComp) break;
            for (let coord of compData.coord) {
                if (field[coord.x][coord.y] === -1) {
                    if (compData.comp === countWin - 1) {
                        coord['end'] = true;
                    }
                    step = coord;
                } else if (field[coord.x][coord.y] === 1) {
                    step = undefined;
                    break;
                }
            }
            if (step !== undefined) break;
        }
    }
    return step;
}

/**
 * Получить лучший ход для компьютера
 * @param most данные анализа отсортированные по пользователю
 * @param field исходное поле
 * @param countWin количество очков необходимое для побежы
 * @param neight
 * @param countData необходимое количество очков для хода
 * @returns {*} найденный ход с координатами, либо undefind усли ход не найден
 */
function getFirstFindStep(most, field, countWin, neight, countData = 0) {
    let step;
    if (most.length > 0) {
        for (let data of most) {
            if (data.user < countData) break;
            for (let i = 0; i < data.coord.length; i++) {
                const currentCoord = data.coord[i];
                const preventCoord = data.coord[i - 1];
                const nextCoord = data.coord[i + 1];
                if (field[currentCoord.x][currentCoord.y] === -1 &&
                    ((preventCoord !== undefined && field[preventCoord.x][preventCoord.y] === neight) ||
                     (nextCoord !== undefined && field[nextCoord.x][nextCoord.y] === neight))) {
                    step = currentCoord;
                    break;
                }
            }
            if (step !== undefined) break;
        }
    }
    return step;
}

/**
 * Получить лучший ход для компьютера: сначала проверим можем ли мы выиграть,
 * затем сможем ли мы не дать пользователю выиграть,
 * затем можем ли мы увеличить свои шансы на победу
 * можем ли мы хоть как то помешать пользователю
 * произвольная клетка
 * @param analyseFieldData данные анализа
 * @param field исходное поле
 * @param countWin количество очков необходимое для победы
 * @returns {{x: *, y: *, end: boolean}|*} результирующий ход
 */
function getCoordStep(analyseFieldData, field, countWin) {
    if (analyseFieldData.length === 0) {
        return {end: true};
    }
    let mostComp = analyseFieldData.sort((first, second) => {
        return second.comp - first.comp;
    });

    let step = getMostStep(mostComp, field, countWin, countWin - 1);
    if (step !== undefined) return step;

    let mostUser = analyseFieldData.sort((first, second) => {
        return second.user - first.user;
    });

    step = getFirstFindStep(mostUser, field, countWin, 1, countWin - 2);
    if (step !== undefined) return step;

    if (Math.random() >= 0.5) { // добавил немного рандома в оборону (либо только ограничивать пользователя или пытаться победить)
        step = getFirstFindStep(mostUser, field, 1, 1);
        if (step !== undefined) return step;
    }

    step = getFirstFindStep(mostComp, field, 0, 0);
    if (step !== undefined) return step;


    return {
        x: Math.floor(Math.random() * field.length),
        y: Math.floor(Math.random() * field[0].length),
        end: false
    }
}

module.exports.getCoordStep = getCoordStep;