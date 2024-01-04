export async function accountBalance(_: any, __: any, { dataSources }: any) {
    return dataSources.momoAPI.getAccountBalance();
}
