import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

interface CachedConnection {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

declare global {
    var mongoose: CachedConnection | undefined
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}
// connects to mongodb
export const connectDB = async () => {
    if (!MONGO_URI) {
        throw new Error(
            'Please define the MONGO_URI environment variable inside .env.local'
        )
    }
    // if connection already exists return it
    if (cached.conn) return cached.conn
    // if connection does not exist create a promise
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI)
    }
    try {
        cached.conn = await cached.promise
        return cached.conn
    } catch (error) {
        // if connection fails, set promise to null
        cached.promise = null
        console.error(error)
        throw error
    }
}
