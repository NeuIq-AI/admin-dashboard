export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow">
      {message}
    </div>
  );
}
