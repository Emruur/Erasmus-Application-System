export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useSupabaseUser();
    let route = useRoute();

    if(route.path == "/login" || route.path== "/logout"|| route.path== "/")
        return

    if (!user.value) {
        return navigateTo("/login");
    } else {
        let role = user.value.user_metadata.role;
        console.log("use route", route.path);

        const os_regex = new RegExp("student/outgoing");
        const is_regex = new RegExp("student/incoming");
        const a_regex = new RegExp("advisor");
        const in_regex = new RegExp("instructor");
        const dc_regex = new RegExp("coordinator/department");
        const ec_regex = new RegExp("coordinator/exchange");

        if (
            (os_regex.test(route.path) && role != "OutgoingStudent") ||
            (is_regex.test(route.path) && role != "IncomingStudent") ||
            (a_regex.test(route.path) && role != "Advisor") ||
            (in_regex.test(route.path) && role != "Instructor") ||
            (dc_regex.test(route.path) && role != "DepartmentCoordinator") ||
            (ec_regex.test(route.path) && role != "ExchangeCoordinator")
        ) {
            console.log("Aborting navigation")
            abortNavigation("Cant access this route with role: "+role+" !")
        }
    }
});
