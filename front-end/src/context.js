import React, { useState, useContext, useEffect } from 'react'
import { useRef } from "react";
import axios from "axios"

const AppContext = React.createContext();

const map1 = {
    low: 1,
    normal: 2,
    high: 3,
}
const AppProvider = ({ children }) => {
    const bulkref = useRef(0);
    const [display, setDisplay] = useState(null);
    const [inp, setInp] = useState({
        title: "",
        description: "",
        date: "",
        priority: "normal",
    });
    const [update, setUpdate] = useState({
        title: "",
        description: "",
        date: "",
        priority: "normal",
    });
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);
    const [displayList, setDisplaylist] = useState([]);
    useEffect(
        () => {
          const tmpList = list.sort((v1,v2) => {
            if(v1.dateValue > v2.dateValue) return 1;
            if(v1.dateValue < v2.dateValue) return -1;     
            if(v1.priorityNumber < v2.priorityNumber) return 1;
            if(v1.priorityNumber > v2.priorityNumber) return -1;
        });
        setList(tmpList);
          if(!search){
              setDisplaylist(tmpList);
          }
        },[list])
    useEffect(
        () => {
            if(!search){ 
                setDisplaylist(list);
            }else{
                const tmpList = list.filter(item => item.title.toLowerCase().startsWith(search.toLocaleLowerCase())==true);
                setDisplaylist(tmpList);
            }
        }
    ,[list])
    useEffect(
        () => {
            if(!search){ 
                setDisplaylist(list);
            }else{
                const tmpList = list.filter(item => item.title.toLowerCase().startsWith(search.toLocaleLowerCase())==true);
                setDisplaylist(tmpList);
            }
        }
    ,[search]);
    const setDefault = () => {
        setInp({
            title: "",
            description: "",
            date: "",
            priority: "normal",
        })
        setDisplay(null);
        bulkref.current.style.display = "none";
    }
    const fetchAPI = async() => {
        try {
            const {data} = await axios.get('/api/v1/tasks');
            setList(data.tasks);
            console.log(data.tasks);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(
        ()=>{
            fetchAPI();
        }
    ,[]);
    const searchEngine = (e) => {
        const val = e.target.value;
        setSearch(val);
    }
    const handleChange = (e) =>{
        const prop = e.target.name;
        const val = e.target.value;
        setInp({...inp, [prop]: val});
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();    
        if(!inp.title){
            alert("Please enter a name for task");
            setDefault();
            return 0;
        }else if(!inp.date){
            alert("Please enter a specific deadline for this task");
            setDefault();
            return 0;
        }else if(inp.date){
            let tempDate = new Date();
            const dateinfo = inp.date.split('-');
            const year = Number(dateinfo[0]);
            const month =  Number(dateinfo[1]);
            const day =  Number(dateinfo[2]);
            const newDate = new Date(year, month, day);
            if(year - tempDate.getFullYear() > 100){
                alert("Invalid deadline (more than 100 years)");
                setDefault();
                return 0;
            }
            if(tempDate>newDate){
                alert("Invalid deadline ( it must be after today )");
                setDefault();
                return 0;
            }
            let tmp = {
                title: inp.title,
                description: inp.description,
                date: inp.date,
                priority: inp.priority,
                dateValue: newDate.getTime(),
                priorityNumber: map1[inp.priority],
                done: false,
            };
            try{
                await axios.post('/api/v1/tasks', tmp);
                setList([...list,tmp]);
            }catch(error){
                console.log(error);
            }
            setDefault();
        }       
       
    }
    const handleRemove = async(e,id) => {
        e.preventDefault();
        try{
            await axios.delete(`/api/v1/tasks/${id}`);
            const tmp = list.filter(item => item._id !== id );
            setList(tmp);
        }catch(error){
            console.log(error);
        }
    }
    const handleDetail = async(e,id) => {
        e.preventDefault();
        if(!display || display !== id){
            try{
                const data = await axios.get(`/api/v1/tasks/${id}`);
                setUpdate(data);
            }catch(error){
                console.log(error);
            }
            setDisplay(id);
            bulkref.current.style.display = "grid";            
        }else if(display === id){
            setDefault();
        }
    }
    const handleUpdate = (e) => {
        const prop = e.target.name;
        const val = e.target.value;
        setUpdate({...update, [prop]: val});
    }
    const handleUpdateSubmit = async(e,id) => {
        e.preventDefault(); 
        if(!update.title){
            alert("Please enter a name for task");
            setUpdate({
                title: "",
                description: "",
                date: "",
                priority: "normal",
            });
            return 0;
        }else if(!update.date){
            alert("Please enter a specific deadline for this task");
            setUpdate({
                title: "",
                description: "",
                date: "",
                priority: "normal",
            });
            return 0;
        }else if(update.date){
            let tempDate = new Date();
            const dateinfo = update.date.split('-');
            const year = Number(dateinfo[0]);
            const month =  Number(dateinfo[1]);
            const day =  Number(dateinfo[2]);
            const newDate = new Date(year, month, day);
            if(year - tempDate.getFullYear() > 100){
                alert("Invalid deadline (more than 100 years)");
                setUpdate({
                    title: "",
                    description: "",
                    date: "",
                    priority: "normal",
                });
                return 0;
            }
            if(tempDate>newDate){
                alert("Invalid deadline ( it must be after today )");
                setUpdate({
                    title: "",
                    description: "",
                    date: "",
                    priority: "normal",
                });
                return 0;
            }
        try{
            const item = list.filter(item => item._id === id);

            const data = await axios.patch(`/api/v1/tasks/${id}`, {
                title: update.title,
                date: update.date,
                priority: update.priority,
                description: update.description,
                dateValue: newDate.getTime(),
                done: false,
                priorityNumber: map1[update.priority],
            });
        }catch(error){
            console.log(error);
        }finally{
            setDefault();
            fetchAPI();
        }

    }
    }
    const Done = async(e, id) => {
        e.preventDefault(); 
        const tmp = list.filter(item => item._id === id);
        console.log(tmp[0].done);
        try {
            const data = await axios.patch(`/api/v1/tasks/${id}`, {
                done: !tmp[0].done
            });
        } catch (error) {
            console.log(error);
        } finally{
            setDefault();
            fetchAPI();
        }
    }
    


	return <AppContext.Provider value={{
        ...inp,
        update,
        list,
        bulkref,
        display,
        displayList,
        handleChange,
        handleSubmit,
        handleRemove,
        handleUpdateSubmit,
        handleUpdate,
        Done,
        handleDetail,
        searchEngine,

	}}>
	  {children}
  	</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }