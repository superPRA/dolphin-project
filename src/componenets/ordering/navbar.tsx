import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className='flex justify-start items-center mt-10 relative top-[1px] z-[2]'>
        <NavLink to='/order' end  className='px-4 py-2 text-lg hover:text-red-600 transition-all w-full bk2:w-auto text-center'>منو غذا</NavLink>
        <NavLink to="order/info" className='px-4 py-2 text-lg hover:text-red-600 transition-all w-full bk2:w-auto text-center'>اطلاعات رستوران</NavLink>
    </div>
  )
}