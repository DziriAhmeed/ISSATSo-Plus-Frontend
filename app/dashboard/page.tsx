import AdminStack from "../ui/admin-stack";
import CardEmpty from "../ui/card";
import NewsHeader from "../ui/newsheader";
import Card from "../ui/stack";
import StudentStack from "../ui/student-stack";
import TeacherStack from "../ui/teacher-stack";

export default function Dashboard   () {
    return (
        <div className="flex flex-col">
            <NewsHeader/>
            
            <div className="flex flex-col items-center md:flex-row">
                <Card/>
                <CardEmpty/>
            </div>
        </div>
    )
}