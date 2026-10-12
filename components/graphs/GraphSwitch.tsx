"use client";
import type { GraphId } from "@/lib/types";
import BreakEven from "./BreakEven";
import ProductLifeCycle from "./ProductLifeCycle";
import Boston from "./Boston";
import OrgChart from "./OrgChart";
import SupplyDemand from "./SupplyDemand";
import Maslow from "./Maslow";
import { CashFlowLab, InvestmentLab, RatiosLab } from "./FinanceLabs";

export default function GraphSwitch({ id }: { id: GraphId }) {
  switch (id) {
    case "breakeven":
      return <BreakEven />;
    case "plc":
      return <ProductLifeCycle />;
    case "boston":
      return <Boston />;
    case "org":
      return <OrgChart />;
    case "supply-demand":
      return <SupplyDemand />;
    case "maslow":
      return <Maslow />;
    case "ratios":
      return <RatiosLab />;
    case "investment":
      return <InvestmentLab />;
    case "cashflow":
      return <CashFlowLab />;
    default:
      return null;
  }
}
