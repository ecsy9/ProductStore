import {sql} from "../config/db.js";

const SAMPLE_PRODUCTS = [
    {
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://example.com/images/headphones.jpg",
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        name: "Smartwatch",
        price: 199.99,
        image: "https://example.com/images/smartwatch.jpg",
        description: "Feature-packed smartwatch with fitness tracking and notifications."
    },
    {
        name: "4K Action Camera",
        price: 149.99,
        image: "https://example.com/images/action-camera.jpg",
        description: "Durable 4K action camera for capturing adventures."
    },
    {
        name: "Bluetooth Speaker",
        price: 49.99,
        image: "https://example.com/images/bluetooth-speaker.jpg",
        description: "Portable Bluetooth speaker with excellent sound quality."
    }
];

async function seedDatabase() {
    try {
        for (const product of SAMPLE_PRODUCTS) {
            const existing = await sql`
            SELECT * FROM products WHERE name = ${product.name} AND price = ${product.price}
            `;
            if (existing.length === 0) {
                await sql`
                INSERT INTO products (name, price, image, description)
                VALUES (${product.name}, ${product.price}, ${product.image}, ${product.description})
                `;
                console.log(`Inserted product: ${product.name}`);
            } else {
                console.log(`Product already exists: ${product.name}`);
            }
        }
        console.log("Database seeding completed.");
        process.exit(0);
    } catch (error) {
        console.log("Error seeding database:", error);
        process.exit(1);
    }
}  

seedDatabase();
