export async function GET() {
  const products = [
    { id: 'p1', name: 'Computer', price: 1400, category: 'Electronics', stock: 8 },
    { id: 'p2', name: 'Dresser', price: 250, category: 'Furniture', stock: 6 },
    { id: 'p3', name: 'Sweater', price: 50, category: 'Apparel', stock: 12 },
    { id: 'p4', name: 'Printer', price: 100, category: 'Electronics', stock: 10 },
    { id: 'p5', name: 'Headphones', price: 150, category: 'Electronics', stock: 5 },
    { id: 'p6', name: 'Pants', price: 75, category: 'Apparel', stock: 9 },
    { id: 'p7', name: 'Coffee Table', price: 160, category: 'Furniture', stock: 4 },
    { id: 'p8', name: 'Phone', price: 800, category: 'Electronics', stock: 18 },
    { id: 'p9', name: 'Bedframe', price: 300, category: 'Furniture', stock: 10 },
    { id: 'p10', name: 'Socks', price: 25, category: 'Apparel', stock: 11 }
  ];
  return Response.json(products);
}