import Axios from "axios";
import Cookies from "universal-cookie";
import queryGraphql from "./query-graphql";

const BASE_API_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

if (process.browser) {
  const cookies = new Cookies();
  const token = cookies.get("token");

  Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}
class API {
  constructor() {}

  queryAPI(query, variables = {}) {
    const apiUrl = `http://${BASE_API_URL}/graphql`;
    return queryGraphql(apiUrl, query, variables);
  }

  async login(username: string, password: string) {
    const loginUrl = `http://${BASE_API_URL}/auth/login`;
    const { data } = await Axios.post(loginUrl, { username, password });
    return data;
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

  getAllRestaurantsAdmin() {
    return this.queryAPI(`
    query {
      restaurants {
        id
        name
        description
        phone
        website
        reviewsCount
        rateAverage
      }
    }
    `);
  }

  getAllReviewsAdmin() {
    return this.queryAPI(`
    query {
      reviews {
        id
        date
        comment
        rate
        user {
          id
          name
        }
      }
    }
    
    `);
  }

  getAllUsersAdmin() {
    return this.queryAPI(`
    query {
      users {
        id
        name
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
            reviewsCount
            rateAverage
            reviews {
              id
              date
              comment
              rate
              user {
                name
              }
            }
          }
        }
    `,
      { id }
    );
  }

  createReview(
    restaurantId: string,
    review: { date: string; comment: string; rate: number }
  ) {
    return this.queryAPI(
      `
    mutation($restaurantId: ID!, $review: CreateReviewInput!) {
      createReview(restaurantId: $restaurantId, createReviewInput: $review){
        id
      }
    }
    `,
      { restaurantId, review }
    );
  }

  createRestaurant(restaurant: {
    name: string;
    description: string;
    phone: string;
    website: string;
    thumbnail: string;
  }) {
    return this.queryAPI(
      `
    mutation($restaurant:  CreateRestaurantInput!) {
      createRestaurant(createRestaurantInput: $restaurant){
        id
      }
    }
    `,
      { restaurant }
    );
  }

  createUser(user: { name: string; email: string; password: string }) {
    return this.queryAPI(
      `
    mutation($user:  CreateUserInput!) {
      createUser(createUserInput: $user){
        id
      }
    }
    `,
      { user }
    );
  }
}

export default new API();
