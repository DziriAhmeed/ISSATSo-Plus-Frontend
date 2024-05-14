"use client";
import DocumentCard from "@/app/ui/doc";
import FileInput from "@/app/ui/inputfile";

export default function Documents   () {
    
        const handleDelete = () => {
          // Handle delete action here
          console.log('Document deleted');
        }
    const handleFileSelect = (file: File) => {
        console.log('Selected file:', file);
        // Do something with the selected file
      };
      
    return (
        <div className="flex flex-col">
            <FileInput />
            <div className="bg-gray-300 ">
                <DocumentCard name="TP 1" onDelete={handleDelete}/>
                <DocumentCard name="TP 2" onDelete={handleDelete}/>
                <DocumentCard name="TP 3" onDelete={handleDelete}/>

            </div>
            
        </div>
    )
    }