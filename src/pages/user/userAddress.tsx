import React from 'react'

type Props = {}

export default function UserAddress({}: Props) {
  return (
    <div>
        <h1 className='text-center mt-12 text-3xl text-neutral-700 font-semibold'>لیست آدرس های من</h1>
        <div className='text-center mt-12 text-neutral-600'>
            <h2>آدرسی ثبت نشده است.</h2>
        </div>
        <button className='border-red-600 border rounded px-5 py-2 block mx-auto mt-12 hover:bg-red-600 hover:text-white transition-all' >افزودن ادرس</button>
    </div>
  )
}