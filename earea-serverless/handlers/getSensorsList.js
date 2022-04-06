const mockSensors = (amountToMock = 6) => {
    const randomDate = () => {
        const start = new Date(2021, 1, 1);
        const end = new Date();

        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const result = [];

    for (let i = 0; i < amountToMock; i++) {
        result.push({
            id: `sensor-${i}`,
            title: i%3 === 0? `sound-sensor-${i}` : `vibration-sensor-${i}`,
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

    const sensorsDataString = JSON.stringify(sensorsData, null, 2);

    return {
        statusCode: 200,
        body: JSON.stringify(
            sensorsData,
            null,
            2
        ),
    };
};
