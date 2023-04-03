import { useState, useEffect } from 'react';

type TimerProps = {
  duration: number;
  onFinish: () => void;
  isPaused: boolean;
  isWorking: boolean;
};

export const Timer = ({
  duration,
  onFinish,
  isPaused,
  isWorking,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (isPaused) return;

    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onFinish]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div css={{ color: isWorking ? '#ff8a65' : '#69f0ae', fontSize: 160 }}>
      {minutes.toString().padStart(2, '0')}:
      {seconds.toString().padStart(2, '0')}
    </div>
  );
};
