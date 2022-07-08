import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import SectionTable from "./SectionTable";

function SectionView({ selectedGrade }) {
  const [sections, setSections] = useState([]);
  const fetchSections = useCallback(async () => {
    const res = await Axios.get(
      `http://localhost:4000/section/${selectedGrade.idgrado}`
    );
    setSections(res.data);
  }, []);
  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  return (
    <>
      <SectionTable sections={sections} />
    </>
  );
}

export default SectionView;
