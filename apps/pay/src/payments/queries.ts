

export async function paymentStatus(_: any, { referenceId }: any, { dataSources }: any) {
    return dataSources.momoAPI.getPaymentStatus(referenceId);
}
export async function preApprovalStatus(_: any, { referenceId }: any, { dataSources }: any) {
    return dataSources.momoAPI.getPreApprovalStatus(referenceId);
}

export async function requestToPayTransactionStatus(_: any, { referenceId }: any, { dataSources }: any) {
    return dataSources.momoAPI.getRequestToPayTransactionStatus(referenceId);
}