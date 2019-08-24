async function postData(url = '', data = {}) {
    // Значения по умолчанию обозначены знаком *
    return await standart(url, 'POST', data);
}

async function getData(url = '', data = {}) {
    return await standart(url, 'GET', data);
}

async function standart(url = '', method = 'GET', data = {}) {
    let result = {};
    await fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
    }).then(res => res.json())
        .then(
            (success) => {
                result = success;
            },
            // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
            // чтобы не перехватывать исключения из ошибок в самих компонентах.
            (error) => {
                result = error;
                /*
                this.setState({
                    isLoaded: true,
                    error
                });*/
            }
        );
    return result;
}

module.exports.postData = postData;