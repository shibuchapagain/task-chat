export interface Config {
  store?: {
    action?: 'update' | 'reset' | 'set' | 'loading';
    key?: string;
    loading?: boolean;
  };
  successMsg?: string;
  showErr?: boolean;
  navigateBack?: boolean;
  navigate?: any[];
  onSuccess?: (data: any) => {};
  onError?: (err: Error, errMsg: string) => {};
}

export interface ReturnType {
  url?: string;
  method?: 'post' | 'get' | 'patch' | 'delete';
  data?: any;
  params?: any;
  headers?: any;
  config?: Config;
}
