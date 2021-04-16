const postHotelDataToServer = (path, token, name, city, freeRooms, imageUrl) => {
    return fetch(path, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `${token}`,
        },
        body: JSON.stringify({
            name,
            city,
            freeRooms,
            imageUrl,
        })
    });
}

export default postHotelDataToServer;