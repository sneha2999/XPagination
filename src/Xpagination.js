import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Xpagination.css";

export default function Xpagination() {
  const [emp, setEmp] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = res.data;
        setEmp(data);
        setPages(Math.ceil(data.length / 10));
      } catch (err) {
        console.error(err);
        alert("failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleNextPage = () => {
    if (currPage < pages) {
      setCurrPage(currPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  const startIndex = (currPage - 1) * 10;
  const endIndex = startIndex + 10;

  const currEmp = emp.slice(startIndex, endIndex);

  return (
    <div className="pagination">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currEmp.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagin">
        <button onClick={handlePreviousPage} disabled={currPage === 1}>
          Previous
        </button>
        <span>
          <div className="curr-page">{currPage}</div>
        </span>
        <button onClick={handleNextPage} disabled={currPage === pages}>
          Next
        </button>
      </div>
    </div>
  );
}