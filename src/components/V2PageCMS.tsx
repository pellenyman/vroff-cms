"use client";

import V2PageStatic from "./V2PageStatic";

interface V2PageCMSProps {
  sections: any[] | null;
}

export default function V2PageCMS({ sections }: V2PageCMSProps) {
  return <V2PageStatic onOpenModal={() => {}} cmsData={sections} />;
}
