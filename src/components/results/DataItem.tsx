import React from 'react';

interface DataItemProps {
  label: string;
  children: React.ReactNode; 
}

export const DataItem: React.FC<DataItemProps> = ({ label, children }) => {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <div>{children}</div>
    </div>
  );
};