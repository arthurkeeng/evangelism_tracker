import EvangelismTrackForm from "@/components/evangelism_track_form";
// import ShowContacts from "@/components/show_contacts";
import { Metadata } from 'next';

export const metadata : Metadata = {
    title : "Evangelism Tracker", 
    description : "To help track and store outreach data "
}

export default function Home() {
  return (
      <div>

        <EvangelismTrackForm/>
        
      </div>

  );
}
