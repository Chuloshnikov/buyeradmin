import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Spinner";


const NBUCurrencyExchange = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  console.log(exchangeRates);

  useEffect(() => {
    // Функція для здійснення запиту до API
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`
        );
        setExchangeRates(response.data);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    // Запускаємо функцію запиту при завантаженні компоненту
    fetchExchangeRates();
  }, []);

  // Перевіряємо, чи вдалося отримати курси валют перед їх виведенням
  if (!exchangeRates) {
    return (
        <div className='flex items-center justify-center mb-5'>
            <Spinner/>
        </div>
    );
  }

  function trimToTwoDecimals(number) {
    return Math.floor(number * 100) / 100;
  }

  return (
    <div 
    className='border border-orange-500 w-[250px] rounded-md shadow-md'
    >
        <div
        className='m-4 text-center'
        >
            <h3 className='text-gray-800 text-lg font-bold mb-1 px-1'> NBU exchange rate up to UAH:</h3>
            <ul className="text-base font-semibold flex flex-col gap-5">
                <li
                className="flex justify-around"
                >
                    <span>PLN:</span> 
                    <span>{trimToTwoDecimals(exchangeRates[32].rate)}</span>
                </li>
                <li
                className="flex justify-around"
                >
                    <span>USD:</span> 
                    <span>{trimToTwoDecimals(exchangeRates[24].rate)}</span>
                </li>
                <li
                className="flex justify-around"
                > 
                    <span>EUR:</span> 
                    <span>{trimToTwoDecimals(exchangeRates[31].rate)}</span>
                </li>
                <li
                className="flex justify-around"
                >
                    <span>GBP:</span> 
                    <span>{trimToTwoDecimals(exchangeRates[23].rate)}</span>
                </li>
            </ul>
        </div>
      
    </div>
  );
};

export default NBUCurrencyExchange;