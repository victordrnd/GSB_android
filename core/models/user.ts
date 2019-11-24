
export interface User {
    id : number;
    firstname : string;
    lastname : string;
    email : string;
    password ?: string;
    phone ?: string;
    created_at ?: Date;
    updated_at ?: Date;
}