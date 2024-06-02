import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table:Knex.TableBuilder) => {
        table.increments("id").primary();
        table.string("name",255).notNullable();
        table.integer("price").notNullable();
        table.string("image").notNullable();
        table.boolean("available").notNullable();
        table.string("start_rent").notNullable();
        table.string("finish_rent").notNullable();
        table.string("created_by").notNullable();
        table.string("updated_by");
        table.string("deleted_by");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.timestamp("deleted_at");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}

