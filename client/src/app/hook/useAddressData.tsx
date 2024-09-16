import { useState, useEffect } from "react";

interface DistrictOption {
  district_id: string;
  district_name: string;
  district_type: string;
}

interface WardOption {
  ward_id: string;
  ward_name: string;
  ward_type: string;
}

interface ProvinceOption {
  province_id: string;
  province_name: string;
  province_type: string;
}

export const useAddressData = () => {
  const [districts, setDistricts] = useState<DistrictOption[]>([]);
  const [wards, setWards] = useState<WardOption[]>([]);

  const fetchDistricts = async (provinceId: string) => {
    try {
      const response = await fetch(
        `https://vapi.vnappmob.com/api/province/district/${provinceId}`
      );
      const data = await response.json();
      setDistricts(data.results);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchWards = async (districtId: string) => {
    try {
      const response = await fetch(
        `https://vapi.vnappmob.com/api/province/ward/${districtId}`
      );
      const data = await response.json();
      setWards(data.results);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  return { districts, wards, fetchDistricts, fetchWards };
};