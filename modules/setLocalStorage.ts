export default function SetLocalStorage(key: string, value: any, redirect: string): string {
        return `<a id="lnk"href="${redirect}"/><script>window.localStorage.setItem("${key}","${value}");document.getElementById("lnk").click()</script>` 
    }
