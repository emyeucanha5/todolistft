
import React from "react";


import { useGlobalContext } from "./context";
const Update = ({item}) => {


    const {
        update,
        handleUpdate,
        handleUpdateSubmit,
    } = useGlobalContext();
    return(
    <div id="NewTask" className="Border">
        <div className="form">
            <input 
            placeholder={item.title}
            className="title"
            name="title"
            onChange={(e)=>handleUpdate(e)}
            value={update.title}
            />


            <h4 className="text">Description</h4>

            <textarea 
            className="detail"
            placeholder={item.description}
            name="description"
            onChange={(e)=>handleUpdate(e)}
            value={update.description}
            ></textarea>

            <div className="option">
                <div>
                    <h4 className="text">Due Date</h4>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        placeholder={item.date}
                        onChange={(e)=>handleUpdate(e)}
                        onFocus = {(e) => {
                            e.currentTarget.type = "date";
                        }}
                        onBlur = {(e) => {
                            e.currentTarget.type = "text"
                        }}
                    />
                </div>

                <div>
                    <h4 className="text">Priority</h4>
                    <select
                        id="priority"
                        value={update.priority}
                        name="priority"
                        onChange={(e)=>handleUpdate(e)}
                    >
                        <option value={"low"}>low</option>
                        <option value={"normal"}>normal</option>
                        <option value={"high"}>high</option>
                    </select>
                </div>  

            </div>

            <button id="submit" onClick={(e) => handleUpdateSubmit(e,item._id)} type="submit" className="subm">Update</button>     
        </div>
    </div>
    )
}

export default Update;