import queryGraphql from "./query-graphql";

const BASE_API_URL = process.env.API_BASE_URL;

class API {
  constructor() {}

  queryAPI(query, variables = {}) {
    const apiUrl = `http://${BASE_API_URL}/graphql`;
    return queryGraphql(apiUrl, query, variables);
  }

  getAllRestaurants() {
    return this.queryAPI(`
        query {
          restaurants {
            id
            name
            reviewsCount
            rateAverage
          }
        }
    `);
  }

  getRestaurantById(id: string) {
    return this.queryAPI(
      `
        query($id: ID!) {
          restaurant(id: $id) {
            id
            name
            description
            phone
            website
            kitchen
            tags
            reviewsCount
            rateAverage
            reviews {
              id
              date
              comment
              rate
            }
          }
        }
    `,
      { id }
    );
  }
}

export default new API();
