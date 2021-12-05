import UUID from "./uuid";
import codeGen from "./codeGen";
export default class Gun {

    public type: string;
    public username: string;
    public userUuid: string;
    public gunUuid: string;
    public registeredAt: Date;
    public registeredBy: string
    public code: string

    constructor(type: string, username: string, userUuid: string, registeredBy: string) {

        this.type = type;
        this.username = username;
        this.userUuid = userUuid;
        this.gunUuid = UUID.generate();
        this.registeredAt = new Date();
        this.registeredBy = registeredBy;
        this.code = codeGen.generate();

    }

     public dataToServer() {

        return {
            uuid: this.gunUuid,
            time: this.registeredAt,
            owner: this.registeredBy,
            code: this.code
        }
    }

    public static fromDatabase(data: any) {

        let gun = new Gun(data.type, data.username, data.userUuid, data.owner);
        gun.registeredAt = data.time;
        gun.gunUuid = data.uuid;
        gun.code = data.code;
        return gun;
    }

}
