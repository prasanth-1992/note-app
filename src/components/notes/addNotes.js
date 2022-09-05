import { React, useState } from "react";
import axios from 'axios'
import { API_URL } from "../constant";

const AddNote = (props) => {

  const [input, setInput] = useState({
    Title: '',
    Content: ''
  })

  const saveNote = async () => {
    const { data } = await axios.post(`${API_URL}/Notes`, {
      Title: input.Title,
      Content: input.Content
    })
    if (data) {
      props.getData(data)
    }

  }

  return (
    <div className="">
      <div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control w-80" placeholder="Enter Title"
            value={input.Title} onChange={(e) => setInput({ ...input, Title: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea className="form-control w-80" rows="3" placeholder="Enter Content"
            value={input.Content} onChange={(e) => setInput({ ...input, Content: e.target.value })} />
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-outline-success float-right text-right" onClick={saveNote}>Add Notes</button>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
