export function Button({ children, isLoading, ...props }) {
  return (
    <button
      className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Cargando...' : children}
    </button>
  );
}