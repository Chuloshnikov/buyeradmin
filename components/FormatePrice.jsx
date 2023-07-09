import React from 'react';


const FormatePrice = ({amount}) => {
    const formatedAmount = new Number(amount).toLocaleString("uk-UA", {
        style: "currency",
        currency:"UAH",
        minimumFractionDigits: 2
    })


  return (
    <span>{formatedAmount}</span>
  )
}

export default FormatePrice;