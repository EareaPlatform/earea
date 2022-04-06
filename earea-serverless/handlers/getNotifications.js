const mockNotifications = (amountToMock = 10, sensors) => {
    const randomDate = () => {
        const start = new Date(2020, 1, 1);
        const end = new Date();

        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const result = [];
    const sensorsAmount = 6;

    for (let i = 0; i < amountToMock; i++) {
        const originId = i%3 === 0? `sound-${i}` : `vibration-${i}`;
        result.push({
            id: `${i}`,
            sensorOriginId: originId,
            time: randomDate(),
        });
    }

    return result;
};

exports.handler = async (event) => {
    //const { amountToFetch, pageNumber } = JSON.parse(event.body);

    const lastNotificationsData = {
        notificationsData: mockNotifications(),
        amountOfPages: 2,
        currentPage: 1,
    };

    return {
        statusCode: 200,
        body: JSON.stringify(
            lastNotificationsData,
            null,
            2
        ),
    };
};