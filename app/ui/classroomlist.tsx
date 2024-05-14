import React from 'react';

interface Classroom {
  label: string;
  value: string;
}

interface AvailableClassrooms {
  [building: string]: Classroom[];
}

interface Props {
  availableClassrooms: AvailableClassrooms;
}

const ClassroomList: React.FC<Props> = ({ availableClassrooms }) => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Available Classrooms</h2>
      {Object.keys(availableClassrooms).map((building, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-md font-semibold mb-2">{building}</h3>
          <div className="grid grid-cols-2 gap-4">
            {availableClassrooms[building].map((classroom, idx) => (
              <div key={idx} className="bg-gray-100 p-2 rounded-md">
                <p className="text-sm font-medium">{classroom.label}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassroomList;
