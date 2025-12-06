// src/utils/timeUtils.ts

// Convert total class hours and late threshold % into minutes.
// This version is defensive: if values are missing, it falls back to 0.
export const computeLateThresholdMinutes = (
  totalClassHours?: number,
  latePercent?: number
): number => {
  const hours = typeof totalClassHours === 'number' ? totalClassHours : 0;
  const lp = typeof latePercent === 'number' ? latePercent : 0;
  const totalMinutes = hours * 60;
  return (lp / 100) * totalMinutes;
};

// Safely format "HH:MM" → "08:00 AM" and never crash if input is bad.
export const formatTimeLabel = (timeStr?: string | null): string => {
  if (!timeStr || typeof timeStr !== 'string') {
    return '';
  }

  const parts = timeStr.split(':');
  if (parts.length < 2) {
    return timeStr;
  }

  const hour = parseInt(parts[0], 10);
  const minute = parseInt(parts[1], 10);

  if (isNaN(hour) || isNaN(minute)) {
    return timeStr;
  }

  const suffix = hour >= 12 ? 'PM' : 'AM';
  const normalizedHour = ((hour + 11) % 12) + 1;
  const mm = minute.toString().padStart(2, '0');
  const hh = normalizedHour.toString().padStart(2, '0');

  return `${hh}:${mm} ${suffix}`;
};
