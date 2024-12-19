import Logo from '../../assets/images/logo.png';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu';
import NavbarAdmin from '../../components/NavbarAdmin';

export default function AdminLayout() {
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem('user') || '{}').role;

  if (role !== 'admin') {
    navigate('/login');
  }

  return (
    <div className='h-full flex'>
      <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4'>
        <Link to='/admin' className='flex items-center justify-center lg:justify-start gap-2'>
          <img className='cursor-pointer' src={Logo} alt='logo' width={500} height={500} />
        </Link>
        <Menu />
      </div>
      <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] flex flex-col'>
        <NavbarAdmin />
        <Outlet />
      </div>
    </div>
  );
}
