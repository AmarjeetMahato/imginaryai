import mongoose , {Mongoose} from "mongoose";



const MONGODB_URL = process.env.MONGODB_URL;


interface MongooseConnection {
    conn : Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cache:MongooseConnection = (global as any).mongoose

if(!cache) {
    cache = (global as any).mongoose = {conn : null, promise:null}
}


export const connectedToDatabase = async() => {
     if(cache.conn) return cache.conn


     if(!MONGODB_URL) throw new Error('MONGODB_URL is not defined')

     cache.promise = cache.promise || mongoose.connect(MONGODB_URL,{
        dbName:"imaginaryAI", bufferCommands:false
     })

     cache.conn = await cache.promise;

     return cache.conn;
}