import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const DUMMY_MEETUPS = [
    {
        id: "m1",
        title: "First Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg",
        address: "Agra, Maharashtra, India",
        description: "the first meetup",
    },
    {
        id: "m2",
        title: "Second Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg",
        address: "Agra, Maharashtra, India",
        description: "the second meetup",
    },
    {
        id: "m3",
        title: "Third Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg",
        address: "Agra, Maharashtra, India",
        description: "the third meetup",
    },
];

const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>Meetups / NextJs</title>
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
};

export async function getStaticProps() {
    const client = await MongoClient.connect(
        "mongodb+srv://vallabhranganekar7386:Dooi4D0M0u9dWRkM@cluster0.opgpwh3.mongodb.net/meetups-web-app?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const meetups = await meetupCollection.find().toArray();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
            })),
        },
        revalidate: 10,
    };
}

export default HomePage;
