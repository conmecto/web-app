import React, { useState, useEffect } from 'react';
import getBrandDetails from '../services/getBrandDetails';
import getBrandOrders from '../services/getBrandOrders';
import Loader from '../components/loader';
import BrandHeader from '../components/brandHeader';
import ProductModal from '../components/productModal';
import OrderCard from '../components/orderCard';
import { useAuth } from '../utils/authContext';
import { formatText } from '../utils/helpers';
import { countryList } from '../utils/constants';


const BrandOrders: React.FC = () => {
  const authData = useAuth();
  const { user, isAuthenticated } = authData;
  const [loading, setLoading] = useState(true);
  const [adModal, setAdModal] = useState<any>(null);
  const [brandDetails, setBrandDetails] = useState<any>({});
  const [ordersList, setOrdersList] = useState<any[]>([]);
  
  const handleAdModal = (ad: any) => {
    setAdModal(ad);
  }

  useEffect(() => {
    if (!isAuthenticated || !user?.id || user?.type !== 'brand') {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    const callGetBrandDetails = async () => {
      try {
        const data = await getBrandDetails(user.id as number, signal, authData);
        setBrandDetails(data);
        const orderData = await getBrandOrders(user.id as number, signal, authData);
        setOrdersList(orderData.orders);
      } catch(error) {
      } finally {
        setLoading(false);
      }
    }
    callGetBrandDetails();
    return () => {
      controller.abort();
    }
  }, []); 
  
  useEffect(() => {
    if (adModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [(!!adModal)]);

  if (loading) {
    return (
      <div className="flex flex-col">
        <BrandHeader />
        <div className="flex pt-10 pl-10 items-center">
          <p className="text-2xl font-semibold">
            Orders
          </p>
        </div>
        <div className="flex p-10 justify-center items-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <BrandHeader />
      <div className="flex flex-col p-5 rounded-b-xl bg-logo-color">
        <div className="flex flex-1 p-2 flex-row justify-center">
          <p className="text-3xl font-bold">
            {formatText(brandDetails?.brandName)} &nbsp;
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-8">
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
          </p>
        </div>
        <div className="flex flex-1 p-2 flex-row justify-center">
          <p className="text-lg font-medium">
            {countryList[brandDetails?.country]} &nbsp; | &nbsp;
          </p>
          <p className="text-lg font-medium">
            {brandDetails?.email} 
          </p>
        </div>
      </div>
      <div className="flex pt-10 pl-10 items-center">
        <p className="text-2xl font-semibold">
          Orders
        </p>
      </div>
      <div className="flex flex-1 justify-start pl-10 pt-5">
        <p className="text-xs font-semibold text-white dark:text-white bg-logo-color rounded-lg p-2">
          Perpetual content license for both commercial and non-commercial use
        </p>
      </div>     
      <div className="flex flex-wrap w-full bg-white">
        {
          ordersList.map((order: any, index: number) => (
            <OrderCard key={index} order={order} handleAdModal={handleAdModal} />
          ))
        }
      </div>
      {
        adModal && 
        (
          <ProductModal product={adModal} handleProductModal={handleAdModal} isOrdered={true}/>
        )
      }
    </div>
  );
}

export default BrandOrders;