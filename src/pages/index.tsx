import { useState, useCallback, useEffect } from 'react';
import { Timer } from '../components/Timer';
import { Counter } from '../components/Counter';
import { ResetButton } from '../components/ResetButton';
import { PauseButton } from '../components/PauseButton';
import { StartButton } from '../components/StartButton';
import { GetServerSideProps } from 'next';
import { parseCookies, setCookie } from 'nookies';
import styled from '@emotion/styled';

const WORK_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;

const saveCountToCookie = (count: number) => {
  setCookie(null, 'workCount', String(count), {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

const getCountFromCookie = (cookies: any): number => {
  const count = parseInt(cookies.workCount, 10);
  return isNaN(count) ? 0 : count;
};

const getBreakDuration = (workCount: number) => {
  if (workCount % 4 === 0) {
    return LONG_BREAK_DURATION;
  } else {
    return SHORT_BREAK_DURATION;
  }
};

const getHeadText = (isWorking: boolean, isPaused: boolean): string => {
  if (isWorking) {
    return isPaused ? 'Time to Work!!' : 'Working';
  } else {
    return 'Break time';
  }
};

const Body = styled.div`
  background: #212121;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type HomeProps = {
  initialCount: number;
};

const Home = ({ initialCount }: HomeProps) => {
  const [isWorking, setIsWorking] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [workCount, setWorkCount] = useState(initialCount);
  const [timerDuration, setTimerDuration] = useState(WORK_DURATION);

  // 開始
  const handleStart = useCallback(() => {
    setHasStarted(true);
    setIsPaused(false);
  }, []);

  // 停止・再開
  const handlePauseToggle = useCallback(() => {
    setIsPaused((prevState) => !prevState);
  }, []);

  // タイマー終了
  const handleTimerFinish = () => {
    setIsWorking((prev) => !prev);
  };

  useEffect(() => {
    if (!isWorking) {
      setWorkCount((count) => {
        const newCount = count + 1;
        saveCountToCookie(newCount);
        return newCount;
      });

      const breadDuration = getBreakDuration(workCount + 1);
      setTimerDuration(breadDuration);
    } else {
      setTimerDuration(WORK_DURATION);
    }
  }, [isWorking]);

  // リセット
  const handleReset = useCallback(() => {
    setWorkCount(0);
    saveCountToCookie(0);
    setIsWorking(true);
    setTimerDuration(WORK_DURATION);
  }, []);

  useEffect(() => {
    if (isPaused || !hasStarted) return;

    if (timerDuration <= 0) {
      setIsPaused(true);
      return;
    }

    const timerId = setTimeout(() => {
      setTimerDuration(timerDuration - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timerDuration, isPaused, hasStarted]);

  return (
    <Body>
      <div
        css={{
          color: isWorking ? '#ff8a65' : '#69f0ae',
          fontSize: 40,
          marginBottom: 40,
        }}
      >
        {getHeadText(isWorking, isPaused)}
      </div>
      <div css={{ marginBottom: 20 }}>
        <Timer
          duration={timerDuration}
          onFinish={handleTimerFinish}
          isPaused={isPaused}
          isWorking={isWorking}
        />
      </div>
      <div css={{ marginBottom: 40 }}>
        <Counter count={workCount} />
      </div>
      <div css={{ marginBottom: 20 }}>
        {!hasStarted ? (
          <StartButton onClick={handleStart} />
        ) : (
          <PauseButton isPaused={isPaused} onClick={handlePauseToggle} />
        )}
      </div>
      <ResetButton onClick={handleReset} />
    </Body>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const initialCount = getCountFromCookie(cookies);
  return {
    props: { initialCount },
  };
};

export default Home;
