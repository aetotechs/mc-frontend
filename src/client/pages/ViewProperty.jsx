import Header from "../components/global/Header";
import SubHeader from "../components/global/ViewPropertySubHeader";
import ListingCard from "../components/global/ListingCard";
import { listings } from "../utils/resources/dummy_data";
import Footer from "../components/global/Footer";
import { Button } from "primereact/button";
import { ArrowRight01Icon } from "hugeicons-react";


const ViewPropertyPage = () => {
  return (
    <>
      <div className="">
        <div className="border-b pb-3">
          <Header />
          <SubHeader />
        </div>

        <div className="lg:px-24">
          <div className="flex my-3 justify-between">
            <span className="font-medium text-xl">
              Available properties to rent in Kampala
            </span>

            <div className="flex items-center gap-10">
              <span>
                <span>20 </span>
                of
                <span>100 results</span>
              </span>

              <div>
                <span>Sort</span>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8  ">
            {listings.map((item, index) => (
              <ListingCard key={index} item={item} />
            ))}
          </section>

          <div className="flex items-center my-16 justify-center gap-10">
            <span>Page 1 of 50</span>

            <Button className="bg-[#2F91D7] p-2 text-white">
              Next Page
              <span>
                <ArrowRight01Icon className="h-5 w-5" />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ViewPropertyPage;
