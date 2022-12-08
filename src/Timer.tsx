import React from "react";

interface Count {
    hours: number;
    minutes: number;
    seconds: number;
}

const CountTimer = ({ hours = 0, minutes = 0, seconds = 0 }: Count) => {
    const [time, setTime] = React.useState<Count>({
        hours,
        minutes,
        seconds
    });

    const Time = () => {
        if (time.minutes === 59) {
            setTime({ hours: time.hours + 1, minutes: 0, seconds: 0 });
        } else if (time.seconds === 59) {
            setTime({
                hours: time.hours,
                minutes: time.minutes + 1,
                seconds: 0
            });
        } else {
            setTime({
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds + 1
            });
        }
    };

    React.useEffect(() => {
        const timerId = setInterval(() => Time(), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <div>
            <p>{`${time.hours.toString().padStart(2, "0")}:${time.minutes
                .toString()
                .padStart(2, "0")}:${time.seconds
                .toString()
                .padStart(2, "0")}`}</p>
        </div>
    );
};

export default CountTimer;
