import { useState } from "react";
import Rate from "./Rate";

function CommentComposer() {
  const [rate, setRate] = useState(0);

  return (
    <div>
      <p className="mb-2">Leave Your Review</p>
      <div>
        <div className="mb-4">
          <label className="text-xs block mb-2">Visit date:</label>
          <input className="rounded-md bg-gray-200 p-1" type="date" />
        </div>
        <div className="mb-4">
          <label className="text-xs block mb-2">Comment:</label>
          <textarea
            className="bg-gray-200 w-full h-24 shadow rounded-md p-2"
            placeholder="Nice restaurant!!"
          />
        </div>
        <div className="mb-4">
          <label className="text-xs block mb-2">Rate:</label>
          <Rate rate={rate} onChange={setRate} editable />
        </div>
        <div>
          <button className="bg-yellow-500 rounded-full px-6 py-2 text-white w-full uppercase font-bold text-sm">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentComposer;
