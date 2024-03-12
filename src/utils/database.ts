import { MongoClient, MongoClientOptions } from 'mongodb'

const MONG_API = process.env.NEXT_PUBLIC_API_KEY

const url = `mongodb+srv://chuhongkyu:${MONG_API}.mongodb.net/?retryWrites=true&w=majority&appName=mrchu`
let connectDB: Promise<MongoClient>;

declare global {
    var _mongo: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url).connect()
}
export { connectDB }