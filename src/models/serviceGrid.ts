import { IconType } from "react-icons/lib";
import { To } from "react-router-dom";

export namespace ServiceGridTypes {
  export interface ServiceGrid {
    name: string;
    icon: IconType;
    link: To | string;
  }
}
