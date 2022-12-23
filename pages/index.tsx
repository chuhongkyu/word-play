import HeadComponent from "components/Head";
import { useState } from "react";
import { $data } from "utils/word-play";

export default function Home() {
  const [data, setData] = useState($data);
  return (
    <>
      <HeadComponent />
      <div>어서오세요. 환영합니다.</div>
    </>
  );
}
