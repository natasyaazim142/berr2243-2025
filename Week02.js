//import the MongoClient class from the mongodb module
//install with "npm install mongodb"
//run to the code: "node Week02.js"
const { MongoClient } = require("mongodb");

// MongoDB connection URL dan nama database
const uri = "mongodb://localhost:27017";
const dbName = "rideSharing";

async function main() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db(dbName);
        const driversCollection = db.collection("drivers");

        // Task 1: Define drivers array
        const drivers = [
            { name: "John Doe", age: 35, isAvailable: true, rating: 4.6 },
            { name: "Jane Smith", age: 29, isAvailable: false, rating: 4.4 },
            { name: "Ali Bin Ahmad", age: 41, isAvailable: true, rating: 4.8 }
        ];

        // Task 2: Display all driver names
        console.log("Driver Names:");
        drivers.forEach(driver => console.log(driver.name));

        // Add a new driver
        drivers.push({ name: "Muthu Kumar", age: 38, isAvailable: true, rating: 4.7 });

        // Task 3: Insert all drivers into MongoDB
        const insertResult = await driversCollection.insertMany(drivers);
        console.log("Inserted drivers:", insertResult.insertedCount);

        // Task 4: Find available drivers with rating >= 4.5
        const topDrivers = await driversCollection.find({ 
            isAvailable: true, 
            rating: { $gte: 4.5 } 
        }).toArray();
        console.log("Top Rated Available Drivers:");
        console.log(topDrivers);

        // Task 5: Increase John Doe's rating by 0.1
        const updateResult = await driversCollection.updateOne(
            { name: "John Doe" },
            { $inc: { rating: 0.1 } }
        );
        console.log("Update Result:", updateResult.modifiedCount);

        // Task 6: Delete all unavailable drivers
        const deleteResult = await driversCollection.deleteMany({ isAvailable: false });
        console.log("Deleted Unavailable Drivers:", deleteResult.deletedCount);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB.");
    }
}

main();
