import moment from 'moment';

export const UtcConvert = () => {
  // Get current local date and time
  const dateInEgypt = new Date();

  const timezoneOffsetInEgypt = dateInEgypt.getTimezoneOffset();

  const utcDate = new Date(
    dateInEgypt.getTime() - timezoneOffsetInEgypt * 60000,
  );

  const dateTime = moment(
    dateInEgypt.getTime() - timezoneOffsetInEgypt * 60000,
  );

  const formattedDateTime = dateTime.format('YYYY-MM-DD HH:mm:ss');

  return formattedDateTime;
  //   console.log('Formatted Date and Time:', formattedDateTime);
  //   console.log(
  //     'UTC Date and Time:',
  //     utcDate.toISOString(),
  //     timezoneOffsetInEgypt,
  //   );
};
