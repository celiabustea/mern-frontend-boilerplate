import React from 'react';
import Input from '../atoms/Input/Input';
import Button from '../atoms/Button';

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button 
        type="submit"
        label="Search"
      />
    </form>
  );
};

export default SearchBar;