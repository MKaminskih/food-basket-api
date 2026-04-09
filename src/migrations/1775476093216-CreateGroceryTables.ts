import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroceryTables1775476093216 implements MigrationInterface {
    name = 'CreateGroceryTables1775476093216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "food_basket"."list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "sum" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_6db67246b0a1acc4d90638597f1" UNIQUE ("date"), CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "food_basket"."list_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_count" integer NOT NULL DEFAULT '1', "list_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_33d13041eff3d3e0f7cd4c5cae0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "food_basket"."product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "size" character varying(100), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5df2eb29ea5ca7a64d1ba9bf21" ON "food_basket"."product" ("name") WHERE "size" IS NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9adc6032ae3cc8d5899e1ed7fb" ON "food_basket"."product" ("name", "size") WHERE "size" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food_basket"."list_product" ADD CONSTRAINT "FK_aeee80577e97ebf9ca5f0e334a8" FOREIGN KEY ("list_id") REFERENCES "food_basket"."list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food_basket"."list_product" ADD CONSTRAINT "FK_520bf16180f4f7c3afe0f491c41" FOREIGN KEY ("product_id") REFERENCES "food_basket"."product"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_basket"."list_product" DROP CONSTRAINT "FK_520bf16180f4f7c3afe0f491c41"`);
        await queryRunner.query(`ALTER TABLE "food_basket"."list_product" DROP CONSTRAINT "FK_aeee80577e97ebf9ca5f0e334a8"`);
        await queryRunner.query(`DROP INDEX "food_basket"."IDX_9adc6032ae3cc8d5899e1ed7fb"`);
        await queryRunner.query(`DROP INDEX "food_basket"."IDX_5df2eb29ea5ca7a64d1ba9bf21"`);
        await queryRunner.query(`DROP TABLE "food_basket"."product"`);
        await queryRunner.query(`DROP TABLE "food_basket"."list_product"`);
        await queryRunner.query(`DROP TABLE "food_basket"."list"`);
    }

}
