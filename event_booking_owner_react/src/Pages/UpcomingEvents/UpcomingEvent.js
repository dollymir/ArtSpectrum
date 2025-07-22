import React, { useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import { CDBDataTable } from "cdbreact";
import axios from "axios";
import { Link } from "react-router-dom";
import CategoriesComp from "./CategoriesComp";

function UpcomingEvent() {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/artist/getUpcomingEvents");
      console.log(response.data);
      setData(response.data.upcomingEvents);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      setData([]);
    } finally {
      setIsLoaded(true);
    }
  }
  useEffect(() => {

    fetchData();
  }, []);

  function deleteEvent(id) {
    axios
      .post("http://localhost:8000/artist/deleteEvent", {
        eventId: id,
      })
      .then((response) => {
        alert(response.data.message);
        fetchData();
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  }

  var formattedData = [];
  if (data.length > 0) {
    formattedData = data?.map((data) => ({
      eventName: data.eventName,
      category: data.category,
      pricePerSeat: data.pricePerSeat,
      totalSeats: data.totalSeats,
      availableSeats: data.availableSeats,
      date: new Date(data.datetime).toLocaleDateString(),
      time: new Date(data.datetime).toLocaleTimeString(),
      action: (
        <>
          <Link to={`/editEvent`} state={{ eventData: data }}>
            <button className="btn btn-info btn-sm">Edit</button>
          </Link>{" "}
          &nbsp;
          <button className="btn btn-danger btn-sm" onClick={() => deleteEvent(data._id)}>Delete</button>
        </>
      ),
    }));
  }

  return (
    <>
      <div className="container-scroller">
        <Sidebar />
        <div className="container-fluid page-body-wrapper">
          <Header />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <CategoriesComp />
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Upcoming Event Table</h4>
                      <div className="table-responsive">
                        {!isLoaded ? (
                          <div>Loading...</div>
                        ) : data.length === 0 ? <div>No data found</div> : (
                          <CDBDataTable
                            style={{ textAlign: "center" }}
                            striped
                            hover
                            noRecordsFoundLabel="No events found"
                            responsive
                            entriesOptions={[5, 20, 25]}
                            entries={5}
                            pagesAmount={4}
                            data={{
                              columns: [
                                { label: "Event Name", field: "eventName" },
                                { label: "Category", field: "category" },
                                { label: "Price Per Seat", field: "pricePerSeat" },
                                { label: "Total Seats", field: "totalSeats" },
                                { label: "Available Seats", field: "availableSeats" },
                                { label: "Date", field: "date" },
                                { label: "Time", field: "time" },
                                { label: "Action", field: "action" },
                              ],
                              rows: formattedData,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default UpcomingEvent;
