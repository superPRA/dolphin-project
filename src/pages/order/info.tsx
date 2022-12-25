import TableDataComponenet from "../../componenets/ordering/tableDataComponenet";
import Navbar from "../../componenets/ordering/navbar";
import MapInfo from "../../componenets/ordering/mapInfo";

type Props = {};

export default function Info({}: Props) {
  const dinnerTime: string = "17:00 تا 22:30";
  const launchTime: string = "11:30 تا 17:00";
  const date = new Date();
  const weekDay = date.getDay();
  const hour = date.getHours();
  const minut = date.getMinutes();
  const time: number = hour * 100 + minut;
  const componentWeekDayList = [6, 0, 1, 2, 3, 4, 5];
  const daysOfWeeks = [
    "یک شنبه",
    "دو شنبه",
    "سه شنبه",
    "چهار شنبه",
    "پنج شنبه",
    "جمعه",
    "شنبه",
  ];
  const foodName = [
    "فست فود",
    "کافی شاپ",
    "پیتزا",
    "ساندویچ",
    "ایتالیایی",
    "مرغ سوخاری",
  ];
  return (
    <div className="lg:col-span-8 col-span-12 lg:mr-20">
      <Navbar />
      <div className="border-[1px] border-gray-300 bg-white">
        <div className="grid grid-cols-12 pt-12 mb-6 border-b border-b-gray-300">
          <div className="lg:col-span-6 col-span-12 px-4">
            <h1 className="text-center text-2xl text-red-600">
              ساعات سرویس دهی
            </h1>
            <table className="w-full mt-6 ">
              <thead className="border-b border-b-black">
                <tr>
                  <th></th>
                  <th>صبحانه</th>
                  <th>ناهار</th>
                  <th>شام</th>
                </tr>
              </thead>
              <tbody>
                {componentWeekDayList.map((item) => {
                  return (
                    <TableDataComponenet
                      componentWeekDay={item}
                      dinnerTime={dinnerTime}
                      launchTime={launchTime}
                      time={time}
                      weekDay={weekDay}
                      key={item}
                      dayOfWeek={daysOfWeeks[item]}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <h1 className="text-center text-2xl text-red-600">نوع غذا</h1>
            <ul className="mt-8 text-center">
              {foodName.map((item) => {
                return (
                  <li className="border border-gray-300 rounded-full w-fit py-2 px-4 m-1 text-sm inline-block mx-auto">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <MapInfo />
      </div>
    </div>
  );
}
