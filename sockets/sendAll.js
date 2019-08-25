const FindQuestions = require('../dbData/findQuestions');

exports = module.exports = function (io) {
  io.sockets.on('connection', function (socket) {
      socket.on('resultGame', function (data) {
          data = JSON.parse(data);
          FindQuestions.findUserByGameId(data.gameId).then((user) => {
              const dataSend = {
                  msg: 'The game is over' +
                      (user === null ? '' : ', user: ' + user.name) + ', winner: ' +
                      (data.isUserWin ? 'computer' : 'user'),
              };
              io.emit('resultGameMsg', JSON.stringify(dataSend));
          });
      });
  });
};