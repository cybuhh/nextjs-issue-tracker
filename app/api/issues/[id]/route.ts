import authOptions from '@/app/auth/authOptions';
import { patchIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  try {
    const body = await request.json();

    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const { title, description, assignedToUserId, status } = body;

    if (assignedToUserId) {
      const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });
      if (!user) {
        return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
      }
    }

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });
    if (!issue) {
      return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title,
        description,
        assignedToUserId,
        status,
      },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error occured';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  try {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });
    if (!issue) {
      return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
    }

    await prisma.issue.delete({ where: { id: issue.id } });

    return new NextResponse(null, { status: 204 });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error occured';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
