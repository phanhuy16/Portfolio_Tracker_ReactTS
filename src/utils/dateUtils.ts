// src/utils/dateUtils.ts
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale('vi');

// Vietnam timezone
const VIETNAM_TIMEZONE = 'Asia/Ho_Chi_Minh';

/**
 * Format transaction date to ISO string for API
 */
export const formatTransactionDateForAPI = (date: string | Date | Dayjs): string => {
  if (!date) {
    throw new Error('Date is required');
  }

  // Handle different input types
  let dayjsDate: Dayjs;

  if (dayjs.isDayjs(date)) {
    dayjsDate = date;
  } else if (typeof date === 'string') {
    dayjsDate = dayjs(date);
  } else if (date instanceof Date) {
    dayjsDate = dayjs(date);
  } else {
    throw new Error('Invalid date format');
  }

  // Ensure valid date
  if (!dayjsDate.isValid()) {
    throw new Error('Invalid date');
  }

  // Convert to Vietnam timezone and return ISO string
  return dayjsDate.tz(VIETNAM_TIMEZONE).toISOString();
};

/**
 * Format date for display in Vietnamese format
 */
export const formatTransactionDateDisplay = (date: string | Date | Dayjs): string => {
  if (!date) return '';

  const dayjsDate = dayjs(date).tz(VIETNAM_TIMEZONE);
  return dayjsDate.format('DD/MM/YYYY HH:mm');
};

/**
 * Format date for display with day name
 */
export const formatTransactionDateWithDay = (date: string | Date | Dayjs): string => {
  if (!date) return '';

  const dayjsDate = dayjs(date).tz(VIETNAM_TIMEZONE);
  return dayjsDate.format('dddd, DD/MM/YYYY HH:mm');
};

/**
 * Format date for short display
 */
export const formatTransactionDateShort = (date: string | Date | Dayjs): string => {
  if (!date) return '';

  const dayjsDate = dayjs(date).tz(VIETNAM_TIMEZONE);
  const now = dayjs().tz(VIETNAM_TIMEZONE);

  // If same day, show only time
  if (dayjsDate.isSame(now, 'day')) {
    return dayjsDate.format('HH:mm');
  }

  // If same year, show date without year
  if (dayjsDate.isSame(now, 'year')) {
    return dayjsDate.format('DD/MM HH:mm');
  }

  // Otherwise show full date
  return dayjsDate.format('DD/MM/YY');
};

/**
 * Format date for relative time (e.g., "2 giờ trước")
 */
export const formatTransactionDateRelative = (date: string | Date | Dayjs): string => {
  if (!date) return '';

  const dayjsDate = dayjs(date).tz(VIETNAM_TIMEZONE);
  return dayjsDate.fromNow();
};

/**
 * Parse date from API response
 */
export const parseTransactionDateFromAPI = (dateString: string): Dayjs => {
  return dayjs(dateString).tz(VIETNAM_TIMEZONE);
};

/**
 * Get current date in Vietnam timezone
 */
export const getCurrentVietnamDate = (): Dayjs => {
  return dayjs().tz(VIETNAM_TIMEZONE);
};

/**
 * Format date for date picker (Ant Design compatible)
 */
export const formatDateForPicker = (date: string | Date | Dayjs): Dayjs => {
  if (!date) return getCurrentVietnamDate();

  if (dayjs.isDayjs(date)) {
    return date.tz(VIETNAM_TIMEZONE);
  }

  return dayjs(date).tz(VIETNAM_TIMEZONE);
};

/**
 * Validate if date is in valid range for transactions
 */
export const isValidTransactionDate = (date: string | Date | Dayjs): boolean => {
  if (!date) return false;

  const dayjsDate = dayjs(date);
  const now = getCurrentVietnamDate();
  const minDate = dayjs('2000-01-01'); // Minimum allowed date

  return dayjsDate.isValid() &&
    dayjsDate.isAfter(minDate) &&
    dayjsDate.isBefore(now.add(1, 'day')); // Allow future dates up to tomorrow
};

/**
 * Format date range for API queries
 */
export const formatDateRangeForAPI = (startDate: Dayjs, endDate: Dayjs): [string, string] => {
  const start = startDate.tz(VIETNAM_TIMEZONE).startOf('day').toISOString();
  const end = endDate.tz(VIETNAM_TIMEZONE).endOf('day').toISOString();
  return [start, end];
};

/**
 * Get predefined date ranges
 */
export const getDateRangePresets = () => {
  const now = getCurrentVietnamDate();

  return {
    'Hôm nay': [now.startOf('day'), now.endOf('day')] as [Dayjs, Dayjs],
    'Hôm qua': [
      now.subtract(1, 'day').startOf('day'),
      now.subtract(1, 'day').endOf('day')
    ] as [Dayjs, Dayjs],
    'Tuần này': [now.startOf('week'), now.endOf('week')] as [Dayjs, Dayjs],
    'Tuần trước': [
      now.subtract(1, 'week').startOf('week'),
      now.subtract(1, 'week').endOf('week')
    ] as [Dayjs, Dayjs],
    'Tháng này': [now.startOf('month'), now.endOf('month')] as [Dayjs, Dayjs],
    'Tháng trước': [
      now.subtract(1, 'month').startOf('month'),
      now.subtract(1, 'month').endOf('month')
    ] as [Dayjs, Dayjs],
    '30 ngày qua': [now.subtract(30, 'days'), now] as [Dayjs, Dayjs],
    '90 ngày qua': [now.subtract(90, 'days'), now] as [Dayjs, Dayjs],
    'Năm nay': [now.startOf('year'), now.endOf('year')] as [Dayjs, Dayjs],
  };
};

/**
 * Format date for sorting (YYYY-MM-DD format)
 */
export const formatDateForSorting = (date: string | Date | Dayjs): string => {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * Check if two dates are the same day
 */
export const isSameTransactionDay = (date1: string | Date | Dayjs, date2: string | Date | Dayjs): boolean => {
  if (!date1 || !date2) return false;
  return dayjs(date1).isSame(dayjs(date2), 'day');
};

const dateUtils = {
  formatTransactionDateForAPI,
  formatTransactionDateDisplay,
  formatTransactionDateWithDay,
  formatTransactionDateShort,
  formatTransactionDateRelative,
  parseTransactionDateFromAPI,
  getCurrentVietnamDate,
  formatDateForPicker,
  isValidTransactionDate,
  formatDateRangeForAPI,
  getDateRangePresets,
  formatDateForSorting,
  isSameTransactionDay,
};

export default dateUtils;