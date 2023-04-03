type CounterProps = {
  count: number;
};

export const Counter = ({ count }: CounterProps) => {
  return (
    <div css={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
      Count: {count}
    </div>
  );
};
