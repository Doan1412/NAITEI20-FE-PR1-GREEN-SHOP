import React from 'react'

interface IDataProps {
  title: string;
  data: number;
  percent: number;
}

function StatisticsCard(props: IDataProps) {

  const { title, data, percent } = props;

  return (
    <div className="statistics-card cursor-pointer border-lg shadow-sm p-3 border rounded-lg flex items-center justify-between text-center hover:shadow-lg transitions">
      <div className='w-full'>
        <p>{title}</p>
        <div className='flex items-center justify-center gap-3 mt-2'>
          <p className='text-xl font-semibold'>{percent} %</p>
          <p className='text-sm text-grey-500'>({data})</p>
        </div>
      </div>
    </div>
  )
}

export default StatisticsCard;
