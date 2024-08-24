'use server';

import { NextResponse } from 'next/server';
import { fetchItem, fetchItemDescription } from '@/app/lib/data';
import { updateItem } from '@/app/lib/actions';
import Item from '@/app/lib/types';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request, 
  { params }: {
    params: { slug: string }
  }
) {
  const url = new URL(request.url);
  const description = url.searchParams.get('description');
  let item = null;
  if (description) {
    item = await fetchItemDescription(params.slug);
  } else {
    item = await fetchItem(params.slug);
  }
  return NextResponse.json(item, {status: 200});
}

async function post(
  request: Request, 
  { params }: {
    params: { slug: string }
  }
) {
  //console.log("route debug post");
  const item = await request.json();
  console.log('debug');
  //console.log(formData);
  await updateItem(params.slug, item as Item);
  return NextResponse.json({}, {status: 200});
}

export async function POST(
  request: Request, 
  { params }: {
    params: { slug: string }
  }
) {
  return await post(request, {params: params});
}

