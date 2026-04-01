import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroceryTables1775038570377 implements MigrationInterface {
    name = 'CreateGroceryTables1775038570377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "food_basket"."list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "sum" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_6db67246b0a1acc4d90638597f1" UNIQUE ("date"), CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "food_basket"."list_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_count" integer NOT NULL DEFAULT '1', "list_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_33d13041eff3d3e0f7cd4c5cae0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "food_basket"."product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "size" character varying(100), CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "food_basket"."list_product" ADD CONSTRAINT "FK_aeee80577e97ebf9ca5f0e334a8" FOREIGN KEY ("list_id") REFERENCES "food_basket"."list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food_basket"."list_product" ADD CONSTRAINT "FK_520bf16180f4f7c3afe0f491c41" FOREIGN KEY ("product_id") REFERENCES "food_basket"."product"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_basket"."list_product" DROP CONSTRAINT "FK_520bf16180f4f7c3afe0f491c41"`);
        await queryRunner.query(`ALTER TABLE "food_basket"."list_product" DROP CONSTRAINT "FK_aeee80577e97ebf9ca5f0e334a8"`);
        await queryRunner.query(`DROP TABLE "food_basket"."product"`);
        await queryRunner.query(`DROP TABLE "food_basket"."list_product"`);
        await queryRunner.query(`DROP TABLE "food_basket"."list"`);
    }

}
