import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Initial1694623701960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "templates",
        columns: [
          {
            name: "id",
            isGenerated: true,
            generationStrategy: "increment",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "name",
            type: "text",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "templateFields",
        columns: [
          {
            name: "id",
            isGenerated: true,
            generationStrategy: "increment",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "name",
            type: "text",
            isNullable: false,
          },
          {
            name: "type",
            type: "text",
            isNullable: false,
          },
          {
            name: "templateId",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["templateId"],
            referencedColumnNames: ["id"],
            referencedTableName: "templates",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "documents",
        columns: [
          {
            name: "id",
            isGenerated: true,
            generationStrategy: "increment",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "templateId",
            type: "integer",
          },
          {
            name: "name",
            type: "text",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["templateId"],
            referencedColumnNames: ["id"],
            referencedTableName: "templates",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "documentFields",
        columns: [
          {
            name: "id",
            isGenerated: true,
            generationStrategy: "increment",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "name",
            type: "text",
            isNullable: false,
          },
          {
            name: "value",
            type: "text",
            isNullable: false,
          },
          {
            name: "documentId",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["documentId"],
            referencedColumnNames: ["id"],
            referencedTableName: "documents",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("templates");
    await queryRunner.dropTable("templateFields");
    await queryRunner.dropTable("documents");
    await queryRunner.dropTable("documentFields");
  }
}
