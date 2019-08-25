Крестики нолики с произвольным размером карты и последовательностью необходимой для победы

Для запуска сервера необходимо сгенерировать сертефикаты: server.cert? server.key с помощью команды:
 openssl req -nodes -new -x509 -keyout server.key -out server.cert
в папке проекта.
Также необходимо прописать URL подключения к базе mongodb: в файле ./dbData/db.js

Что представляет из себя api:
1. / : get - получение списка игроков, post - создание игры для пользователя.
2. /game/:id : get - получение игры по id, post - сделать шаг (передаются координаты текущего шага и возвращается либо новый шаг, либо результат, либо результат и шаг (если компьютер победил))
3. /user/:id : get - получить данные игрока 
4. /user/:id : post - зарегистрировать игрока

TODO: добавить socket.io 