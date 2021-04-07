import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1615224850931
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // apago o campo de provider em apoints
    await queryRunner.dropColumn('appointments', 'provider');
    // adiciono a coluna
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        // qual coluna vai receber meu ForeignKeyId
        columnNames: ['provider_id'],
        // qual o nome da coluna na tabela de usuario que se relaciona com o campo criado
        referencedColumnNames: ['id'],
        // qual tabela faz referencia com o campo
        referencedTableName: 'users',
        // o que acontece com os agendamentos se o user for deletado ?
        // set o id como null
        onDelete: 'SET NULL',
        // se o ID for alterado isso será refletido em toda aplicação
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
