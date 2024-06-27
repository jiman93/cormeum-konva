import fs from 'fs';
import path from 'path';
import Content from './content';
import ServerComponent from './serverComponent';

const Page = async () => {
  const imagePath = path.join(
    process.cwd(),
    'public',
    'images',
    'VascularImage',
    'UpperLimbVenousDuplex.jpg'
  );
  // console.log('image path', imagePath);

  const data = await fs.readFileSync(imagePath).toString('base64');

  // console.log('SERVER', data.slice(0, 20));

  return (
    <>
      <Content />
    </>
  );
};

export default Page;
