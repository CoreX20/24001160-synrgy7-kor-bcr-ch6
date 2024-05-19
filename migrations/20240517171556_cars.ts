import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table:Knex.TableBuilder) => {
        table.increments("id").primary();
        table.string("name",255).notNullable();
        table.integer("price").notNullable();
        table.string("image").notNullable();
        table.string("start_rent").notNullable();
        table.string("finish_rent").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}

