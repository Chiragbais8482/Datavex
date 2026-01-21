import { ReactNode } from "react";
import ParticleCard from "./ParticleCard";
import GlobalSpotlight from "./GlobalSpotlight";
import "./magic-bento.css";

interface MagicBentoWrapperProps {
  children: ReactNode;
}

export default function MagicBentoWrapper({
  children,
}: MagicBentoWrapperProps) {
  return (
    <>
      <GlobalSpotlight />
      <ParticleCard>{children}</ParticleCard>
    </>
  );
}
