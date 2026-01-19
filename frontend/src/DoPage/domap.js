import React, { useState } from 'react';
import './domap.css';
import DopageMap from './showmap';
import { ReactComponent as Closer } from '../components/images/closer.svg';
import { dopositions } from './showmap';
import Bell from '../HelpPage/bell';

const SearchBar = ({ onSearchChange }) => {
  return (
    <div className="search">
      <div className='searchbox'>
        <Closer />
        <input 
          type="text" 
          placeholder="Search By Name or Location" 
          onChange={e => onSearchChange(e.target.value)} 
        />
      </div>
    </div>
  );
};

const Dopage = () => {
  const [search, setSearch] = useState('');
  const [showOnlyNotified, setShowOnlyNotified] = useState(false);

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
  };
  
  const handleNotificationClick = (showOnlyNotified) => {
    setShowOnlyNotified(showOnlyNotified);
  };

  return (
    <div className='screen'>
      <div className="top-controls">  
        <SearchBar onSearchChange={handleSearchChange} />
        <Bell 
          dopositions={dopositions} 
          onNotificationClick={handleNotificationClick} 
          showOnlyNotified={showOnlyNotified}
          setShowOnlyNotified={setShowOnlyNotified}
        />
      </div>
      <DopageMap search={search} showOnlyNotified={showOnlyNotified}/>
    </div>
  );
};

export default Dopage;
