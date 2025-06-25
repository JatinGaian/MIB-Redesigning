import useCounterStore from '../stores/counterStore';

const Counter = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="card animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Counter with Zustand</h2>
      <div className="text-center">
        <div className="text-6xl font-bold text-blue-600 mb-6 animate-bounce-slow">
          {count}
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={decrement} className="btn-secondary">
            -
          </button>
          <button onClick={increment} className="btn-primary">
            +
          </button>
          <button onClick={reset} className="btn-secondary">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;