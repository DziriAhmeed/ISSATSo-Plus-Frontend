import React from 'react';

interface DocumentCardProps {
  name: string;
  onDelete: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ name, onDelete }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between mx-4 my-2">
        <h2 className="text-lg font-semibold mr-4">{name}</h2>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    );
  };

export default DocumentCard;
