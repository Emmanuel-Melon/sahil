import {
    gql,
} from "@apollo/client";

export const FETCH_ORDERS = gql`
query getSuppliers {
    suppliers {
        created_at
        id
        name
    }
}
`;