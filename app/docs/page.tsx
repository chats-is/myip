import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation - ipmy.dev',
  description:
    'Documentation for the geolocation API, including endpoints, parameters, and response details.'
};

export default function Page() {
  return (
    <div className="m-auto w-full px-3 sm:max-w-lg">
      <h1 className="mb-4 text-2xl font-bold">API Documentation</h1>

      <h2 className="mt-4 text-xl font-semibold">Overview</h2>
      <p className="mb-4">
        This document outlines the API endpoints, request parameters, and
        response structure for retrieving geolocation information based on IP
        addresses or domains.
      </p>

      <h2 className="mt-4 text-xl font-semibold">Endpoints</h2>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>GET /api</strong>: Retrieves general geolocation information.
        </li>
        <li>
          <strong>GET /api/&#123;query&#125;</strong>: Retrieves geolocation
          information for a specific IP or domain specified in the{' '}
          <code>query</code> path parameter.
        </li>
      </ul>

      <h2 className="mt-4 text-xl font-semibold">Request Parameters</h2>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>query</strong> (path parameter): Specifies the IP address or
          domain to query.
        </li>
        <li>
          <strong>lang</strong> (optional, query parameter): Specifies the
          language of the returned data. Supported values:
          <ul className="ml-4 list-inside list-disc">
            <li>
              <strong>de</strong>: German
            </li>
            <li>
              <strong>en</strong>: English
            </li>
            <li>
              <strong>es</strong>: Spanish
            </li>
            <li>
              <strong>fr</strong>: French
            </li>
            <li>
              <strong>ja</strong>: Japanese
            </li>
            <li>
              <strong>pt-BR</strong>: Portuguese (Brazil)
            </li>
            <li>
              <strong>ru</strong>: Russian
            </li>
            <li>
              <strong>zh-CN</strong>: Chinese (Simplified)
            </li>
          </ul>
        </li>
        <li>
          <strong>source</strong> (optional, query parameter): Specifies the
          data source. Allowed values: <code>qqwry</code>, <code>meituan</code>,{' '}
          <code>ipapi</code>.
        </li>
        <li>
          <strong>callback</strong> (optional, query parameter): If provided,
          returns data in JSONP format.
        </li>
      </ul>

      <h2 className="mt-4 text-xl font-semibold">Response</h2>
      <p className="mb-2">
        <strong>Status Code</strong>: 200
      </p>
      <p className="mb-2">
        <strong>Content Type</strong>: <code>application/json</code> (default)
        or <code>text/javascript</code> (if <code>callback</code> parameter is
        provided)
      </p>

      <h3 className="mt-2 text-lg font-semibold">Success Response</h3>
      <p className="mb-2">
        The API returns geolocation information for the specified IP or domain,
        including the following fields (all optional unless specified):
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>ip</strong>: The IP address (required).
        </li>
        <li>
          <strong>hostname</strong>: The hostname associated with the IP.
        </li>
        <li>
          <strong>postal</strong>: Postal code.
        </li>
        <li>
          <strong>area_name</strong>: Name of the area.
        </li>
        <li>
          <strong>district_code</strong>: Code of the district.
        </li>
        <li>
          <strong>district_name</strong>: Name of the district.
        </li>
        <li>
          <strong>city_code</strong>: Code of the city.
        </li>
        <li>
          <strong>city_name</strong>: Name of the city.
        </li>
        <li>
          <strong>region_code</strong>: Code of the region.
        </li>
        <li>
          <strong>region_name</strong>: Name of the region.
        </li>
        <li>
          <strong>country_code</strong>: Code of the country.
        </li>
        <li>
          <strong>country_name</strong>: Name of the country.
        </li>
        <li>
          <strong>continent_code</strong>: Code of the continent.
        </li>
        <li>
          <strong>continent_name</strong>: Name of the continent.
        </li>
        <li>
          <strong>registered_country_code</strong>: Code of the registered
          country.
        </li>
        <li>
          <strong>registered_country_name</strong>: Name of the registered
          country.
        </li>
        <li>
          <strong>latitude</strong>: Latitude coordinate.
        </li>
        <li>
          <strong>longitude</strong>: Longitude coordinate.
        </li>
        <li>
          <strong>address</strong>: Full address.
        </li>
        <li>
          <strong>timezone</strong>: Timezone information.
        </li>
        <li>
          <strong>isp</strong>: Internet Service Provider.
        </li>
        <li>
          <strong>asn</strong>: Autonomous System Number.
        </li>
        <li>
          <strong>org</strong>: Organization name.
        </li>
        <li>
          <strong>user_agent</strong>: User agent information.
        </li>
        <li>
          <strong>isEU</strong>: Boolean indicating if the location is in the
          EU.
        </li>
        <li>
          <strong>source</strong>: Source of the data (<code>maxmind</code>,{' '}
          <code>geocn</code>, <code>qqwry</code>, <code>meituan</code>)
          (required).
        </li>
        <li>
          <strong>updatedAt</strong>: Timestamp of the last update.
        </li>
      </ul>

      <h2 className="mt-4 text-xl font-semibold">Examples</h2>
      <h3 className="mt-2 text-lg font-semibold">Example 1: General Query</h3>
      <p className="mb-2">
        <strong>Request</strong>: <code>GET /api?lang=en</code>
      </p>
      <p className="mb-4">
        <strong>Response</strong>: Returns geolocation information in JSON
        format based on the provided parameters.
      </p>

      <h3 className="mt-2 text-lg font-semibold">
        Example 2: Specific IP Query
      </h3>
      <p className="mb-2">
        <strong>Request</strong>: <code>GET /api/8.8.8.8?lang=en</code>
      </p>
      <p className="mb-4">
        <strong>Response</strong>: Returns geolocation information for the IP
        address <code>8.8.8.8</code> in JSON format.
      </p>
    </div>
  );
}
