import React, { useState } from "react";
import { useEffect } from "react";
const Todo = () => {
  const [data, setdata] = useState(null);
  const [task, setTask] = useState("");
  const [date, setdate] = useState('')
  const [addData, setaddData] = useState(false);
  const HandleSubmit = async () => {
    // console.log(task)
    let ele = document.getElementsByName("prio");
    // for Radio Button value
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        var Priority = ele[i].value;
      }
    }
    //  console.log(a)
    // for Submit Date
    let date = new Date();
    let d = date.getDay();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    let fullDate = y + "-" + m + "-" + d;
    // console.log(fullDate);
    // post taskData  to Api
    const taskData = { Priority, task, fullDate, date };
    fetch("http://localhost:9000/Data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    }).then(() => {
      alert("Your Task Has Been added Successfully");
      setaddData(true);
      setTask("");
      setdate("")
    });
  };
  // fetch to get data
  const getData = async () => {
    const url = " http://localhost:9000/Data";
    const res = await fetch(url);
    const resJson = await res.json();
    setdata(resJson);
  };
  // For Removing Task
  const handleRemove = (id) => {
    const url = " http://localhost:9000/Data/" + id;
    fetch(url, {
      method: "DELETE",
    }).then(() => {
      setaddData(false);
      getData();
    });
  };
  

  useEffect(() => {
    getData();
    setaddData(false);
  }, [addData]);
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-10">
              <div className="card">
                <div className="card-header p-3">
                  <h5 className="mb-0">
                    <i className="fas fa-tasks me-2"></i>TODO List
                  </h5>
                </div>
                <div
                  className="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{
                    position: "relative",
                    height: "400px",
                    overflowY: "scroll",
                  }}
                >
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Date To Do</th>
                        <th scope="col">Task</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((currElm) => {
                          return (
                            <tr className="fw-normal" key={currElm.id}>
                              <td className="align-middle">
                                <span>{currElm.fullDate} / {currElm.date.slice(0, 10)}</span>
                              </td>
                              <td className="align-middle">
                                <span>{currElm.task}</span>
                              </td>
                              <td className="align-middle">
                                <h6 className="mb-0">
                                  <span className="badge bg-warning">
                                    {currElm.Priority}
                                  </span>
                                </h6>
                              </td>
                              <td className="align-middle">
                                <button
                                  className="btn btn-sm text-danger bg-light"
                                  onClick={() => {
                                    handleRemove(currElm.id);
                                  }}
                                >

                                  <i>Remove</i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer text-end p-3">
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Add Task
                  </button>

                  {/* Modal  */}
                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            Add Your Task
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Task
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Your Task"
                              value={task}
                              onChange={(e) => {
                                setTask(e.target.value);
                              }}
                            />
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Target Date
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Your Target Date"
                              value={date}
                              onChange={(e) => {
                                setdate(e.target.value);
                              }}
                            />
                            <div className="form-check my-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="prio"
                                id="flexRadioDefault1"
                                value={"High priority"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                              >
                                High Priority
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="prio"
                                id="flexRadioDefault1"
                                value={"Low priority"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                              >
                                Low Priority
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={HandleSubmit}
                          >
                            Add TODO list
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Todo;
