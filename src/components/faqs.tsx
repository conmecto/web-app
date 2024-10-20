import React from 'react';
import { Link } from 'react-router-dom';

const FaqCard = ({ faqData }: any) => {
  return (
    <div className="h-4/5 w-4/5 p-6 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
      <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {faqData.header}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {faqData.info}
      </p>
    </div>
  )
}

const faqsData = [
  {
    header: 'Text header dsfjsdklfj lksd jfklsd',
    info: 'Test info sfjlksdj lk'
  },
  {
    header: 'Text header dsfjsdklfj lksd jfklsd',
    info: 'Test info sfjlksdj lksdjf lksjfklsdjf klsjf lksd'
  },
  {
    header: 'Text header dsfjsdklfj lksd jfklsd',
    info: 'Test info sfjlksdj lksdjf lksjfklsdjf klsjf lksdjfklsdjflks djflksdj fklsdjfklsdjf klsdjf klsdfjlkdsjf lksdfjklsajflksdjfkl sj lkdsjlkfsdjflksd'
  },
  {
    header: 'Text header dsfjsdklfj lksd jfklsd',
    info: 'Test info sfjlksdj lksdjf lksjfklsdjf klsjf lksdjfklsdjflks djflksdj fklsdjfklsdjf klsdjf klsdfjlkdsjf lksdfjklsajflksdjfkl sj lkdsjlkfsdjflksd'
  },
  {
    header: 'Text header dsfjsdklfj lksd jfklsd',
    info: 'Test info sfjlksdj lksdjf lksjfklsdjf klsjf lksdjfklsdjflks djflksdj fklsdjfklsdjf klsdjf klsdfjlkdsjf lksdfjklsajflksdjfkl sj lkdsjlkfsdjflksd'
  },
  {
    header: 'Text header dsfjsdklfj lksd jfklsd',
    info: 'Test info sfjlksdj lksdjf lksjfklsdjf klsjf lksdjfklsdjflks djflksdj fklsdjfklsdjf klsdjf klsdfjlkdsjf lksdfjklsajflksdjfkl sj lkdsjlkfsdjflksd'
  }
]

const Faqs: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex h-1/5 justify-center items-center">
        <p className='text-3xl text-neutral-500 font-bold'>
          FAQs
        </p>
      </div>
      <div className="flex flex-row h-2/5">
        {
          faqsData.slice(0, 3).map(faq => 
            <div className="flex flex-1 justify-center items-center">
              <FaqCard faqData={faq} />
            </div>
          )
        }
      </div>
      <div className="flex flex-row h-2/5">
        {
          faqsData.slice(3, 6).map(faq => 
            <div className="flex flex-1 justify-center items-center">
              <FaqCard faqData={faq} />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Faqs;