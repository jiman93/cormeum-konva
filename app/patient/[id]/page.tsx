import { patientGet } from 'lib/actions';
import PatientDetails from './details';

const PatientId = async ({ params }: any) => {
  const data = await patientGet(params);
  return (
    <div>
      <PatientDetails data={data} />
    </div>
  );
};

export default PatientId;
