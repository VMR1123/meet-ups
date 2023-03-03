import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        "mongodb+srv://vallabhranganekar7386:Dooi4D0M0u9dWRkM@cluster0.opgpwh3.mongodb.net/meetups-web-app?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

    return {
        fallback: "blocking",
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        "mongodb+srv://vallabhranganekar7386:Dooi4D0M0u9dWRkM@cluster0.opgpwh3.mongodb.net/meetups-web-app?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const selectedMeetup = await meetupCollection.findOne({
        _id: new ObjectId(meetupId),
    });

    // console.log(meetupId);

    return {
        props: {
            meetupData: {
                image: selectedMeetup.image,
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
            },
        },
    };
}

export default MeetupDetails;
