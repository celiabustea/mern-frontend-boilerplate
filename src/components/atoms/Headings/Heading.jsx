import React from 'react';

const Heading = ({ 
  level = 1, 
  children, 
  className = "" 
}) => {
  const Tag = `h${level}`;
  
  return (
    <Tag className={`heading heading-${level} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;