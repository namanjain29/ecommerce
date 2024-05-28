// order schema
// {
//     userId: number,
//     orderItems: [
//         {
//             productId: string,
//             quantity: number,
//         }
//     ],
//     discountCode: string,
//     totalBillAmount: number,
//     discount: number,
//     finalBillAmount: number,
//     shippingAddress: {
//         address: string,
//         city: string,
//         postalCode: string,
//         country: string,
//     },
//     paymentMethod: string,
//     status: string,
// }
const orders = [];

// itemsInStore schema
// {
//     id: string,
//     name: string,
//     price: number,
//     countInStock: number,
// }

const items = [
  {
    id: '1',
    name: 'Product 1',
    price: 100,
    countInStock: 10,
  },
  {
    id: '2',
    name: 'Product 2',
    price: 200,
    countInStock: 20,
  },
  {
    id: '3',
    name: 'Product 3',
    price: 300,
    countInStock: 30,
  },
  {
    id: '4',
    name: 'Product 4',
    price: 400,
    countInStock: 40,
  },
  {
    id: '5',
    name: 'Product 5',
    price: 500,
    countInStock: 50,
  },
];

// couponCodes schema
// {
//     code: string,
//     userId: number,
//     status: string,
//     discountPercent: number,
// }
const couponCodes = []


// cart Schema
// { 
//   userId: [
//     {
//       productId: string,
//       quantity: number,
//     }
//   ]
// }

const cart = {};

module.exports = {
  orders,
  items,
  couponCodes,
  cart,
}
