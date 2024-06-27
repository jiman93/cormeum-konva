import { configList } from 'lib/actions';
import _ from 'lodash';
import ConfigListing, { DataType } from './listing';

const Config = async () => {
  const data = await configList({});

  const transformedData: DataType[] = data?.result.entries.map((obj: DataType) => {
    return _.mapKeys(obj, (value, key) => {
      return _.camelCase(key);
    });
  });

  return <ConfigListing data={transformedData} />;
};

export default Config;
