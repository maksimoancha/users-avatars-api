import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAvatarTable1630792288002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'avatars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'mimetype',
            type: 'varchar',
            isNullable: false,
            length: '100',
          },
          {
            name: 'base64Content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'avatars',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('avatars');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('avatars', foreignKey);
    queryRunner.query('DROP TABLE avatars');
  }
}
