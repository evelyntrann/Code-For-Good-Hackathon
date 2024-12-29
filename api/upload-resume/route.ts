import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const firstName = formData.get('firstName') as string | null;

    if (!file || !firstName) {
      return NextResponse.json({ error: 'Missing file or firstName' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${firstName}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('Resumes')
      .upload(fileName, await file.arrayBuffer(), {
        contentType: file.type,
      });

    if (error) {
      console.error('Supabase storage error:', error);
      throw error;
    }
    
    const { data: { publicUrl } } = supabase.storage.from('Resumes').getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}