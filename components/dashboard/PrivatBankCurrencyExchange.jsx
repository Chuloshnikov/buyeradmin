import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Spinner";

const PrivatBankCurrencyExchange = () => {
    const [exchangeRates, setExchangeRates] = useState(null);
  console.log(exchangeRates);

  useEffect(() => {
        axios.get(`/api/privatbank`).then(response => {
            setExchangeRates(response.data);
          });
  }, []);

  // Перевіряємо, чи вдалося отримати курси валют перед їх виведенням
  if (!exchangeRates) {
    return (
      <div
      className='border border-orange-500 w-[250px] rounded-md shadow-md'
      >
          <h3 className='text-gray-800 text-lg font-bold mb-1 px-1'> PrivatBank exchange rate up to UAH:</h3>
          <div className='flex items-center justify-center mb-5'>
            <Spinner/>
        </div>
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
          <h3 className='text-gray-800 text-lg font-bold mb-1 px-1'> PrivatBank exchange rate up to UAH:</h3>
            <ul className="text-base font-semibold flex flex-col gap-5">
              {exchangeRates.map(currency => (
                <li 
                className="flex justify-between"
                >
                  <div>
                    {currency.base_ccy}/{currency.ccy}:
                  </div>
                  <div>
                    <div className="flex gap-2">
                      <span>buy:</span>
                      <span>{(trimToTwoDecimals(currency.buy)).toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>sale:</span>
                      <span>{trimToTwoDecimals(currency.sale).toFixed(2)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default PrivatBankCurrencyExchange