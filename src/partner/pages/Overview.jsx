import React, { useState } from 'react';
import PartnerHeader from '../components/PartnerHeader';
import { getAuthUser } from '../../client/utils/cookies/AuthCookiesManager';
import { Button } from 'primereact/button';
import { Analytics02Icon, Calendar03Icon, Home11Icon, Money03Icon } from 'hugeicons-react';
import Footer from '../../client/components/global/Footer';
import AetoGrid from '../../globals/ui/AetoGrid';

const user = getAuthUser() || {};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => ({ label: (currentYear - i).toString(), value: currentYear - i }));

const months = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

const Overview = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [data, setData] = useState([]);

  const columns = [
    { label: "Property Name", key: "propertyName" },
    { label: "Rent Earnings", key: "totalEarnings" },
    { label: "Tours", key: "totalTours" },
    { label: "Occupancy level", key: "occupancyLevel" },
  ]

  return (
    <div className='relative h-screen font-sen'>
      <section className='sticky top-0 z-50'>
        <PartnerHeader bottomBorder />
      </section>

      <section className='px-[8vw] py-[2vw] flex justify-between'>
        <article className='font-bold text-lg'>Hello, {user.username}</article>
        <Button className='bg-primary text-white gap-2 font-semibold p-2 text-sm'>
          <Analytics02Icon size={18} />
          Generate report
        </Button>
      </section>

      <section className='px-[8vw] flex justify-between gap-8'>
        <article className='font-bold text-lg flex gap-4 border rounded-lg p-4 items-center flex-1'>
          <Home11Icon className='border rounded-full p-1' />
          <section>
            <p className='font-semibold text-gray-400 text-sm'>Active properties</p>
            <p className='text-lg'>0</p>
          </section>
        </article>
        <article className='font-bold text-lg flex gap-4 border rounded-lg p-4 items-center flex-1'>
          <Calendar03Icon className='border rounded-full p-1' />
          <section>
            <p className='font-semibold text-gray-400 text-sm'>Upcoming tours</p>
            <p className='text-lg'>0</p>
          </section>
        </article>
        <article className='font-bold text-lg flex gap-4 border rounded-lg p-4 items-center flex-1'>
          <Money03Icon className='border rounded-full p-1' />
          <section>
            <p className='font-semibold text-gray-400 text-sm'>Rent earnings</p>
            <p className='text-lg'>UGX 0.0</p>
          </section>
        </article>
      </section>

      <section className='px-[8vw] py-[6vh]'>
        <div className='flex justify-between items-center'>
          <h2 className="font-bold text-md whitespace-nowrap">Top Performing Properties</h2>
          <div className='flex gap-2'>
            <select value={selectedMonth} className="border border-gray-300 rounded-md px-3 py-2 text-xs bg-white">
              <option defaultChecked className='bg-white'>Select Month</option>
              { months.map((month, index) => (
                <option key={index} onChange={(e) => setSelectedMonth(e.target.value)} className='px-2'>{month.label}</option>
              ))}
            </select>
            <select value={selectedYear} className="border border-gray-300 rounded-md px-3 py-2 text-xs bg-white">
              <option defaultChecked className='px-2'>Select Year</option>
              { years.map((year, index) => (
                <option key={index} onChange={(e) => setSelectedYear(e.target.value)} className='px-2'>{year.label}</option>
              ))}
            </select>
          </div>
        </div>
        <section className='pt-4'>
          <AetoGrid columns={columns} data={data} loaderIcon={<i className='pi pi-spin pi-spinner'/>} isLoading={false}/>
        </section>
      </section>

      <section className=''>
        <Footer/>
      </section>
    </div>
  );
};

export default Overview;