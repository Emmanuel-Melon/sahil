export const typeDefs = `#graphql
  type RequestToPayResponse {
    status: String
    message: String
}

type CreateAccessTokenResponse {
    token: String
    expires_in: Int
}

type AccountBalanceResponse {
    availableBalance: String
    currency: String
}

type BasicUserInfoResponse {
    given_name: String
    family_name: String
    birthdate: String
    locale: String
    gender: String
    status: String
}

type RequesttoPayDeliveryNotification {
    notificationMessage: String
}

type PaymentStatusResponse {
    referenceId: String
    status: String
    financialTransactionId: String
    reason: String
}

type PreApprovalStatusResponse {
    payer: String
    payerCurrency: String
    payerMessage: String
    status: String
    expirationDateTime: String
    reason: String
}

type UserInfoWithConsentResponse {
    sub: String
    name: String
    given_name: String
    family_name: String
    middle_name: String
    email: String
    email_verified: Boolean
    gender: String
    locale: String
    phone_number: String
    phone_number_verified: Boolean
    address: String
    updated_at: Int
    status: String
    birthdate: String
    credit_score: String
    active: Boolean
    country_of_birth: String
    region_of_birth: String
    city_of_birth: String
    occupation: String
    employer_name: String
    identification_type: String
    identification_value: String
}

type RequestToPayTransactionStatusResponse {
    amount: String
    currency: String
    financialTransactionId: String
    externalId: String
    payer: String
    payerMessage: String
    payeeNote: String
    status: String
    reason: String
}

input RequestToPayInput {
  amount: Float!
  payer: PayerInput!
  externalId: String!
  payerMessage: String
  payeeNote: String
  currency: String
}

input PayerInput {
  partyId: String!
  partyIdType: String!
}


type Mutation {
    requestToPay(object: RequestToPayInput): RequestToPayResponse
    createAccessToken: CreateAccessTokenResponse
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    accountBalance: AccountBalanceResponse
    basicUserInfo(accountHolderMSISDN: String!): BasicUserInfoResponse
    paymentStatus(referenceId: String!): PaymentStatusResponse
    preApprovalStatus(referenceId: String!): PreApprovalStatusResponse
    userInfoWithConsent: UserInfoWithConsentResponse
    requestToPayTransactionStatus(referenceId: String!): RequestToPayTransactionStatusResponse
}
`;