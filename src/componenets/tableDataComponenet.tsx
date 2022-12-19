import React from "react";

type Props = {
    componentWeekDay:number
    weekDay: number,
    launchTime:string,
    dinnerTime:string
    time:number
    dayOfWeek: string
};

export default function TableDataComponenet({weekDay, launchTime, dinnerTime, time, componentWeekDay, dayOfWeek}: Props) {
  return (
    <tr
      className={
        weekDay === componentWeekDay
          ? "border-b-2 border-dashed border-b-gray-300"
          : "border-b border-dashed border-b-gray-300"
      }
    >
      <td>{dayOfWeek}</td>
      <td>-</td>
      <td className={time > 1130 && time < 1700 && weekDay === componentWeekDay ? "text-red-600":""}>{launchTime}</td>
      <td className={time > 1700 && time < 2330 && weekDay === componentWeekDay ? "text-red-600":""}>{dinnerTime}</td>
    </tr>
  );
}
