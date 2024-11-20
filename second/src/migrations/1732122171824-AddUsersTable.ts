import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersTable1732122171824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE "user" (
            "id" SERIAL PRIMARY KEY,
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(255) NOT NULL,
            "age" INTEGER NOT NULL,
            "gender" VARCHAR(10) NOT NULL,
            "hasIssues" BOOLEAN DEFAULT false
          );
        `);

    const users = Array.from({ length: 1000000 }).map((_, i) => {
      const firstName = `'User${i}'`;
      const lastName = `'Surname${i}'`;
      const age = Math.floor(Math.random() * 80) + 18;
      const gender = i % 2 === 0 ? `'male'` : `'female'`;
      const hasIssues = i % 10 === 0 ? 'true' : 'false';
      return `(${firstName}, ${lastName}, ${age}, ${gender}, ${hasIssues})`;
    });

    const batchSize = 10000;
    for (let i = 0; i < users.length; i += batchSize) {
      const chunk = users.slice(i, i + batchSize).join(',');
      await queryRunner.query(`
            INSERT INTO "user" ("firstName", "lastName", "age", "gender", "hasIssues")
            VALUES ${chunk};
          `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user";`);
  }
}
