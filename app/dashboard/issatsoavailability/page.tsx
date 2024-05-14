"use client";
import ClassroomList from "@/app/ui/classroomlist";
import SelectList from "@/app/ui/selectlist"
import axios from "axios";
import { useEffect, useState } from "react";


export default function IssatSoAvailability() {
    const days = [{value:"lundi",label:"Monday"},{value:"mardi",label:"Tuesday"},{value:"mercredi",label:"Wednesday"},{value:"jeudi",label:"Thursday"},{value:"vendredi",label:"Friday"},{value:"samedi",label:"Saturday"}]
    const sessions=[{value:"s1",label:"S1"},{value:"s2",label:"S2"},{value:"s3",label:"S3"},{value:"s4",label:"S4"},{value:"s5",label:"S5"},{value:"s6",label:"S6"}]
    const sessions2=[{value:"s1",label:"S1"},{value:"s2",label:"S2"},{value:"s3",label:"S3"},{value:"s4'",label:"S4'"}]

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);
    const [data, setData] = useState(null)

    useEffect(() => {
        if(selectedDay && selectedSession){
            axios.get('https://win-nerkech-api.azurewebsites.net/api/classrooms/available/',{params:{weekday:selectedDay,session:selectedSession}})
                .then((res)=>setData(res.data.available_classrooms))
                .catch((err)=>console.log(err));
        }
    }, [selectedDay,selectedSession,data]);

    return (
        <div>
            <div className="flex gap-4">
            <div>
            <h1>Select A day</h1>
            <SelectList values={days} onChange={(value)=>setSelectedDay(value)}/>
            </div>
            <div><h1>Select A time</h1>
            {selectedDay === 'samedi' ? <SelectList values={sessions2} onChange={(value)=>setSelectedSession(value)}/> : <SelectList values={sessions} onChange={(value)=>setSelectedSession(value)}/>}</div>
            </div>
            {data ? <ClassroomList availableClassrooms={data} /> : <h1></h1>}    
        </div>
    )
}