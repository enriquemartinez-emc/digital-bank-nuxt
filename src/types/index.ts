/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @format int32 */
export enum CardType {
  Debit = Debit,
  Credit = Credit,
}

export interface AccountData {
  accountNumber?: string | null;
  /** @format double */
  initialBalance?: number;
}

export interface CreateCustomerCommand {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}

export interface CreateTransferCommand {
  /** @format uuid */
  fromAccountId?: string;
  /** @format uuid */
  toAccountId?: string;
  /** @format double */
  amount?: number;
}

export interface IssueCardCommand {
  /** @format uuid */
  accountId?: string;
  cardType?: CardType;
  cardHolderName?: string | null;
}

export interface LoginCommand {
  username?: string | null;
  password?: string | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title DigitalBank API
 * @version v1
 *
 * API for managing banking operations
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Accounts
     * @name CustomersAccountsList
     * @request GET:/api/customers/{customerId}/accounts
     * @secure
     */
    customersAccountsList: (customerId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/customers/${customerId}/accounts`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Accounts
     * @name CustomersAccountsCreate
     * @request POST:/api/customers/{customerId}/accounts
     * @secure
     */
    customersAccountsCreate: (
      customerId: string,
      data: AccountData,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/customers/${customerId}/accounts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Accounts
     * @name CustomersAccountsDetail
     * @request GET:/api/customers/{customerId}/accounts/{accountId}
     * @secure
     */
    customersAccountsDetail: (
      customerId: string,
      accountId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/customers/${customerId}/accounts/${accountId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Accounts
     * @name CustomersAccountsBatchList
     * @request GET:/api/customers/accounts/batch
     * @secure
     */
    customersAccountsBatchList: (
      query?: {
        accountIds?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/customers/accounts/batch`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthLoginCreate
     * @request POST:/api/auth/login
     * @secure
     */
    authLoginCreate: (data: LoginCommand, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthLogoutCreate
     * @request POST:/api/auth/logout
     * @secure
     */
    authLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthStatusList
     * @request GET:/api/auth/status
     * @secure
     */
    authStatusList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/status`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cards
     * @name CardsCreate
     * @request POST:/api/cards
     * @secure
     */
    cardsCreate: (data: IssueCardCommand, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/cards`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cards
     * @name CardsDetail
     * @request GET:/api/cards/{cardId}
     * @secure
     */
    cardsDetail: (cardId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/cards/${cardId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customers
     * @name CustomersList
     * @request GET:/api/customers
     * @secure
     */
    customersList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/customers`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customers
     * @name CustomersCreate
     * @request POST:/api/customers
     * @secure
     */
    customersCreate: (
      data: CreateCustomerCommand,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/customers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customers
     * @name CustomersDetail
     * @request GET:/api/customers/{customerId}
     * @secure
     */
    customersDetail: (customerId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/customers/${customerId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transfers
     * @name TransfersList
     * @request GET:/api/transfers
     * @secure
     */
    transfersList: (
      query?: {
        /** @format uuid */
        customerId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/transfers`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transfers
     * @name TransfersCreate
     * @request POST:/api/transfers
     * @secure
     */
    transfersCreate: (
      data: CreateTransferCommand,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/transfers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  health = {
    /**
     * No description
     *
     * @tags Health
     * @name HealthList
     * @request GET:/health
     * @secure
     */
    healthList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/health`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
