const postUserDataToServer = (path, email, username, password, rePassword) => {
    return fetch(path, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            username,
            password,
            rePassword,
        })
    });
}

export default postUserDataToServer;