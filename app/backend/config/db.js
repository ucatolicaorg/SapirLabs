import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.ATLAS_URI);
        console.log(`Mongo DB is connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1) // 1 porque hay un error, 0 porque se estableció la conexion
    }
}