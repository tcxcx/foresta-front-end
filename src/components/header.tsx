import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LocalSwitcher from './local-switcher';

export default function Header() {
  const t = useTranslations('Navigation');

  return (
    <header className='p-4 z-10'>
      <nav className='flex items-center justify-between'>
        <Link href='/' className='font-violet uppercase hover:underline hover:text-green-500'>{t('home')}</Link>
        <Link href='/'><h1 className='font-clash text-5xl uppercase hover:text-green-500'> 🟩Foresta</h1></Link>
        <LocalSwitcher />
      </nav>
    </header>
  );
}