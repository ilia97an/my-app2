import { NextResponse } from 'next/server';
import { fetchItems } from '@/app/lib/data';

export async function GET(request: Request) {
  const items = await fetchItems();
  const headers = new Headers();
  return NextResponse.json(items, {status: 200});
}
