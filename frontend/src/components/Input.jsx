export function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={`border p-2 rounded-md focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
        }`}
        {...props} // Aquí entra el type, name, value, onChange, placeholder
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}