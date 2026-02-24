import LectureItem from "./LectureItem";

export default function LectureComponent({ lectures }) {
  return (
    <div>
      {lectures.map((lecture) => (
        <LectureItem key={lecture._id} lecture={lecture} />
      ))}
    </div>
  );
}