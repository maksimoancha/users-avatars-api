import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColToUsers1630710395426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: true,
        length: '100',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('ALTER TABLE users DROP COLUMN email');
  }
}
