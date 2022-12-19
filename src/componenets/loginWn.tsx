import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/app/hooks'
import { setLoginWn } from '../redux/app/features/inputs/inputSlice'

type Props = {}

export default function LoginWn({}: Props) {
    const dispatch = useAppDispatch()
    const loginWnStatus = useAppSelector(state=>state.inp.loginWn)
  return (
    <div className={`fixed bg-black h-screen w-full transition-opacity duration-300 top-0 left-0 ${loginWnStatus?"z-50 bg-opacity-50":"-z-50 bg-opacity-0"} `} onClick={()=>dispatch(setLoginWn(false))}>
        aefdw
    </div>
  )
}