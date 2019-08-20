/**
 Алгоритм проверки победы:
 было несколько вариантов и решил остановиться на этом, так как по времени он самым быстрым показался
 Инициализируем 4 вершины в координатоном пространстве (к примеру пользователь походил на поле (0, 1): // * пользователь, 0 непомеченый ход, # - компьютер
 . . . . . . . . . . .                             . . . . . . . . . . .
 . . . . . . . . . . .    Затем мы проходим        . . . . . . . . . . .  Если же мы где то набрали ряд из
 . . . 3 . 2 . . . . .     по этим векторам и      . . . 3 . 2 . 4 . . .   количества необходимого для победы,
 . . . . . . . . . . .     если встречаем на пути  . . . . 3 2 4 . . . .   то останавливаемся на этом и возвращаем
 . . . 1 * * # . . . .     1, то записываем её в   . . . 1 * * # 1 . . .   результат
 . . . . # * 0 . . . .     победу соответствующему . . . . # * 0 . . . .
 . . . 4 0 0 # . . . .     пользователю, но если   . . . 4 0 0 # 3 . . .
 . . . . . . . . . . .     встретили 0, то на      . . . . . . . . . . .
 . . . . . . . . . . .     соответствующем         . . . . . . . . . . .
 . . . . . . . . . . .     векторе результат       . . . . . . . . . . .
 . . . . . . . . . . .     обнуляем                . . . . . . . . . . .
 Как видно скорость вычисления в данном случае равна O(2 * n), где n то кол-во
 */
function checkEnd(currStep, countWin, field) {
    let coordXVer = currStep.coord_x - countWin + 1, coordYVer = currStep.coord_y, countWinVer = 0;
    let coordXHor = currStep.coord_x, coordYHor = currStep.coord_y - countWin + 1, countWinHor = 0;
    let coordXMainDiad = currStep.coord_x - countWin + 1, coordYMainDiag = currStep.coord_y - countWin + 1, countWinMainDiag = 0;
    let coordXSubDiag = currStep.coord_x + countWin - 1, coordYSubDiag = currStep.coord_y - countWin + 1, countWinSubDiag = 0;
    for (let i = 0; i < countWin * 2; i++) {
        if (isUserCoord(field, coordXVer, coordYVer)) {
            countWinVer++;
            if (countWinVer >= countWin) return 'VER';
        } else countWinVer = 0;
        coordXVer++;

        if (isUserCoord(field, coordXHor, coordYHor)) {
            countWinHor++;
            if (countWinHor >= countWin) return 'HOR';
        } else countWinHor = 0;
        coordYHor++;

        if (isUserCoord(field, coordXMainDiad, coordYMainDiag)) {
            countWinMainDiag++;
            if (countWinMainDiag >= countWin) return 'MD';
        } else countWinMainDiag = 0;
        coordXMainDiad++;
        coordYMainDiag++;

        if (isUserCoord(field, coordXSubDiag, coordYSubDiag)) {
            countWinSubDiag++;
            if (countWinSubDiag >= countWin) return 'SD';
        } else countWinSubDiag = 0;
        coordXSubDiag--;
        coordYSubDiag++;

    }
    return field;
}

/**
 * Очень долго по идее O(n(n - 2k)k)
 * Анализируем все поле для дальнейшего поиска стратегий хода: по 3м векторам от точки: *
 * . . * 1 1
 * . 3 . 2 .
 * 3 . . . 2
 * @param field базовое поле для анализа
 * @param countWin количество очков, необходимое для побежы
 * @returns {[]} массив данных с указанием очков пользователя и компьютера для координат
 */
function analyseField(field, countWin) {
    let allData = [];
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {

            let counterRight = counterTemplate();
            let counterDown = counterTemplate();
            let counterMainDiag = counterTemplate();
            let counterSubDiag = counterTemplate();
            for (let coord = 0; coord < countWin; coord++) {
                counterRight = processElemField(field, i, j + coord, counterRight);
                counterDown = processElemField(field, i + coord, j, counterDown);
                counterMainDiag = processElemField(field, i + coord, j + coord, counterMainDiag);
                counterSubDiag = processElemField(field, i + coord, j - coord, counterSubDiag);
            }
            // сохранение данных для дальнейшей проверки
            if (counterRight.comp !== 0 || counterRight.user !== 0) allData.push(counterRight);
            if (counterDown.comp !== 0 || counterDown.user !== 0) allData.push(counterDown);
            if (counterMainDiag.comp !== 0 || counterMainDiag.user !== 0) allData.push(counterMainDiag);
            if (counterSubDiag.comp !== 0 || counterSubDiag.user !== 0) allData.push(counterSubDiag);
        }
    }
    return allData;
}

/**
 * Создание нового возможного вектора развития событий
 * @param field исходное поле
 * @param x координата
 * @param y координата
 * @param counter счетчик, в который записываются данные
 * @returns {*} тот же счетчик, но с новыми данными
 */
function processElemField(field, x, y, counter) {
    if (field[x] !== undefined && field[x][y] !== undefined) {
        if (field[x][y] === 0) counter.comp++;
        else if (field[x][y] === 1) counter.user++;
        counter.coord.push({x: x, y: y});
    }
    return counter;
}

function isUserCoord(field, x, y) {
    return (field[x] !== undefined && field[x][y] !== undefined && field[x][y] === 1);
}

function counterTemplate() {
    return {
        comp: 0, user: 0,
        coord: [],
    };
}

/**
 * Генерация пустого поля (из едениц)
 * @param size размер поля
 * @returns {[]} полученный результат, двумерный массив размера size на size
 */
function generateField(size) {
    let field = new Array(size);
    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(size).fill(-1);
    }
    return field;
}

function makeField(steps, step, size) {
    let field = generateField(size);
    field[step.coord_x][step.coord_y] = 1;
    steps.forEach((step) => {
        field[step.coord_x][step.coord_y] = (step.isUser ? 1 : 0);
    });
    return field;
}

module.exports.analyseField = analyseField;
module.exports.makeField = makeField;
module.exports.checkEnd = checkEnd;