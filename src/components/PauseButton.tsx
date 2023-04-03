import { Button } from './Button';

type PauseButtonProps = {
  isPaused: boolean;
  onClick: () => void;
};

export const PauseButton = ({ isPaused, onClick }: PauseButtonProps) => {
  return <Button onClick={onClick}>{isPaused ? 'Restart' : 'Pause'}</Button>;
};
