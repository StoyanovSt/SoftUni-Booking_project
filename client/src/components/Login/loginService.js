const loginUser = (path, username, password) =>{
    return fetch(path, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
        })
    });
}

export default loginUser;