import { useState, useEffect } from 'react';


const useFormattedDate = (startDatetime:string) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const newDateForm = new Date(startDatetime);
    // console.log(newDateForm)
    const year = newDateForm.getFullYear().toString().substr(-2);
    const month = (newDateForm.getMonth() + 1).toString().padStart(2, '0');
    const day = newDateForm.getDate().toString().padStart(2, '0');

    const formatted = `${year}.${month}.${day}`;
    setFormattedDate(formatted);
  }, [startDatetime]);

  return formattedDate;
}

export default useFormattedDate