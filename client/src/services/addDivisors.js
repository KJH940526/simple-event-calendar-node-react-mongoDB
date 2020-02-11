const areIntersected = (first, second) => {
    const firstStart = first.start;
    const firstEnd = first.start + first.duration;
    const secondStart = second.start;
    const secondEnd = second.start + second.duration;
    return (secondEnd > firstStart) && (secondStart < firstEnd);
};


const addDivisors = (events) => {
    if (!events.length) return events;
    let modEvents = events
        .map(event => ({
            ...event,
            widthDivisor: 1,
            position: 0
        }))
        .sort((a, b) => a.start - b.start);


    for (let i = 0; i < modEvents.length; i++) {
        const intersected = [];
        let isIncludedI = false;
        for (let j = i + 1; j < modEvents.length; j++) {
            if (areIntersected(modEvents[i], modEvents[j])) {
                if ((!isIncludedI)) {
                    intersected.push(modEvents[i]);
                    isIncludedI = true;
                }
                intersected.push(modEvents[j]);
            }
        }
        if (intersected.length > 1) {
            intersected[0].position && intersected.sort((a, b) => a.position - b.position);

            intersected
                .forEach((el, idx) => {
                    if (el.widthDivisor === 1) {
                        el.widthDivisor = intersected.length;
                        el.position = idx;
                    }
                });
        }
        intersected.length = 0;
    }
    return modEvents;
};

export default addDivisors;

