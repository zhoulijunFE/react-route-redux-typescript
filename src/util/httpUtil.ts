export function get(url: string, opts?: any) {
    // TODO(zhoulj) deal http repeat
    // TODO(zhoulj) add common loading
    // TODO(zhoulj) add common error tip
    // TODO(zhoulj) get add timestamp
    // TODO(zhoulj) url encoding
    return new Promise((resolve, reject) => {
        fetch(url, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                "x-source": "web"
            },
            body: opts
        })
            .then(response => {
                if (checkStatus(response)) {
                    return response.json();
                }
            })
            .then(data => {
                if (checkCode(data)) {
                    resolve(data);
                } else {
                    reject();
                }
            }).catch(error => {
                handleError(reject, error)
            })
    })
}

export function post(url: string, opts?: any) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                "x-source": "web"
            },
            body: opts
        })
            .then(response => {
                if (checkStatus(response)) {
                    return response.json();
                }
            })
            .then(data => {
                if (checkCode(data)) {
                    resolve(data);
                } else {
                    reject(data);
                }
            }).catch(error => {
                handleError(reject, error)
            })
    })
}

export function put(url: string, opts?: any) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                "x-source": "web"
            },
            body: opts
        })
            .then(response => {
                if (checkStatus(response)) {
                    return response.json();
                }
            })
            .then(data => {
                if (checkCode(data)) {
                    resolve(data);
                } else {
                    reject(data);
                }
            }).catch(error => {
                handleError(reject, error)
            })
    })
}

function checkStatus(response: any) {
    if (response.status === 200) {
        return true;
    }
    // TODO(zhoulj) check http statu detail
    return false;
}

function checkCode(data: any) {
    if (data && data.meta && data.meta.code === 200) {
        return true;
    }
    // TODO(zhoulj) check http code detail
    return false;
}

function handleError(reject: any, error: any) {
    // TODO(zhoulj) check http error detail
    console.log(" http error: ", error);
    return reject(error);
}