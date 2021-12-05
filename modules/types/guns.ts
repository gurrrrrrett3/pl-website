export type GunRegister = {
    username: string;
    userUuid: string;
    gunType: string;
    registeredBy: string
}

export type registerResponse = {
    success: boolean;
    message: string;
    uuid: string
    time: Date
    owner: string
    code: string
}
