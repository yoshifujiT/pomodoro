import { Button } from './Button';

type ResetButtonProps = {
  onClick: () => void;
};

export const ResetButton = ({ onClick }: ResetButtonProps) => {
  return <Button onClick={onClick}>Reset</Button>;
};
