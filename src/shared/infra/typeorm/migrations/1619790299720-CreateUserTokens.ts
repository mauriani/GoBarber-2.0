import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserTokens1619790299720
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        // relacionando
        foreignKeys: [
          {
            name: 'TokenUser',
            //referencia a tabela
            referencedTableName: 'users',
            // referencia a coluna id
            referencedColumnNames: ['id'],
            // qual coluna vai receber esse id
            columnNames: ['user_id'],
            // o que acontecer com os tokens dos usuários deletados
            onDelete: 'CASCADE', //CASCADE - DELETA OS TOKENS TBM
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_tokens');
  }
}
