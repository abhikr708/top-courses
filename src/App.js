import React from "react";
import Navbar from "./components/Navbar";
import Filters from "./components/Filters"
import Cards from "./components/Cards";
import Spinner from "./components/Spinner"
import { apiUrl, filterData } from "./data";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const App = () => {

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  // api call to get the cards data
  async function fetchData() {
    setLoading(true);
    try {
      let response = await fetch(apiUrl);
      let output = await response.json();
      setCourses(output.data);
      // console.log(output);
    }
    catch (error) {
      toast.error("Something Wrong occurs");
    }
    setLoading(false);
  }

  // useEffect to fetchData for one time
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar />
      </div>
      <div className="bg-bgDark2">
        <div>
          <Filters filterData={filterData} category={category} setCategory={setCategory} />
        </div>
        <div className="w-11/12 flex flex-wrap max-w-[1200px] mx-auto justify-center items-center min-h-[50vh]">
          {
            loading ? (<Spinner />) : (<Cards courses={courses} category={category} />)
          }
        </div>
      </div>

    </div>
  )
};

export default App;
