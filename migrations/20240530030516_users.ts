import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table:Knex.TableBuilder) => {
        table.increments("id").primary();
        table.string("name",255).notNullable();
        table.string("email",255).notNullable();
        table.string("encryptedPassword").notNullable();
        table.string("role").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

