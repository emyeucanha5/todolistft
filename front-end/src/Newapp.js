import React from "react";
import { useGlobalContext } from "./context";

 
const Newapp = () => {
    const {
        title,
        description,
        date,
        priority,
        handleChange,
        handleSubmit,

    } = useGlobalContext();
    return(
        <>
            <div id="NewTask" className="Border">
            <h2 className="header">New Task</h2>
            <form className="form">
              <input 
              placeholder="Add new task..."
              className="title"
              name="title"
              onChange={(e)=>handleChange(e)}
              value={title}
              required/>
              <h4 className="text">Description</h4>
              <textarea 
              className="detail"
              name="description"
              onChange={(e)=>handleChange(e)}
              value={description}
              ></textarea>
              <div className="option">
                <div>
                  <h4 className="text">Due Date</h4>
                  <input
                   type="text"
                   id="date"
                   name="date"
                   placeholder={`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`}
                   onChange={(e)=>handleChange(e)}
                   onFocus = {(e) => {
                       e.currentTarget.type = "date"
                   }}
                   onBlur = {(e) => {
                       e.currentTarget.type = "text"
                   }}
                   value={date}
                    />
                </div>
                <div>
                  <h4 className="text">Priority</h4>
                  <select
                    id="priority"
                    value={priority}
                    name="priority"
                    onChange={(e)=>handleChange(e)}
                   >
                    <option value={"low"}>low</option>
                    <option value={"normal"}>normal</option>
                    <option value={"high"}>high</option>
                  </select>
                </div>  
              </div>
              <button id="submit" onClick={(e) => handleSubmit(e)} type="submit" className="subm">Add</button>     
            </form>
          </div>
        </>
    )
}

export default Newapp;