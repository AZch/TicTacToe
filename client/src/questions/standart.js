async function postData(url = '', data = {}) {
    // Значения по умолчанию обозначены знаком *
    let result = {};
    await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(
            (success) => {
                result = success;
            },
            (error) => {
                result = error;
            }
        );
    return result;
}

async function getData(url = '') {
    let result = {};
    await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }).then(res => res.json())
        .then(
            (success) => {
                result = success;
            },
            (error) => {
                result = error;
            }
        );
    return result;
}

module.exports.postData = postData;
module.exports.getData = getData;