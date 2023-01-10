import mongoose, { ConnectOptions } from "mongoose";

export async function connect() {
	try {
		const dbConnect =  await mongoose.connect(`${process.env.MONGODB_URI}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		} as ConnectOptions);

		console.log(`Connected to db: ${dbConnect.connection.name}`);
	} catch (err) {
		console.log(err);
	}
}