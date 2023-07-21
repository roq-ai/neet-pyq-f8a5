import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { attemptValidationSchema } from 'validationSchema/attempts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.attempt
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAttemptById();
    case 'PUT':
      return updateAttemptById();
    case 'DELETE':
      return deleteAttemptById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAttemptById() {
    const data = await prisma.attempt.findFirst(convertQueryToPrismaUtil(req.query, 'attempt'));
    return res.status(200).json(data);
  }

  async function updateAttemptById() {
    await attemptValidationSchema.validate(req.body);
    const data = await prisma.attempt.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAttemptById() {
    const data = await prisma.attempt.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
