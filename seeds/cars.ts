import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        { id: 1, name: "Toyota Camry", price: 430000, image: "https://res.cloudinary.com/daoqz3rdr/image/upload/v1715969479/Toyota_Camry_ubrxzx.webp", start_rent: "2024-05-01", finish_rent: "2024-05-10", created_at: new Date(), updated_at: new Date() },
        { id: 2, name: "Honda Civic", price: 430000, image: "https://res.cloudinary.com/daoqz3rdr/image/upload/v1715969551/Honda_Civic_zynbax.jpg", start_rent: "2024-05-05", finish_rent: "2024-05-15", created_at: new Date(), updated_at: new Date() },
        { id: 3, name: "Ford Mustang", price: 430000, image: "https://res.cloudinary.com/daoqz3rdr/image/upload/v1715969609/Ford_Mustang_u4lsov.webp", start_rent: "2024-05-10", finish_rent: "2024-05-20", created_at: new Date(), updated_at: new Date() }
    ]);
};
