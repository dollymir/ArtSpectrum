import React, { useState } from "react";

function CategoriesComp() {
    const [data, setData] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/getCategories");
            const datas = await response.json();
            setData(datas.categories);
        } catch (error) {
            setData([]);
            console.log("Fetch Categories Error:", error);
        } finally {
            setIsLoaded(true);
        }
    };

    useState(() => {
        window.scrollTo(0, 0, { behavior: "smooth" });
        fetchData();
    });

    return (
        <>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Event Category Table</h4>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Category ID</th>
                                        <th>Categories</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoaded
                                        ? data.map((item) => {
                                            return (
                                                <tr>
                                                    <td>{item._id}</td>
                                                    <td>{item.category}</td>
                                                </tr>
                                            );
                                        })
                                        : "Loading..."}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoriesComp;
