import { Client, fetchExchange } from "@urql/core";


export const useCfwClient = () =>{
    return new Client({
        url: "http://127.0.0.1:8787/graphql",
        exchanges: [fetchExchange],
        fetchOptions:{
            headers: {'x-hasura-admin-secret':'ithaa@M00dhu2024'}
        }
    });
}

const searchQuery = `query Search($pattern: String!) {
  mv_addresses(where: {
    full_address_string: {
      _ilike: $pattern
    }
  }) {
    id
    full_address_string
  }
}`;

const cfwClient = useCfwClient();
const result = await cfwClient.query(searchQuery, { "pattern": "%rasge%%havee%" }).toPromise();

console.log(result);