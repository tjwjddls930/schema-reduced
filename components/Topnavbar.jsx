import React, { useState, useEffect } from "react";

const TopNavbar = () => {
  const [currentDate, setCurrentDate] = useState(null);
  const [temperature, setTemperature] = useState(null);

  // useEffect for handling the <time>
  useEffect(() => {
    setCurrentDate(new Date());
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update the time every 1 second (1000 ms)

    return () => clearInterval(timer); // Cleanup the timer
  }, []);

  // useEffect for handling the <temperature>
  useEffect(() => {
    // Function to fetch the temperature in Cheongju-si (충주시; 쉐마미술관 지역)
    const fetchTemperature = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Cheongju-si,kr&units=metric&APPID=3c2a20050841ca5399a1cd7cb0d0f3cf`
      )
        .then((response) => response.json())
        .then((data) => {
          setTemperature(Math.round(data.main.temp));
        })
        .catch((error) => console.error(error));
    };

    fetchTemperature(); // Fetch the temperature initially

    const temperatureTimer = setInterval(fetchTemperature, 3 * 60 * 60 * 1000); // Update the temperature every 3 hours

    return () => clearInterval(temperatureTimer); // Cleanup the timer
  }, []);

  if (!currentDate) return null; // Return null while currentDate is null to avoid rendering issues

  const optionsDate = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
    timeZone: "Asia/Seoul",
  };
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Seoul",
  };

  const formattedDate = new Intl.DateTimeFormat("ko-KR", optionsDate).format(
    currentDate
  );
  const formattedTimeRaw = new Intl.DateTimeFormat("en-US", optionsTime).format(
    currentDate
  );
  let parts = formattedTimeRaw.split(" "); // split the time and AM/PM
  const formattedTime = `${parts[1]} ${parts[0]}`; // rearrange the order

  return (
    <div className="hidden sm:flex fixed top-3 h-16 w-full z-100 justify-between items-center px-4">
      <img 
        src="/img/schema-logo-NEW.svg"
        alt="logo1"
        className="h-12 w-[150px]"
      />
        <img 
        src="/img/schema-logo.png"
        alt="logo2"
        className="h-12 w-[150px]"
      />
      <div className="flex flex-row space-x-2 text-black mr-4">
          <div className="flex flex-col justify-center items-center">
              <span className="font-bold text-sm">{formattedDate}</span>
              <span className="font-bold text-xl">{formattedTime}</span>
          </div>
          <span className="rounded-lg shadow-md px-4 py-4 text-lg font-bold">{temperature ? `${temperature}°` : "24°"}</span>
      </div>
    </div>
  );
};

export default TopNavbar;