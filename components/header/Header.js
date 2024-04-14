import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  const headerMenu = [
    {
      id : 1,
      name : "Ride",
      icon : '/taxi.jpeg'
    },
    {
      id : 2,
      name : "Package",
      icon : "/box.jpeg"
    }
  ]
  return (
    <div className='p-4 pb-3 border-b-[4px] pl-10 border-gray-200 flex justify-between items-center'>
      <div className='flex gap-20 items-center'>
        <Image src="/logo.png" width={70} height={70}/>
        <div className='flex gap-6 items-center'>
          {headerMenu.map((item,i)=>
            <div className='flex gap-2 items-center'>
              <Image src={item.icon} width={17} height={17} alt='logo'/>
              <h2 className='text-14px font-medium'>{item.name}</h2>
            </div>
        )}
        </div>
      </div>
      <UserButton/>
    </div>
  )
}

export default Header