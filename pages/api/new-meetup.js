// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        console.log(data);

        const { title, image, address, description } = data;

        const client = await MongoClient.connect(
            "mongodb+srv://vallabhranganekar7386:Dooi4D0M0u9dWRkM@cluster0.opgpwh3.mongodb.net/meetups-web-app?retryWrites=true&w=majority"
        );

        const db = client.db();

        const meetupCollection = db.collection("meetups");

        const result = await meetupCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: "Meetup Inserted!" });
    }
}

export default handler;
