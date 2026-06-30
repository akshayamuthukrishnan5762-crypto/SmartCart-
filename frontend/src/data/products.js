
import riceImg from "../assets/rice.jpeg";

import milkImg from "../assets/milk.jpeg";
import breadImg from "../assets/bread.jpeg";

const products = [
  {
    id: 1,
    name: "Rice",
    price: 50,
    image: riceImg,
    description: "Premium quality rice for daily cooking.",
    discount:20,
  },
  {
    id: 2,
    name: "Milk",
    price: 30,
    image: milkImg,
    description: "Fresh and healthy cow milk.",
     discount:15,
  },
  {
    id: 3,
    name: "Bread",
    price: 40,
    image: breadImg,
    description: "Soft and fresh bakery bread.",
    discount:10,
  },
];

export default products;