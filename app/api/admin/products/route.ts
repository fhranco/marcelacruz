import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'products.json');

const MASTER_KEY = "ma_secret_2026"; // Secret Master Key for Marcelacruz Admin

function isAuthorized(request: Request) {
  const authHeader = request.headers.get('Authorization');
  return authHeader === `Bearer ${MASTER_KEY}`;
}

// Get all products (Public)
export async function GET() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 });
  }
}

// Add/Update product (SECURE)
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized Access Denied' }, { status: 401 });
  }
  try {
    const newProduct = await request.json();
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    const products = JSON.parse(data);

    // If ID exists, update it, otherwise push new
    const index = products.findIndex((p: any) => p.id === newProduct.id);
    if (index !== -1) {
      products[index] = newProduct;
    } else {
      // Auto-increment ID if not provided
      if (!newProduct.id) {
        const lastId = products.length > 0 ? Math.max(...products.map((p: any) => parseInt(p.id))) : 0;
        newProduct.id = (lastId + 1).toString();
      }
      products.push(newProduct);
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
  }
}

// Delete product (SECURE)
export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized Access Denied' }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    let products = JSON.parse(data);
    products = products.filter((p: any) => p.id !== id);
    fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
