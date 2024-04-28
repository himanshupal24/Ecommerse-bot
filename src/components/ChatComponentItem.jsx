import { format } from "date-fns";
import Slider from "./Slider";

const getTime = (timestamp) => {
  return format(new Date(timestamp), "hh:mm:ss a");
};

const images = [
  {
    title: "t1",
    image: "down1.webp",
    description: "d1",
  },
  {
    title: "t1",
    image: "down1.webp",
    description: "d1",
  },
  {
    title: "t1",
    image: "down2.webp",
    description: "d1",
  },
  {
    title: "t1",
    image: "down3.webp",
    description: "d1",
  },
  {
    title: "t1",
    image: "image5.webp",
    description: "d1",
  },
  {
    title: "t1",
    image: "image6.webp",
    description: "d1",
  },
  {
    title: "t1",
    image: "image7.webp",
    description: "d1",
  },
  {
    title: "t1",
    image: "image8.webp",
    description: "d1",
  },
  {
    title: "t1",
    image: "image9.webp",
    description: "d1",
  },
  {
    title: "t1",
    image: "image10.webp",
    description: "d1",
  },
];
export default function ChatItem({ data }) {
  if (data.type === "question")
    return (
      <div className="msg right-msg">
        <div className="msg-item">
          <div className="msg-bubble">
            <div
              className="msg-text"
              style={{
                backgroundColor: "#1C1C48",
                color: "white",
                borderTopLeftRadius: "1.5rem",
                borderBottomLeftRadius: "1.5rem",
                borderTopRightRadius: "1.3rem",
              }}
            >
              <p>{data?.value}</p>
            </div>
          </div>
          <span className="msg-time">{getTime(data.createdAt)}</span>
        </div>
      </div>
    );
  else if (data.type === "textAnswer")
    return (
      <div className="msg left-msg">
        <div className="msg-img">
          <img src="https://picsum.photos/100/100" alt="Admin Image" />
        </div>

        <div className="msg-item">
          <span className="msg-time">{getTime(data.createdAt)}</span>

          <div className="msg-bubble">
            <div
              className="msg-text"
              style={{
                borderBottomLeftRadius: "1.3rem",
                borderTopRightRadius: "1.5rem",
                borderBottomRightRadius: "1.5rem",
                backgroundColor: "#F6F5F8",
              }}
            >
              <pre>{data.value}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  else if (data.type === "cardAnswer") return <Slider data={data} />;
}
