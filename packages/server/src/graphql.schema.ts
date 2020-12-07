
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateRestaurantInput {
    name: string;
    description?: string;
    phone?: string;
    website?: string;
    kitchen?: string;
}

export class UpdateRestaurantInput {
    name: string;
    description?: string;
    phone?: string;
    website?: string;
    kitchen?: string;
}

export class CreateReviewInput {
    date: Date;
    comment: number;
    rate: number;
}

export class UpdateReviewInput {
    date: Date;
    comment: number;
    rate: number;
}

export class CreateUserInput {
    name: string;
}

export class UpdateUserInput {
    name: string;
}

export class Restaurant {
    id: string;
    name: string;
    description?: string;
    phone?: string;
    website?: string;
    kitchen?: string;
    tags?: string[];
    reviewsCount: number;
    rateAverage: number;
    reviews?: Review[];
}

export abstract class IQuery {
    abstract restaurants(): Restaurant[] | Promise<Restaurant[]>;

    abstract restaurant(id: string): Restaurant | Promise<Restaurant>;

    abstract reviews(): Review[] | Promise<Review[]>;

    abstract review(id: string): Review | Promise<Review>;

    abstract reviewsByRestaurantId(id: string): Review[] | Promise<Review[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createRestaurant(createRestaurantInput: CreateRestaurantInput, tagsIds?: string[]): Restaurant | Promise<Restaurant>;

    abstract updateRestaurant(id: string, updateRestaurantInput: UpdateRestaurantInput): Restaurant | Promise<Restaurant>;

    abstract removeRestaurant(id: string): Restaurant | Promise<Restaurant>;

    abstract createTag(createTagInput?: string): string | Promise<string>;

    abstract removeTag(id: string): string | Promise<string>;

    abstract createReview(restaurantId: string, createReviewInput: CreateReviewInput): Review | Promise<Review>;

    abstract updateReview(id: string, updateReviewInput: UpdateReviewInput): Review | Promise<Review>;

    abstract removeReview(id: string): Review | Promise<Review>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): User | Promise<User>;
}

export class Review {
    id: string;
    date: Date;
    comment: number;
    rate: number;
}

export class User {
    id: string;
    name: string;
}
