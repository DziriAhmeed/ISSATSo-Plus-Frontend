"use client";
import List from "@/app/ui/list";
import AdminStudentList from "@/app/ui/list/adminstudentlist";
import SelectList from "@/app/ui/selectlist";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StudentList() {
    const classes = [{value:"1",label:"ing a1-01"},{value:"2",label:"ING A2-01"},{value:"3",label:"ING A2-02"}  ];
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if(selectedClass){
            axios.get('http://localhost:3001/users', { params: { classId: selectedClass } })
                .then((res) => setStudents(res.data.map((student: { fullName: any; }) => student.fullName)))
                .catch((err) => console.log(err));
        }
    }, [selectedClass]);

    
    return (
        <div>
            <SelectList values={classes} onChange={(value)=>setSelectedClass(value)}/>
            <AdminStudentList listName="Student List" students={students} />
        </div>
    )
}