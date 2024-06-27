import fs from 'fs';
import path from 'path';
import Content from './content';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  return res.json();
}

const Page = () => {
  // const imagePath = path.join(
  //   process.cwd(),
  //   'public',
  //   'images',
  //   'VascularImage',
  //   'UpperLimbVenousDuplex.jpg'
  // );

  // const data = await getData();
  console.log('22222222222, Server');

  // const data = await fs.readFileSync(imagePath).toString('base64');

  // // console.log('SERVER', data.slice(0, 20));

  return (
    <div>
      Server Component
      {/* {children} */}
    </div>
  );
};

export default Page;
