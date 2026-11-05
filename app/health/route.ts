import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.info('INFO: Health check accessed');
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('ERROR: Health check failed', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}