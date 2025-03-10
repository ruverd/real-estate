import { differenceInDays, isValid, parseISO } from 'date-fns';

export const DAYS_THRESHOLD = 30;

export const isPropertyNew = (listedDate: string): boolean => {
  try {
    const parsedListedDate = parseISO(listedDate);

    console.log('parsedListedDate', parsedListedDate);
    console.log('isValid', isValid(parsedListedDate));
    
    if (!isValid(parsedListedDate)) {
      return false;
    }
    
    const daysDifference = differenceInDays(new Date(), parsedListedDate);

    console.log('daysDifference', daysDifference);
    
    return daysDifference <= DAYS_THRESHOLD;
  } catch {
    return false;
  }
};