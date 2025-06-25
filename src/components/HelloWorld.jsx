const HelloWorld = () => {
  return (
    <div className="card animate-fade-in bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Hello World! 👋</h1>
      <p className="text-xl opacity-90">
        Welcome to React with Tailwind CSS, Zustand, and TanStack Query
      </p>
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">React</span>
        <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
        <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Zustand</span>
        <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">TanStack Query</span>
      </div>
    </div>
  );
};

export default HelloWorld;