import React from 'react'
import FoodNav from '../componenets/foodNav'
import FilterInput from '../componenets/filterInput'
import Foods from '../componenets/foods'

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
