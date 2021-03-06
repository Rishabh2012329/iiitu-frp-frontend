import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import SecondaryInput from "../../components/SecondaryInput";
import AppLayout from "./AppLayout";

const initState = {
  org: "",
  designation: "",
  from: "",
  to: "",
  salary: "",
  natureOfDuties: "",
  doc: "",
  appId: "",
};

export default function AcadExp() {
  const [state, setState] = useState(initState);
  const { appId } = useParams();
  const alert = useAlert();
  
  console.log(appId);
  const resetForm = () => {
    let form = document.querySelector("#acadexpform");
    form.reset();
    setState(initState);
  };

  const onFileChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0] });
  };

  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  
  const onSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    for(let [key, value] of Object.entries(state)) {
      data.append(key, value);
    }

    axios
      .post(`/applications/${appId}/acadexp`, data, {
      })
      .then((res) => {
        alert.success(res.data.msg);
        resetForm();
      }).catch(err => {
        alert.error(err.response?.data.msg)
        if(err.response?.data.errors) {
          err.response?.data.errors.map(e => alert.error(e.message))
        }
      })
  };

  return (
    <AppLayout>
      <div className="flex justify-around mb-2 p-3 border">
        <Link to={`/dashboard/application/acadexp/${appId}`}>
          <button className="border-b-4 border-black p-2 text-white font-bold bg-indigo-600">Academic Experience</button>
        </Link>
        <Link to={`/dashboard/application/indexp/${appId}`}>
          <button className="border-b-4 p-2 text-white font-bold bg-indigo-600">Industry Experience</button>
        </Link>
      </div>
      <form id="acadexpform" onSubmit={onSubmit}>
        <div className="editor w-screen mb-10 w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <h1 className="text-2xl text-indigo-600 mb-4">Academic Experience</h1>
          <label htmlFor="org" className="text-sm mb-1">
            University / Organisation<span className="text-red-500">*</span>
          </label>
          <SecondaryInput
            onChange={onChangeHandler}
            id="org"
            name="org"
            type="text"
            value={state.org}
            required={true}
            placeholder={"University / Organisation"}
          />

          <label htmlFor="designation" className="text-sm mb-1">
            Designation<span className="text-red-500">*</span>
          </label>
          <SecondaryInput
            onChange={onChangeHandler}
            id="designation"
            name="designation"
            type="text"
            value={state.designation}
            required={true}
            placeholder={"Designation"}
          />

          <label htmlFor="from" className="text-sm mb-1">
            From <span className="text-red-500">*</span>
          </label>
          <SecondaryInput
            onChange={onChangeHandler}
            id="from"
            name="from"
            type="month"
            value={state.from}
            required={true}
            placeholder={"From"}
          />

          <label htmlFor="to" className="text-sm mb-1">
            To <span className="text-red-500">*</span>
          </label>
          <SecondaryInput
            onChange={onChangeHandler}
            id="to"
            name="to"
            type="month"
            value={state.to}
            required={true}
            placeholder={"To"}
          />

          <label htmlFor="salary" className="text-sm mb-1">
            Monthly Salary<span className="text-red-500">*</span>
          </label>
          <SecondaryInput
            onChange={onChangeHandler}
            id="salary"
            name="salary"
            type="number"
            min="0"
            value={state.salary}
            required={true}
            placeholder={"Salary"}
          />

          <label htmlFor="natureOfDuties" className="text-sm mb-1">
            Nature Of Duties<span className="text-red-500">*</span>
          </label>
          <SecondaryInput
            onChange={onChangeHandler}
            id="natureOfDuties"
            name="natureOfDuties"
            type="text"
            value={state.natureOfDuties}
            required={true}
            placeholder={"Nature Of Duties"}
          />

          <label htmlFor="doc" className="text-sm mb-1">
            NOC/Experience<span className="text-red-500">*</span>
          </label>
          <SecondaryInput
            onChange={onFileChangeHandler}
            id="doc"
            name="doc"
            type="file"
            required={true}
          />

          <div className="buttons flex mt-8">
            <div
              onClick={resetForm}
              className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
            >
              Reset
            </div>
            <div className="">
              <button
                className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-white ml-2 bg-indigo-600"
                type={"submit"}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}
