import dateFormat from "dateformat";

export const toMinutes = (timeInSeconds: number) => {
  return timeInSeconds / 60;
};

export const dateNow = (date = new Date()) => {
  return dateFormat(date, "mmmm dS, yyyy");
};

export const daysFromDay = (days: number, day = new Date()) => {
  const utcDay = day.getUTCDate();
  const utcMonth = day.getUTCMonth();
  const utcYear = day.getUTCFullYear();
  const daysFromNow = new Date(utcYear, utcMonth, utcDay + days);
  return daysFromNow;
};

/**
 * YYYY-MM-DD
 */
export const dateToDashedString = (day = new Date(), useHumanTime?: boolean) => {
  const utcDay = day.getUTCDate();
  const utcMonth = day.getUTCMonth();
  const utcYear = day.getUTCFullYear();
  return `${utcYear}-${useHumanTime ? utcMonth + 1 : utcMonth}-${utcDay}`;
};


export const dashedStringToDate = (date: string) => {
  const year = parseInt(date.slice(0,4));
  const month = parseInt(date.slice(5,7));
  const day = parseInt(date.slice(8,10));

  return new Date(year, month, day);
};

export const getStartOfWeek = () => {
  type weekDay = typeof weekDays;
  const weekDays = { 'Sun': 0, 'Mon': -1, 'Tue': -2, 'Wed': -3, 'Thu': -4, 'Fri': -5, 'Sat': -6 };
  const date = new Date();
  const day = date.toDateString().slice(0,3);
  const offset = weekDays[(day as keyof weekDay)];
  const sunday = daysFromDay(offset);
  return sunday;
};

export const getPrettyDate = (date: Date) => {
  let pretty = date.toDateString().slice(4);
  pretty = pretty.slice(0,6) + ',' + pretty.slice(6);
  return pretty;
};

type dateType = {
  year: number,
  month: number,
  day: number,
};
export const getDate = ({year, month, day}: dateType) => {
  return new Date(year, month - 1, day);
};

export const weekData = { 
  'Sun': { offset: 0 }, 
  'Mon': { offset: -1}, 
  'Tue': { offset: -2},
  'Wed': { offset: -3}, 
  'Thu': { offset: -4},
  'Fri': { offset: -5}, 
  'Sat': { offset: -6},
};

export const monthData: {
  [key: string]: {
    days: number;
};
} = {
  'jan': { days: 31 },
  'feb': { days: (() => { 
    const now = new Date();
    const lastDayofFebruary = new Date(now.getUTCFullYear(), 2, 0);
    return lastDayofFebruary.getDate();})()},
  'mar': { days: 31 },
  'apr': { days: 30 },
  'may': { days: 31 },
  'jun': { days: 30 },
  'jul': { days: 31 },
  'aug': { days: 31 },
  'sep': { days: 30 },
  'oct': { days: 31 },
  'nov': { days: 30 },
  'dec': { days: 31 },
};

export type period = {
  begMonth: string;
  begYear: number;
  endMonth: string;
  endYear: number;
};
export const getMonthsBegEndPair: (period: period) => [Date, Date][] = ({begMonth, begYear, endMonth, endYear}: period) => {
  const monthsBegEndPair: [Date, Date][] = [];

  if (endYear < begYear){
    throw new Error(`end year cannot be greater than begin year`);
  }

  // fast retrieval
  const months = [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ];
  [begMonth, endMonth].forEach((month) => {
    if (!months.includes(month.toLowerCase())){
      throw new Error(`${month} is not a valid month`);
    }
  });

  if (begYear == endYear){
    const remainingMonths = months.slice(months.indexOf(begMonth));
    if (!remainingMonths.includes(endMonth)){
      throw new Error(`${endMonth} is earlier than ${begMonth}`);
    }
  }

  let startMonth = begMonth;
  let startYear = begYear;
  while(startYear <= endYear){
    let state = true;
    while(state){
      const startDate = getDate({ year: startYear, month: months.indexOf(startMonth) + 1, day: 1 });
      const endDate = daysFromDay(monthData[startMonth].days, startDate);
      const monthPair: [Date, Date] = [startDate, endDate];
    
      monthsBegEndPair.push(monthPair);

      if (startMonth == 'dec'){
        state = false;
      }else {
        state = startYear == endYear ? startMonth !== endMonth : true;
      }
      startMonth = nextMonth(startMonth, months);
    }
    startYear++;
  }

  return monthsBegEndPair;
};

export const nextMonth = (month: string, monthArray: string[]) => {
  const monthPosition = monthArray.indexOf(month);
  const lastMonth = monthArray.length - 1;
  if (monthPosition == lastMonth){
    return monthArray[0];
  }
  return monthArray[monthPosition + 1];
};

// console.log(
//   getMonthsBegEndPair({
//     begMonth: 'jan',
//     begYear: 2021,
//     endMonth: 'mar',
//     endYear: 2022,
//   })
// );
// const monthsBegs: Date[] = (
//   () => {
//     let begs = []
//     for (let i = 1; i < 13; i ++){
//       begs.push(getDate({ year: 2021, month: i, day: 1 }));
//     }
//     return begs;
//   }
// )();

// export const mongBegEndPair = monthsBegs.map((day, index) => {
//   const end = daysFromDay(monthData[Object.keys(monthData)[index]].days, day);
//   return [ day.toDateString(), end.toDateString() ];
// });

export const timeDifferenceInSeconds = (beginDate: Date, endDate = new Date()) => {
  return Math.floor((endDate.getTime() - beginDate.getTime()) / 1000);
};
