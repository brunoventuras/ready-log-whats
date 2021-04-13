import fs from 'fs';

function Leitor() {

  const { products, filePath } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}


export async function getStaticProps() {
  
  const data = await fs.readFile('../archive/whats-082.txt', 'utf-8')
  
  return {
    props: {
      products: data,
    },
  };
  
}

export default Leitor;

// export async function getStaticProps(context) {
//   const fs = require('fs/promises'); // LOOK HERE

//   const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
//   const fileData = await fs.readFile(filePath);
//   const data = JSON.parse(fileData);

//   return {
//     props: {
//       products: data.products,
//     },
//   };
// }


