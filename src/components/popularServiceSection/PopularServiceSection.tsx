import { ServiceGridTypes } from "@/models/serviceGrid";
import ServiceSection from "../serviceSection/ServiceSection";

import { 
  MdOutlineHealthAndSafety as HealthIcon,
  MdOutlineSchool as EducationIcon,
  MdPersonOutline as PersonIcon,
  MdOutlineShoppingBasket as CommerceIcon,
  MdOutlineDirectionsBusFilled as TransportIcon,
  MdOutlinePrint as AdministrativeIcon,
  MdInfoOutline as InfoIcon
} from "react-icons/md";
import { BsSignpost2 as TourIcon } from "react-icons/bs";

const data: ServiceGridTypes.ServiceGrid[] = [
  {
    name: "Kesehatan",
    icon: HealthIcon,
    link: "/layanan/kesehatan"
  },
  {
    name: "Pendidikan",
    icon: EducationIcon,
    link: "/layanan/pendidikan"
  },
  {
    name: "Kependudukan",
    icon: PersonIcon,
    link: "/layanan/kependudukan"
  },
  {
    name: "UMKM",
    icon: CommerceIcon,
    link: "/layanan/umkm"
  },
  {
    name: "Transportasi",
    icon: TransportIcon,
    link: "/layanan/transportasi"
  },
  {
    name: "Pariwisata",
    icon: TourIcon,
    link: "/layanan/pariwisata"
  },
  {
    name: "Perizinan",
    icon: AdministrativeIcon,
    link: "/layanan/perizinan"
  },
  {
    name: "Info Semarang",
    icon: InfoIcon,
    link: "/layanan/info-semarang"
  }
];

const PopularServiceSection = () => {
  return (
    <ServiceSection 
      title="Layanan Populer" 
      columnCount={4} 
      data={data} 
      isViewAllAvaliable={true}    
      viewAllLink="/layanan"
    />
  );
};

export default PopularServiceSection;