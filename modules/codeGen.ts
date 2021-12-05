export default class codeGen {

    public static generate() {

        let codeOut = []

        for (let i = 0; i < 6; i++) {
            codeOut.push(String.fromCharCode(this.genChar()))
        }

        return codeOut.join("")

    }

   private static genChar() {
        //only uppercase letters

        return Math.floor(Math.random() * 26) + 65;

    }
}