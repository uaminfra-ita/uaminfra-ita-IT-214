export const COURSE_TIME_ZONE = 'America/Sao_Paulo';

export function courseDateKey(value = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: COURSE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

export function isEligibleUpcoming(activity, today) {
  return activity.status === 'scheduled' && activity.type !== 'break' && activity.date >= today;
}

export function nextScheduledActivity(activities, today = courseDateKey(), predicate = () => true) {
  return activities
    .filter((activity) => isEligibleUpcoming(activity, today) && predicate(activity))
    .sort((a, b) => a.date.localeCompare(b.date))[0] || null;
}

export function isActivityPast(activity, today = courseDateKey()) {
  return activity.status === 'completed' || activity.date < today;
}
