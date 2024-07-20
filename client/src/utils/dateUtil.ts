// src/utils/dateUtils.ts
/*dateUtil for montyly ranking*/

export const getNextMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  };
  
  export const getPreviousMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  };
  
  export const formatMonth = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  };