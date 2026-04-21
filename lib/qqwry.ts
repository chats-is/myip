import { getLookups } from '@/lib/db';
import { GEOLOCATION_MAP, ISP_MAP } from '@/lib/format';
import { IPGeoLocationData } from '@/lib/types';
import { pruneObject } from '@/lib/utils';

export const qqwryQuery = (ip: string): IPGeoLocationData | undefined => {
  const { qqwry } = getLookups();
  const res = qqwry.find(ip);

  if (res && res.data) {
    const qqwryResponse = res.data;
    const regionName = qqwryResponse.region_name.replace('省', '');
    const cityName = qqwryResponse.city_name.replace('市', '');
    const geolocation = GEOLOCATION_MAP[regionName]?.[cityName];

    const data: IPGeoLocationData = {
      ip,
      country_code: qqwryResponse.country_code,
      country_name: qqwryResponse.country_name,
      region_name: regionName,
      city_name: cityName,
      district_name: qqwryResponse.district_name,
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
      postal: geolocation.postal,
      isp: qqwryResponse.isp_domain
        ? ISP_MAP[qqwryResponse.isp_domain] || qqwryResponse.isp_domain
        : qqwryResponse.isp_domain,
      source: 'qqwry'
    };

    return pruneObject(data);
  }
};
