import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number;
}

const connection:ConnectionObject = {}

async function dbConnect():Promise <void> {
    if(connection.isConnected){
        console.log("Already connected to a Database")
        return;
    }
    try {
        //Trying to connect to database
        const db = await mongoose.connect(process.env.MONGODB_URL || '',{})

        // Connection ready state

        // 0 = disconnected
        // 1 = connected
        // 2 = connecting
        // 3 = disconnecting
        // 99 = uninitialized
        connection.isConnected = db.connections[0].readyState;

        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed!',error)
        // Graceful exit the process in case of a connection error
    process.exit(1);
    }
}

export default dbConnect;