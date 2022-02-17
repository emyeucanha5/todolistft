import React from "react";
import { useGlobalContext } from "./context";
import Update from "./update";
import {GrCheckbox , GrCheckboxSelected} from "react-icons/gr";

const Todolist = () => {
    const {
        bulkref,
        displayList,
        display,
        handleDetail,
        handleRemove,
        Done,
        searchEngine,
    } = useGlobalContext();
    return(
        <>
            <div id="Todolist" className="Border">
            <h2 className="header">To Do List</h2>
            <div className="form">
              <input placeholder="Search..." className="title" onChange={(e) => searchEngine(e)}/>
              <div className="item-container">
              {displayList.map((item, index)=> {
                  return (
                    <div key={index}>
                        <div className="item" >
                            {
                            item.done?<GrCheckboxSelected id="check"/>:    
                            <GrCheckbox  id="check"/>
                            }
                            <p>{item.title}</p>
                            <button id="Detail-btn" onClick={(e) => handleDetail(e,item._id)} className="small-btn">Detail</button>
                            <button id="Remove-btn" onClick={(e) => handleRemove(e,item._id)} className="small-btn">Remove</button>
                        </div>
                        {item._id === display && <Update item={item} />}
                    </div>
                   )
                            
                    })}
                    
                    </div>
                    </div>
                    <div className="bulkAction" ref={bulkref}>
                    <p id="bulk">Bulk Action:</p>
                    <button id="Done" onClick={(e) => Done(e,display)}>Done/Undone</button>
                    <button id= "Remove" onClick={(e) => handleRemove(e,display)}>Remove</button>
                    </div>
                </div>
                </>
    )
}

export default Todolist;