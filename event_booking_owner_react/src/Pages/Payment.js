import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { CDBDataTable } from "cdbreact";
import axios from "axios";

function Payment() {

  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/artist/getPayments");
        console.log(response.data);
        setData(response.data.payments.reverse());
      } catch (error) {
        console.log(error);
        setData([]);
      } finally {
        setIsLoaded(true);
      }
    }

    fetchData();
  }, []);

  var formattedData = [];
  if (data.length > 0) {
    formattedData = data?.map((data) => ({
      paymentId: data._id,
      // bookingId: data.bookingId,
      userId: data.userId,
      payments: data.payments,
      status: data.status,
      date: new Date(data.date).toLocaleDateString(),
      time: new Date(data.date).toLocaleTimeString(),
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
                      <h4 className="card-title">Payment Table</h4>
                      <div className="table-responsive">
                        {
                          !isLoaded ? (
                            <div>Loading...</div>
                          ) : data.length === 0 ? <div>No data found</div> : (
                            <CDBDataTable
                              striped
                              hover
                              responsive
                              entriesOptions={[5, 20, 25]}
                              entries={5}
                              pagesAmount={4}
                              data={{
                                columns: [
                                  { label: "Payment ID", field: "paymentId", },
                                  // { label: "Booking ID", field: "bookingId" },
                                  { label: "User", field: "userId" },
                                  { label: "Payment Amount", field: "payments" },
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

export default Payment;
