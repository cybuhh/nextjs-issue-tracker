import prisma from '../prisma/client';
import { readFile } from 'fs/promises';
import { EOL } from 'os';
import { PrismaPromise } from '@prisma/client';

async function main() {
  const sqlDump = await readFile(__dirname + '/issues.sql', { encoding: 'utf8' });
  const sqlCommands = sqlDump.split(EOL);
  return await sqlCommands.reduce(
    async (promise: ReturnType<typeof Promise.resolve> | PrismaPromise<number>, sqlCommand: string) => {
      await promise;
      return prisma.$executeRawUnsafe(sqlCommand);
    },
    Promise.resolve()
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
