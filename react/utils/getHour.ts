interface Options {
  timestamp: number;
  timezone: string;
  locale: string;
}

export default function getHour({ timestamp, timezone, locale }: Options) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timezone: timezone
  };
  
  const hour = new Intl.DateTimeFormat(locale, options).format(timestamp);

  return hour
}