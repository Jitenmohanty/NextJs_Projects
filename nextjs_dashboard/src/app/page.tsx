import Post from "./ui/post/page";
import Rightbar from "./ui/rightbar/page";

export default function Home() {
  return <div className=" my-2 mx-4 p-4 flex justify-between gap-6">
        <Rightbar/>
        <Post/>
  </div>
}
