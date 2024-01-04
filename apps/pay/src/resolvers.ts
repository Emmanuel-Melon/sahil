import {
    accountBalance,

} from "./accounts/queries";
import { basicUserInfo, userInfoWithConsent } from "./users/queries";
import { paymentStatus, preApprovalStatus, requestToPayTransactionStatus } from "./payments/queries";

export const resolvers = {
    Mutation: {
        // payments mutations
        requestToPay: async (_: any, args: any, { dataSources }: any) => {
            return dataSources.momoAPI.requestToPay({ ...args });
        },

        // auth mutations
        createAccessToken: async (_: any, __: any, { dataSources }: any) => {
            return dataSources.momoAuthAPI.createAcccessToken();
        }
    },
    Query: {
        // account queries
        accountBalance,
        basicUserInfo,
        userInfoWithConsent,

        // payments queries
        paymentStatus,
        preApprovalStatus,
        requestToPayTransactionStatus
    }
};