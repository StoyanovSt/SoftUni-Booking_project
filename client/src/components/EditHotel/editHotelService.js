const updateHotelData = (path, token, hotelName, city, freeRooms, imageUrl) => {
    return fetch(path, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `${token}`,
        },
        body: JSON.stringify({
            hotelName,
            city,
            freeRooms,
            imageUrl,
        })
    });
}

export default updateHotelData;