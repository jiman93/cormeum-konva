import { patientList } from 'lib/actions';
import _ from 'lodash';
import BookingList from './listing';

const Booking = async () => {
  const data = await patientList({});

  const transformedData: any = data?.result.entries.map((obj: any) => {
    return _.mapKeys(obj, (value, key) => {
      return _.camelCase(key);
    });
  });

  return <BookingList />;
};

export default Booking;
