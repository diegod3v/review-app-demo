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

  getMyProfile() {
    return this.queryAPI(`
    query {
      me {
        id
        name
        email
      }
    }
    `);
  }

  getAllRestaurants() {
    return this.queryAPI(`
        query {
          restaurants {
            id
            name
            thumbnail
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
        thumbnail
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
        email
      }
    }
    `);
  }

  getRestaurantDetailById(id: string) {
    return this.queryAPI(
      `
        query($id: ID!) {
          restaurant(id: $id) {
            id
            name
            description
            phone
            website
            thumbnail
            reviewsCount
            rateAverage
            latestReview {
              id
              date
              comment
              rate
              user {
                id
                name
              }
            }
            highestReview {
              id
              date
              comment
              rate
              user {
                id
                name
              }
            }
            lowestReview {
              id
              date
              comment
              rate
              user {
                id
                name
              }
            }
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

  updateReview(
    review: { date: string; comment: string; rate: number },
    id: string
  ) {
    return this.queryAPI(
      `
    mutation($review: UpdateReviewInput!, $id: ID!) {
      updateReview(updateReviewInput: $review, id: $id){
        id
      }
    }
    `,
      { id, review }
    );
  }

  updateRestaurant(
    restaurant: {
      name: string;
      description: string;
      phone: string;
      website: string;
      thumbnail: string;
    },
    id: string
  ) {
    return this.queryAPI(
      `
    mutation($restaurant:  UpdateRestaurantInput!, $id: ID!) {
      updateRestaurant(updateRestaurantInput: $restaurant, id: $id){
        id
      }
    }
    `,
      { id, restaurant }
    );
  }

  updateUser(
    user: { name: string; email: string; password: string },
    id: string
  ) {
    return this.queryAPI(
      `
    mutation($user:  UpdateUserInput!, $id: ID!) {
      updateUser(updateUserInput: $user, id: $id){
        id
      }
    }
    `,
      { id, user }
    );
  }

  removeReview(id: string) {
    return this.queryAPI(
      `
    mutation($id: ID!) {
      removeReview(id: $id){
        id
      }
    }
    `,
      { id }
    );
  }

  removeRestaurant(id: string) {
    return this.queryAPI(
      `
    mutation($id: ID!) {
      removeRestaurant(id: $id){
        id
      }
    }
    `,
      { id }
    );
  }

  removeUser(id: string) {
    return this.queryAPI(
      `
    mutation($id: ID!) {
      removeUser(id: $id){
        id
      }
    }
    `,
      { id }
    );
  }
}

export default new API();
