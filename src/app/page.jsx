import Catalog from './components/Catalog';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-800">
        Mini-Storefront
      </h1>
      <Catalog />
    </main>
  );
}