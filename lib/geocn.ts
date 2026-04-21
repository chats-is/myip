import { getLookups } from '@/lib/db';
import { GEOLOCATION_MAP, ISP_MAP } from '@/lib/format';
import { CHINA, getNameByLang } from '@/lib/lang';
import { IPGeoLocationData } from '@/lib/types';
import { pruneObject } from '@/lib/utils';

export const geocnQuery = (
  ip: string,
  lang?: string
): IPGeoLocationData | undefined => {
  try {
    const { geocn } = getLookups();
    const cnResponse = geocn.get(ip);
    if (cnResponse) {
      const regionName = cnResponse?.province?.replace('省', '');
      const cityName = cnResponse?.city?.replace('市', '');

      const data: IPGeoLocationData = {
        ip,
        country_name: getNameByLang(CHINA.names, lang),
        region_code: cnResponse?.provinceCode?.toString(),
        region_name: regionName,
        city_code: cnResponse?.cityCode?.toString(),
        city_name: cityName,
        district_code: cnResponse.districtsCode?.toString(),
        district_name: cnResponse.districts,
        isp: cnResponse.isp
          ? ISP_MAP[cnResponse.isp] || cnResponse.isp
          : cnResponse.isp,
        source: 'geocn'
      };

      if (regionName && cityName) {
        const geolocation = GEOLOCATION_MAP[regionName]?.[cityName];
        data.postal = geolocation?.postal;
        data.latitude = geolocation?.latitude;
        data.longitude = geolocation?.longitude;
      }

      return pruneObject(data);
    }
  } catch (err) {
    console.error(err);
  }
};
