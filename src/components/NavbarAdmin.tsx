import search from '../assets/icons/search.png'
import avatar from '../assets/icons/avatar.png'

const NavbarAdmin = () => {

  return (
    <div className='flex items-center justify-between p-4 dark:bg-dark dark:text-white'>
      <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
        <img src={search} alt='' width={14} height={14} />
        <input type='text' placeholder='Search...' className='w-[200px] p-2 bg-transparent outline-none' />
      </div>
      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='flex flex-col'>
          <span className='text-sm leading-3 font-medium'>Admin</span>
          <span className='text-[10px] text-gray-500 text-right'>Online</span>
        </div>
        <img src={avatar} alt='' width={36} height={36} className='rounded-full' />
      </div>
    </div>
  )
}

export default NavbarAdmin
