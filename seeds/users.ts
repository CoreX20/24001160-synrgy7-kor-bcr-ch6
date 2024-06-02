import { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const password = await bcrypt.hash("123456", 10);
    // Inserts seed entries
    await knex("users").insert([
        { id: 1, name: "superadmin", email: "superadmin@mail.com", encryptedPassword: password, role:"superadmin" },
        // { id: 2, name: "admin", email: "admin@mail.com", encryptedPassword: password, role:"admin" },
        // { id: 3, name : "member", email: "member@mail.com", encryptedPassword: password, role:"member" }
    ]);
};
