import { patientList } from 'lib/actions';
import _ from 'lodash';
import PatientListing, { DataType } from './listing';

const Patient = async () => {
  const data = await patientList({});

  const transformedData: DataType[] = data?.result.entries.map((obj: DataType) => {
    return _.mapKeys(obj, (value, key) => {
      return _.camelCase(key);
    });
  });

  console.log('PATIENT -- PAGE', transformedData);

  return <PatientListing data={transformedData} />;
};

export default Patient;
