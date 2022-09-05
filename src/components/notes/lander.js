import React, { useEffect,useState } from "react";
import axios from 'axios'
import AddNote from "./addNotes";
import ViewNote from "./viewNotes";
import { API_URL } from "../constant";

const Lander = () => {

  const [viewData, setViewData] = useState([])

  useEffect(()=>{
    fetchData()
  },[])

  const savedData = (data) => {
    // setViewData(old => [...old, data])
    fetchData()
  }

  const fetchData=async()=>{
    const {data} = await axios.get(`${API_URL}/Notes`)
    setViewData(data)
  }

  return (
    <div className="container-flex m-4">
      <div className="mb-3">
        <AddNote getData={savedData} />
      </div>
      <div className="m-3">
        <ViewNote data={viewData}/>
      </div>
    </div>
  );
}

export default Lander;