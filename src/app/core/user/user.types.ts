import { SsoApplication } from "app/domain/sso-application";

export interface User {
    userId?: number;
    username?: string;
    name?: string;
    email?: string;
    password?: string;
    status?: string;
    company?: string;
    creatorUser?: string;
    creationDate?: Date;
    modifierUser?: string;
    modificationDate?: Date;
    avatar?: string;
    ssoToken: string;
    applicationDTOs?: SsoApplication[];
    
}
