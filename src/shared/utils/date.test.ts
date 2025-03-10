
import { addDays, subDays } from 'date-fns';
import { DAYS_THRESHOLD, isPropertyNew } from './date';

const today = new Date();
const todayString = today.toISOString();

describe('Date Utils', () => {  
  it('should return true for a property listed today', () => {

    const result = isPropertyNew(todayString);

    expect(result).toBe(true);
  });
  
  it(`should return true for a property listed ${DAYS_THRESHOLD} days ago`, () => {
    const thirtyDaysAgo = subDays(today, DAYS_THRESHOLD);
    const thirtyDaysAgoString = thirtyDaysAgo.toISOString();

    const result = isPropertyNew(thirtyDaysAgoString);

    expect(result).toBe(true);
  });
  
  it(`should return false for a property listed more than ${DAYS_THRESHOLD} days ago`, () => {
    const thirtyOneDaysAgo = subDays(today, DAYS_THRESHOLD + 1);
    const thirtyOneDaysAgoString = thirtyOneDaysAgo.toISOString();

    const result = isPropertyNew(thirtyOneDaysAgoString);

    expect(result).toBe(false);
  });
  
  it('should return false for future dates', () => {
    const tomorrow = addDays(today, 2);
    const tomorrowString = tomorrow.toISOString();

    const result = isPropertyNew(tomorrowString);

    expect(result).toBe(true);
  });
  
  it('should handle invalid date strings', () => {
    const result = isPropertyNew('invalid-date');

    expect(result).toBe(false);
  });
});
