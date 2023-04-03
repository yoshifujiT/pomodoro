import { Button } from './Button';

type Props = {
  onClick: () => void;
};

export const StartButton = ({ onClick }: Props) => {
  return <Button onClick={onClick}>Start</Button>;
};
