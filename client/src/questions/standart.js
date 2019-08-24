async function postData(url = '', data = {}) {
    // Значения по умолчанию обозначены знаком *
    let result = {};
    await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(
            (success) => {
                console.log('FETCH');
                console.log(success);
                result = success;
            },
            // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
            // чтобы не перехватывать исключения из ошибок в самих компонентах.
            (error) => {
                console.log('FETCH');
                console.log(error);
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

async function getData(url = '', data = {}) {
    let result = {};
    await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
    }).then(res => res.json())
        .then(
            (success) => {
                console.log('FETCH');
                console.log(success);
                result = success;
            },
            // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
            // чтобы не перехватывать исключения из ошибок в самих компонентах.
            (error) => {
                console.log('FETCH');
                console.log(error);
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
module.exports.getData = getData;