import { AugmentedRequest, CacheOptions, PostRequest, RESTDataSource } from '@apollo/datasource-rest';
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { subscriptionKey } from "./config";
import { v4 as uuidv4 } from 'uuid';

export class MomoAuthAPI extends RESTDataSource {

    override baseURL = 'https://sandbox.momodeveloper.mtn.com/';
    private token: string;

    constructor(options: { token?: string; cache?: KeyValueCache, key?: string }) {
        super(options);
    }

    override willSendRequest(_path: string, request: AugmentedRequest) {
        request.headers['Authorisation'] = `Basic ${this.token}`;
        request.headers['Ocp-Apim-Subscription-Key'] = subscriptionKey;
    }

    async createAcccessToken() {
        return this.post(`collection/token/`);
    }
}

export class MomoAPI extends RESTDataSource {
    override baseURL = 'https://sandbox.momodeveloper.mtn.com/';
    private token: string;

    constructor(options) {
        super(options);
        const { token, cache, key } = options;
        this.token = token;
    }

    override willSendRequest(_path: string, request: AugmentedRequest) {
        request.headers['Authorization'] = `Bearer ${this.token}`;
        request.headers['Ocp-Apim-Subscription-Key'] = subscriptionKey;
        request.headers['X-Target-Environment'] = "sandbox";
    }

    async requestToPay(body) {
        try {
            const resp = await this.post(`collection/v1_0/requesttopay`, {
                body: { ...body?.object },
                headers: {
                    'X-Reference-Id': uuidv4()
                }
            });
            return resp;
        } catch (err) {
            // console.log(err);
        }

    }

    async requesttoPayDeliveryNotification (referenceId) {
        try {
            const resp = await this.post(`collection/v1_0/requesttopay/${referenceId}/deliverynotification`, {
                body: { referenceId },
                headers: {
                    'X-Reference-Id': uuidv4()
                }
            });
            return resp;
        } catch (error) {
            // console.log(error);
        }
    }

    async getAccountBalance() {
        try {
            const res = await this.get(`collection/v1_0/account/balance`);
            return res;
        } catch (err) {

        }
    }

    async getBasicUserInfo(accountHolderMSISDN: any) {
        return this.get(`collection/v1_0/accountholder/msisdn/${accountHolderMSISDN}/basicuserinfo`);
    }

    async getPaymentStatus(referenceId: any): Promise<Record<string, any>> {
        return this.get(`collection/v2_0/payment/${referenceId}`);
    }

    async getPreApprovalStatus(referenceId: any) {
        return this.get(`collection/v2_0/preapproval/${referenceId}`);
    }

    async getUserInfoWithConsent() {
        return this.get(`collection/oauth2/v1_0/userinfo`);
    }

    async getRequestToPayTransactionStatus(referenceId: any) {
        return this.get(`collection/v1_0/requesttopay/${referenceId}`);
    }
}
