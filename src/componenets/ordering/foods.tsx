import list from "../../api/lists";
import { useAppSelector } from "../../redux/app/hooks";
import FoodBox from "./foodBox";
import uuid from "react-uuid"

type Props = {};

export default function Foods({}: Props) {
  const allOrders = useAppSelector((state) => state.cart.orders);
  const filters = useAppSelector((state) => state.inp.filterInp);
  return (
    <div className=" border-t border-dashed border-gray-400 px-4">
      {list.foodNav.map((item) => {
        const header = item.title;
        const {link} = item
        return (
          <div key={uuid()}>
            <h1 id={link} className="text-2xl text-gray-400 my-10 font-semibold col-span-12">
              {header}
            </h1>
            <div className="grid grid-cols-12 gap-4">
              {allOrders.map((item2) => {
                const {
                  img,
                  ingridient,
                  price,
                  type,
                  title,
                  count,
                  exist
                } = item2;
                if (header === type) {
                  if (!filters.checkExist || item2.exist) {
                    if((!filters.quickSearch) || (filters.quickSearch && item2.title.includes(filters.quickSearch))){
                      return (
                      <FoodBox
                        count={count}
                        title={title}
                        img={img}
                        ingridient={ingridient}
                        price={price}
                        type={type}
                        exist={exist}
                        key={uuid()}
                      />
                    );
                    }
                    return null;
                  }
                  return null;
                }
                return null;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
