'use client';

import React, { FormEvent, useState } from 'react';
import {
  Browser,
  Buildings,
  Check,
  Clock,
  Copy,
  Desktop,
  Globe,
  Hash,
  HouseLine,
  MapPin,
  MapTrifold,
  WifiHigh
} from '@phosphor-icons/react';
import { toast } from 'sonner';
import isFQDN from 'validator/lib/isFQDN';
import isIP from 'validator/lib/isIP';

import { IPGeoLocationData } from '@/lib/types';
import { IconLoader, IconSearch } from '@/components/Icons';

interface IPGeoLocationProps {
  defaultValue?: IPGeoLocationData;
}

export function IPGeoLocation({ defaultValue }: IPGeoLocationProps) {
  const [data, setData] = useState(defaultValue);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const query = formData.get('query')?.toString();

    if (query && (isIP(query) || isFQDN(query))) {
      const lang = navigator.language;
      const res = await fetch(`/api/${query}${lang ? `?lang=${lang}` : ''}`);
      const json = await res.json();

      if (res.ok) {
        setData(json);
      } else {
        toast.error(json.error);
      }
    } else {
      toast.error('Invalid IP address or domain.');
    }

    setLoading(false);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }

  return (
    <div className="m-auto w-full px-3 sm:max-w-lg">
      <form className="mb-6 w-full" onSubmit={onSubmit}>
        <div className="flex w-full justify-between">
          <input
            type="search"
            name="query"
            className="h-12 w-full rounded-l-lg rounded-r-none border border-r-0 border-slate-300 bg-slate-50 pl-3 pr-2 text-lg font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:placeholder:text-slate-400 dark:focus:border-blue-500"
            placeholder="Enter IP address or domain..."
            defaultValue={data?.ip}
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="h-12 rounded-r-lg bg-blue-700 px-4 text-white hover:bg-blue-800 disabled:opacity-60 dark:bg-blue-600 dark:text-slate-900 dark:hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <IconLoader className="size-5 animate-spin" />
                <span className="sr-only">Loading</span>
              </>
            ) : (
              <>
                <IconSearch className="size-5" />
                <span className="sr-only">Search</span>
              </>
            )}
          </button>
        </div>
      </form>
      {data && (
        <div className="w-full space-y-4">
          {/* IP Address Card - Prominent Display */}
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white shadow-lg dark:from-blue-700 dark:to-blue-800">
            <div className="flex items-center gap-2 text-blue-200">
              <Hash size={14} />
              <span className="text-xs font-medium uppercase tracking-wide">
                IP Address
              </span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span className="break-all text-2xl font-bold tracking-tight">
                {data.ip}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(data.ip)}
                className="p-1 text-blue-200 transition-colors hover:text-white"
                title="Copy IP"
              >
                {isCopied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* Details List */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            {data.hostname && (
              <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <div className="flex w-24 items-center gap-2 text-slate-400">
                  <Desktop size={16} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Hostname
                  </span>
                </div>
                <div className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {data.hostname}
                </div>
              </div>
            )}
            {data.country_name && (
              <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <div className="flex w-24 items-center gap-2 text-slate-400">
                  <Globe size={16} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Country
                  </span>
                </div>
                <div className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {data.country_name}
                </div>
              </div>
            )}
            {data.region_name && (
              <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <div className="flex w-24 items-center gap-2 text-slate-400">
                  <MapTrifold size={16} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Region
                  </span>
                </div>
                <div className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {data.region_name}
                </div>
              </div>
            )}
            {data.city_name && (
              <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <div className="flex w-24 items-center gap-2 text-slate-400">
                  <Buildings size={16} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    City
                  </span>
                </div>
                <div className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {data.city_name}
                </div>
              </div>
            )}
            {data.postal && (
              <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <div className="flex w-24 items-center gap-2 text-slate-400">
                  <HouseLine size={16} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Postal
                  </span>
                </div>
                <div className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {data.postal}
                </div>
              </div>
            )}
            {(data.isp || data.org) && (
              <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <div className="flex w-24 items-center gap-2 text-slate-400">
                  <WifiHigh size={16} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {data.isp ? 'ISP' : 'AS'}
                  </span>
                </div>
                <div className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {data.isp || data.org}
                </div>
              </div>
            )}
            {data.latitude && data.longitude && (
              <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <div className="flex w-24 items-center gap-2 text-slate-400">
                  <MapPin size={16} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Location
                  </span>
                </div>
                <div className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {data.latitude}, {data.longitude}
                </div>
              </div>
            )}
            {data.timezone && (
              <div className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 last:border-b-0 dark:border-slate-800">
                <div className="flex w-24 items-center gap-2 text-slate-400">
                  <Clock size={16} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Timezone
                  </span>
                </div>
                <div className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {data.timezone}
                </div>
              </div>
            )}
            <div className="flex items-start gap-4 px-4 py-3">
              <div className="flex w-24 shrink-0 items-center gap-2 text-slate-400">
                <Browser size={16} />
                <span className="text-xs font-medium uppercase tracking-wide">
                  UA
                </span>
              </div>
              <div className="min-w-0 flex-1 break-all text-xs text-slate-500 dark:text-slate-400">
                {data.user_agent}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-3 w-full rounded-lg bg-slate-100 p-4 text-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <code>
          ipmy.dev/api
          <br />
          ipmy.dev/api/8.8.8.8
        </code>
      </div>
    </div>
  );
}
