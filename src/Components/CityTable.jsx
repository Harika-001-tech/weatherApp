import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiSearch,BiCurrentLocation } from "react-icons/bi";

//city table
const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // API call to fetch cities data
  const fetchCities = async (page) => {
    const response = await axios.get(
      `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=20&start=${page * 20}&q=${searchTerm}`
    );
    return response.data.records.map((city) => ({
      name: city.fields.name,
      country: city.fields.cou_name_en,
      timezone: city.fields.timezone,
    }));
  };

  useEffect(() => {
    loadCities(page);
  }, [page]);

  useEffect(() => {
    const newFilteredCities = cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(newFilteredCities);
  }, [searchTerm, cities]);

  const loadCities = async (page) => {
    const newCities = await fetchCities(page);
    setCities((prev) => [...prev, ...newCities]);
    if (newCities.length === 0) setHasMore(false);
  };

  
  // Infinite scroll observer
  const lastCityElementRef = useRef();
  const lastCityObserver = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  // Sorting handler
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedCities = [...filteredCities].sort((a, b) => {
    if (a[sortConfig?.key] < b[sortConfig?.key]) {
      return sortConfig?.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig?.key] > b[sortConfig?.key]) {
      return sortConfig?.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
 
  return (
    <div className="container mx-auto p-4">
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4 mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700'>
      <input
        type="text"
        placeholder="Search for a city"
        className="mb-4 border rounded text-gray-500 text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <BiSearch 
      size={30}
      className="cursor-pointer transition ease-out hover:scale-125"
      />
      <BiCurrentLocation
      size={30}
      className="cursor-pointer transition ease-out hover:scale-125"
      />
      </div>
      <table className="min-w-full table-auto">
        <thead className="min-w-full table-auto">
          <tr>
            <th
              onClick={() => handleSort('name')}
              className="cursor-pointer"
            >
              City
            </th>
            <th
              onClick={() => handleSort('country')}
              className="cursor-pointer"
            >
              Country
            </th>
            <th
              onClick={() => handleSort('timezone')}
              className="cursor-pointer text-center"
            >
              Timezone
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCities.map((city, index) => (
            <tr
              key={index}
              ref={index === sortedCities.length - 1 ? lastCityObserver : null}
            >
              <td>
                <Link to={`/weather/${city.name}`}>{city.name}</Link>
              </td>
              <td>{city.country}</td>
              <td>{city.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!hasMore && <div>No more cities to load</div>}
    </div>
  );
};

export default CityTable;
