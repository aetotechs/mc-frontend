import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Home11Icon, PlusSignIcon, Search01Icon } from 'hugeicons-react';
import { useNavigate } from 'react-router-dom';
import api_urls from '../../utilities/constants/api_urls';
import Spinner from '../../utilities/loaders/Spinner';
import Footer from '../../components/global/footer/Footer';
import { getAuthUser } from '../../utilities/cookies/AuthCookiesManager';
import PartnerHeader from '../../components/partner/header/PartnerHeader';
import PropertiesTable from '../../components/partner/tables/PropertiesTable';

const user = getAuthUser();

const Properties = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = `${user?.username}'s - Properties`;
        
        const fetchData = async () => {
            setLoading(true);
            try {
              const response = await fetch(api_urls.listings.get_all_landload_listings(user.email));
              if(!response.ok) {  
                const errorMessage = await response.text();
                setError(errorMessage);
              } else {
                const result = await response.json();
                setData(result);
              }
            }
            catch (error) {
                setError(error?.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="h-screen">
            <section className="sticky top-0 z-50">
                <PartnerHeader bottomBorder />
            </section>

            <section className="px-[8vw] py-[2vw] flex justify-between">
                <h1 className="font-bold text-xl">Properties</h1>
                <section className="flex gap-4">
                    <article className="flex items-center border rounded-lg">
                        <Search01Icon
                            size={38}
                            className="p-3 cursor-pointer"
                            onClick={() => console.log("Trigger search event here")}
                        />
                        <input
                            type="search"
                            name=""
                            placeholder="Search"
                            id=""
                            className="flex-1 pr-2 py-3 h-full rounded-r-lg focus:border-0 outline-none"
                        />
                    </article>
                    <Button
                        onClick={() => navigate('/new')}
                        className="bg-primary text-white gap-2 font-semibold p-2 text-md"
                    >
                        <PlusSignIcon size={18} />
                        New
                    </Button>
                </section>
            </section>

            <section className={`${(data.length > 0 || loading) && 'hidden'} px-[8vw] py-[2vw] h-56 flex items-center justify-center`}>
                <article className="">
                    <section className="flex items-center justify-center pb-3">
                        <Home11Icon
                            size={52}
                            className="text-center bg-blue-100 p-2 rounded-full text-primary"
                        />
                    </section>
                    <p className="font-bold text-center text-xl">No properties added yet</p>
                    <p className="text-md text-center text-gray-500">
                        Click <a href="/new" className="text-primary">'+ New'</a> to get started
                    </p>
                </article>
            </section>

            { loading && 
              <section>
                <Spinner/>
              </section>
            }

            <section className={`${(data.length < 1 || loading) && 'hidden'} px-[8vw]`}>
              <PropertiesTable data={data} />
            </section>

            <section className="pt-[4vh]">
                <Footer />
            </section>
        </div>
    );
};

export default Properties;