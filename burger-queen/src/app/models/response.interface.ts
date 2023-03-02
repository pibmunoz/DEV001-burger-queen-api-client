export interface ResponseI{
    // status: number;
    // statusText?: string;
    // id: string;
    // email: string;
    // role : string;
    // accessToken: string;
    // password: string;
    accessToken: string;
    user: {
        email: string;
        password: string;
        role: string;
        accessToken: string;
        id: number;   
    }
}