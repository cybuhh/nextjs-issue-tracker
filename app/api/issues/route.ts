import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createIssueSchema } from '../../validationSchemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = createIssueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error occured';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
