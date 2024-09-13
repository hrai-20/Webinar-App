import { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import WebinarFormModal from "./components/WebinarFormModal";

const dummyData = [
  {
    id: 1,
    name: "Matthew Martin",
    role: "Lead Front End Developer",
    company: "Google",
    topic: "Modern JavaScript Frameworks",
    eventTitle: "The Future of Front-End Development",
    eventDate: "2024-09-15",
    eventStartTime: "10:00",
    eventEndTime: "12:00",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "UX/UI Designer",
    company: "Apple",
    topic: "User-Centered Design Principles",
    eventTitle: "Crafting Intuitive User Interfaces",
    eventDate: "2024-09-20",
    eventStartTime: "14:00",
    eventEndTime: "16:00",
  },
  {
    id: 3,
    name: "David Lee",
    role: "Backend Engineer",
    company: "Amazon",
    topic: "Serverless Architecture",
    eventTitle: "Building Scalable Cloud Solutions",
    eventDate: "2024-09-25",
    eventStartTime: "11:00",
    eventEndTime: "13:00",
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "Data Scientist",
    company: "Netflix",
    topic: "Recommendation Algorithms",
    eventTitle: "Personalizing User Experience with AI",
    eventDate: "2024-10-02",
    eventStartTime: "15:00",
    eventEndTime: "17:00",
  },
  {
    id: 5,
    name: "Michael Brown",
    role: "DevOps Engineer",
    company: "Microsoft",
    topic: "Continuous Integration and Deployment",
    eventTitle: "Streamlining Software Delivery",
    eventDate: "2024-10-08",
    eventStartTime: "09:00",
    eventEndTime: "11:00",
  },
  {
    id: 6,
    name: "Jessica Taylor",
    role: "Product Manager",
    company: "Salesforce",
    topic: "Agile Product Development",
    eventTitle: "From Idea to Launch: Agile Methodologies",
    eventDate: "2024-10-15",
    eventStartTime: "13:00",
    eventEndTime: "15:00",
  },
  {
    id: 7,
    name: "Robert Wilson",
    role: "Cybersecurity Specialist",
    company: "IBM",
    topic: "Ethical Hacking",
    eventTitle: "Securing Systems Through Penetration Testing",
    eventDate: "2024-10-22",
    eventStartTime: "10:00",
    eventEndTime: "12:00",
  },
  {
    id: 8,
    name: "Lisa Garcia",
    role: "Mobile App Developer",
    company: "Uber",
    topic: "Cross-Platform Development",
    eventTitle: "Building Efficient Mobile Apps",
    eventDate: "2024-10-28",
    eventStartTime: "14:00",
    eventEndTime: "16:00",
  },
  {
    id: 9,
    name: "Thomas Anderson",
    role: "Blockchain Developer",
    company: "Ethereum Foundation",
    topic: "Smart Contract Security",
    eventTitle: "Building Secure Decentralized Applications",
    eventDate: "2024-11-05",
    eventStartTime: "11:00",
    eventEndTime: "13:00",
  },
  {
    id: 10,
    name: "Olivia Martinez",
    role: "Technical Writer",
    company: "GitHub",
    topic: "API Documentation",
    eventTitle: "Best Practices in Technical Writing",
    eventDate: "2024-11-12",
    eventStartTime: "15:00",
    eventEndTime: "17:00",
  },
  {
    id: 11,
    name: "Olivia Martinez",
    role: "Technical Writer",
    company: "GitHub",
    topic: "API Documentation",
    eventTitle: "Best Practices in Technical Writing",
    eventDate: "2024-11-12",
    eventStartTime: "15:00",
    eventEndTime: "17:00",
  },
];

function App() {
  const [openWebinarForm, setOpenWebinarForm] = useState(false);
  const [webinarFormData, setWebinarFormData] = useState({});
  const [eventData, setEventData] = useState(dummyData);
  const handleCloseForm = () => setOpenWebinarForm(false);

  const handleSaveWebinar = (newWebinarData) => {
    const index = eventData.findIndex((item) => item.id === newWebinarData.id);
    const tmpdata =
      index === -1
        ? [...eventData, newWebinarData]
        : eventData.map((item, i) => (i === index ? newWebinarData : item));

    setEventData(tmpdata);
  };

  return (
    <div className="App">
      <Header
        setOpenWebinarForm={setOpenWebinarForm}
        setWebinarFormData={setWebinarFormData}
      />
      <MainContent
        eventData={eventData}
        setEventData={setEventData}
        setOpenWebinarForm={setOpenWebinarForm}
        setWebinarFormData={setWebinarFormData}
      />
      <WebinarFormModal
        open={openWebinarForm}
        handleClose={handleCloseForm}
        handleSave={handleSaveWebinar}
        webinarFormData={webinarFormData}
      />
    </div>
  );
}

export default App;
