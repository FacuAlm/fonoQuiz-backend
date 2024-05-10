import mongooes from 'mongoose';

export const connectDB = async () => {
    try {
        const connection = await mongooes.connect(process.env.DATABASE_URL)
        const url = `mongodb://${connection.connection.host}:${connection.connection.port}/${connection.connection.name}`
        console.log(`MongoDB connected: ${url}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}