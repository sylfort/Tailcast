import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const NasaAPI = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [apodData, setApodData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchApod = async (date) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`, {
          params: {
            api_key: 'YOUR_NASA_API_KEY',
            date: date.toISOString().split('T')[0], // format as YYYY-MM-DD
          },
        });
        setApodData(response.data);
      } catch (error) {
        setError('Failed to fetch APOD data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchApod(selectedDate);
    }, [selectedDate]);
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      fetchApod(date);
    };
  
    return (
        <div className="relative w-screen flex flex-col justify-center ">
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : apodData ? (
            <div className="relative w-screen h-screen flex justify-center ">
            <h2>{apodData.title}</h2>
            <p>{apodData.date}</p>
            <img className="object-contain w-4/5 2xl:w-[1200px] mx-auto absolute z-10 rounded-xl custom-border-gray hero-dashboard-border-gradient lg:top-6 xl:top-0" src={apodData.url} alt={apodData.title} />
            {/* <p>{apodData.explanation}</p> */}
          </div>
        ) : null}
      </div>
    );
  };