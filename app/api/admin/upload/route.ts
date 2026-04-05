import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MASTER_KEY = "ma_secret_2026";

function isAuthorized(request: Request) {
  const authHeader = request.headers.get('Authorization');
  return authHeader === `Bearer ${MASTER_KEY}`;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Clean filename
    const filename = file.name.replace(/ /g, '_').toLowerCase();
    const uniqueFilename = `${Date.now()}_${filename}`;
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', uniqueFilename);

    fs.writeFileSync(uploadPath, buffer);

    const publicUrl = `/uploads/${uniqueFilename}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
