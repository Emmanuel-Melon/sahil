export async function userInfoWithConsent(_: any, __: any, { dataSources }: any) {
    return dataSources.momoAPI.getUserInfoWithConsent();
}

export async function basicUserInfo(_: any, { accountHolderMSISDN }: any, { dataSources }: any) {
    return dataSources.momoAPI.getBasicUserInfo(accountHolderMSISDN);
}