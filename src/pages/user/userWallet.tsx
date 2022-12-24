import React from "react";

type Props = {};

export default function UserWallet({}: Props) {
  return (
    <div>
      <h1 className="text-center text-4xl pt-20 ">کیف پول</h1>
      <div className="border rounded-full mx-auto w-fit px-6 py-3 mt-6">
        کیف پول:0 تومان
      </div>
      <h2 className="text-center text-neutral-700 mt-12">
        مبلغ مورد نظر خود را مشخص و از طریق درگاه بانکی حسابتان را شارژ کنید.
      </h2>
      <div className="w-fit mx-auto mt-6">
        <button className="border border-red-600 border-l-0 bg-red-600       transition text-white       md:px-6 px-3 py-2 rounded-r">10000</button>
        <button className="border border-red-600 border-l-0 hover:bg-red-600 transition hover:text-white md:px-6 px-3 py-2">20000</button>
        <button className="border border-red-600 border-l-0 hover:bg-red-600 transition hover:text-white md:px-6 px-3 py-2">50000</button>
        <button className="border border-red-600 border-l-0 hover:bg-red-600 transition hover:text-white md:px-6 px-3 py-2">100000</button>
        <button className="border border-red-600            hover:bg-red-600 transition hover:text-white md:px-6 px-3 py-2 rounded-l">مبلق دلخواه</button>
      </div>
      <button className="bg-red-600 text-white rounded py-3 px-6 block mx-auto mt-12">شارژ کیف پول</button>
      <h2 className="text-center text-xl font-semibold text-neutral-700 mt-12">گذارش تراکنش ها</h2>
      <h3 className="text-center text-neutral-600 mt-12">گذارشی واسه نمایش وجود نذارد</h3>
    </div>
  );
}
