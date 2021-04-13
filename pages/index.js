



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