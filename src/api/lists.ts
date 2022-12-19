//[index: string]: { [index: string]: string }[]

interface list {
  foodNav: { img: string; title: string; link: string }[];
  foods: {
    img: string;
    ingridient: string;
    priceText: string;
    price: number;
    type: string;
    title: string;
    exist: boolean;
  }[];
}

const list: list = {
  foodNav: [
    {
      img: "https://www.delino.com/img/general/cats/icon-pizza.png",
      title: "پیتزا امریکایی(خمیرضخیم)",
      link: "americanPizza",
    },
    {
      img: "https://www.delino.com/img/general/cats/icon-pizza.png",
      title: "پیتزا ایتالیایی(خمیرنازک)",
      link: "italianPizza",
    },
    {
      img: "https://www.delino.com/img/general/cats/icon-pizza.png",
      title: "پیتزا 2 نفره",
      link: "doublePizza",
    },
    {
      img: "https://www.delino.com/img/general/cats/icon-hotdog.png",
      title: "ساندویچ ایتالیایی",
      link: "italianSandwich",
    },
    {
      img: "https://www.delino.com/img/general/cats/icon-appetizer.png",
      title: "چیپس و پنیر",
      link: "chipsAndCheeze",
    },
    {
      img: "https://www.delino.com/img/general/cats/icon-burger.png",
      title: "همبرگر",
      link: "hamberger",
    },
    {
      img: "https://www.delino.com/img/general/cats/icon-sandwich.png",
      title: "ساندویچ",
      link: "sandwich",
    },
    {
      img: "https://www.delino.com/img/general/cats/icon-chickenstrips.png",
      title: "سوخاری",
      link: "fried",
    },
    {
      img: "https://www.delino.com/img/general/cats/icon-salad.png",
      title: "پیش غذا",
      link: "appetizer",
    },
    {
      img: "https://www.delino.com/img/general/cats/icon-beverage.png",
      title: "نوشیدنی ها",
      link: "drinks",
    },
  ],
  foods: [
    {
      img: "https://www.delino.com/img/general/food-default.jpg",
      ingridient: "خمیر،سس مخصوص ، پنیر",
      priceText: "60,000",
      price: 60000,
      type: "پیتزا امریکایی(خمیرضخیم)",
      title: "پیتزا پنیر ضخیم",
      exist: true,
    },
    {
      img: "https://static.delino.com/Image/Restaurant/Food/p1pw3hke.5ya_560x350.jpg",
      ingridient:
        "ژامبون گوشت ، ژامبون مرغ، قارچ ، فلفل دلمه، زیتون سیاه ، پنیر، سس",
      priceText: "112,000",
      price: 112000,
      type: "پیتزا امریکایی(خمیرضخیم)",
      title: "پیتزا سوپریم",
      exist: true,
    },
    {
      img: "https://static.delino.com/Image/Restaurant/Food/auqf4smz.3t2_560x350.jpg",
      ingridient:
        "تکه های سینه مرغ کبابی (گریل) ، گوجه ، قارچ ، زیتون سیاه ، پنیر ، سس",
      priceText: "109,000",
      price: 109000,
      type: "پیتزا امریکایی(خمیرضخیم)",
      title: "پیتزا ماجیک",
      exist: true,
    },
  ],
};
export default list;
