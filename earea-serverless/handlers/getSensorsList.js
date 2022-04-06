const mockSensors = (amountToMock = 6) => {
    const randomDate = () => {
        const start = new Date(2021, 1, 1);
        const end = new Date();

        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const result = [];

    for (let i = 0; i < amountToMock; i++) {
        const type = i%3 === 0? `sound-sensor` : `vibration-sensor`
        result.push({
            id: `${i}`,
            type: `${type}`,
            title: i%3 === 0? `Sound ${i}` : `Vibration ${i}`,
            isOnline: false,
            lastActivity: randomDate(),
        });
    }

    return result;
};

exports.handler = async (event) => {
    //const { amountToFetch, pageNumber } = JSON.parse(event.body);

    const sensorsData = {
        notificationsData: mockSensors(),
        amountOfPages: 1,
        currentPage: 1,
    };

    return {
        statusCode: 200,
        body: JSON.stringify(
            sensorsData,
            null,
            2
        ),
    };
};
