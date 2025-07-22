import React, { useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import CategoriesComp from "./CategoriesComp";
import { CDBDataTable } from "cdbreact";

function UpcomingEvent() {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/admin/getUpcomingEvents");
      const datas = await response.json();
      setData(datas.upcomingEvents);
    } catch (error) {
      setData([]);
      console.log("Fetch Upcoming Events Error:", error);
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    fetchData();
  }, []);

  var formattedData = [];
  if (data.length > 0) {
    formattedData = data?.map((data) => ({
      eventId: data._id,
      eventName: data.eventName,
      artistId: data.artistId,
      category: data.category,
      pricePerSeat: data.pricePerSeat,
      totalSeats: data.totalSeats,
      date: new Date(data.datetime).toLocaleDateString(),
      time: new Date(data.datetime).toLocaleTimeString(),
    }
    ));
  }

  return (
    <>
      <div className="container-scroller">
        <Sidebar />
        <div className="container-fluid page-body-wrapper">
          <Header />
          {/* partial */}
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <CategoriesComp />
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title"> Upcoming Event Table</h4>
                      <div className="table-responsive">
                        {/* <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>EventId</th>
                              <th>ArtistId</th>
                              <th>Category</th>
                              <th>Price</th>
                              <th>Total Seats</th>
                              <th>Date</th>
                              <th>Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>01</td>
                              <td>01</td>
                              <td>music event</td>
                              <td>100 rs</td>
                              <td />
                              <td>11 january</td>
                              <td>11 pm</td>
                            </tr>
                          </tbody>
                        </table> */}
                        {
                          !isLoaded ? (
                            <div>Loading...</div>
                          ) : (
                            <CDBDataTable
                              striped
                              hover
                              responsive
                              entriesOptions={[5, 20, 25]}
                              entries={5}
                              pagesAmount={4}
                              exportToCSV
                              order={["Date", "asc"]}
                              data={{
                                columns: [
                                  { label: "Event ID", field: "eventId" },
                                  { label: "Event Name", field: "eventName" },
                                  { label: "Artist ID", field: "artistId" },
                                  { label: "Category", field: "category" },
                                  { label: "Price Per Seat", field: "pricePerSeat" },
                                  { label: "Total Seats", field: "totalSeats" },
                                  { label: "Date", field: "date", },
                                  { label: "Time", field: "time" },
                                ],
                                rows: formattedData,
                              }}
                            />
                          )
                        }
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
