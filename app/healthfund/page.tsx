import { healthfundList } from 'lib/actions';
import _ from 'lodash';
import HealthfundListing, { DataType } from './listing';

interface HealthFund {
  id: 'string';
  name: 'string';
  phone: {
    region: 'string';
    input: 'string';
  };
  email: 'string';
  ep_company_id: 'string';
  removed: true;
}

const Healthfund = async () => {
  const data = await healthfundList({});

  const transformedData: DataType[] = data?.result.entries.map((obj: DataType) => {
    return _.mapKeys(obj, (value, key) => {
      return _.camelCase(key);
    });
  });

  return <HealthfundListing data={transformedData} />;
};

export default Healthfund;
