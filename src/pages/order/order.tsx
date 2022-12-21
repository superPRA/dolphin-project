import React from 'react'
import FoodNav from '../../componenets/ordering/foodNav'
import FilterInput from '../../componenets/ordering/filterInput'
import Foods from '../../componenets/ordering/foods'

type Props = {}

export default function Order({}: Props) {
  return (
    <div>
      <FoodNav />
      <FilterInput />
      <Foods />
    </div>
  )
}
