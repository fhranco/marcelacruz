import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
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
