import "./App.css";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import Spinner from "react-bootstrap/Spinner";
const App = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      const response = await fetch("https://demo2211087.mockable.io/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {},
      });
      if (response.status === 200) {
        const data = await response.json();
        setCompanies(data.companies);
      } else {
        setCompanies(["Error"]);
      }
    };
    try{
      getCompanies();
    }
    catch(e){
      setCompanies(["Error"]);
    }
  }, []);

  return (
    <div className="container pt-5">
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {companies[0] === "Error" && (
            <tr>
              <td colSpan={4} className="text-center">
                Error
              </td>
            </tr>
          )}

          {companies.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </td>
            </tr>
          )}

          {companies.length !== 0 &&
            companies[0] !== "Error" &&
            companies.map((data, index) => {
              return (
                <tr key={index + 1}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.name}</td>
                  <td className="color-blue">{data.email}</td>
                  <td>{data.status}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default App;
