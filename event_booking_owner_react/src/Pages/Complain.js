import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { CDBDataTable } from "cdbreact";

function Complain() {

  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/admin/getComplaint");
      const data = await response.json();
      setData(data.complaint);
    } catch (error) {
      console.log(error);
      setData([]);
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
      artistId: data.artistId,
      userId: data.userId,
      subject: data.subject,
      messages: data.message,
      status: data.status,
      date: new Date(data.timestamp).toLocaleDateString(),
      time: new Date(data.timestamp).toLocaleTimeString(),
    }
    ));
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
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Complaint Table</h4>
                      <div className="table-responsive">
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
                              data={{
                                columns: [
                                  { label: "Artist ID", field: "artistId" },
                                  { label: "User ID", field: "userId" },
                                  { label: "Subject", field: "subject" },
                                  { label: "Message", field: "messages" },
                                  { label: "Status", field: "status" },
                                  { label: "Date", field: "date" },
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

export default Complain;
