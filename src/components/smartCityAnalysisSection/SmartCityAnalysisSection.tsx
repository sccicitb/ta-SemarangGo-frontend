import { ServiceGridTypes } from "@/models/serviceGrid";
import ServiceSection from "../serviceSection/ServiceSection";

import {
  MdOutlineAccountBalance as GovernanceIcon,
  MdOutlineLocationOn as BrandingIcon,
  MdOutlineAttachMoney as EconomyIcon,
  MdOutlineChair as LivingIcon,
  MdOutlineGroup as SocietyIcon,
} from "react-icons/md";
import { BsTree as EnvironmentIcon } from "react-icons/bs";

const data: ServiceGridTypes.ServiceGrid[] = [
  {
    name: "Governance",
    icon: GovernanceIcon,
    link: "/smart-city/governance"
  },
  {
    name: "Branding",
    icon: BrandingIcon,
    link: "/smart-city/branding"
  },
  {
    name: "Economy",
    icon: EconomyIcon,
    link: "/smart-city/economy"
  },
  {
    name: "Living",
    icon: LivingIcon,
    link: "/smart-city/living"
  },
  {
    name: "Society",
    icon: SocietyIcon,
    link: "/smart-city/society"
  },
  {
    name: "Environment",
    icon: EnvironmentIcon,
    link: "/smart-city/environment"
  }
];

const SmartCityAnalysisSection = () => {
  return (
    <ServiceSection 
      title="Analisis Smart City Semarang" 
      columnCount={3} 
      data={data} 
      isViewAllAvaliable={false}    
    />
  );
};

export default SmartCityAnalysisSection;