import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

let db = null;
let client = null;

async function connectDB() {
    if (db) return db; // Si ya hay una conexión, la reutiliza
    
    try {
        client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(DB_NAME);
        console.log("Connected to MongoDB");
        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

function getDB() {
    if (!db) {
        throw new Error("Database not connected. Call connectDB first.");
    }
    return db;
}

async function disconnectDB() {
    if (client) {
        await client.close();
        db = null;
        client = null;
        console.log("Disconnected from MongoDB");
    }
}

export { connectDB, getDB, disconnectDB, ObjectId };