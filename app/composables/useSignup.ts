import Advisor from "~~/models/Advisor";
import DepartmentCoordinator from "~~/models/DepartmentCoordinator";
import ExchangeCoordinator from "~~/models/ExchangeCoordinator";
import IncomingStudent from "~~/models/IncomingStudent";
import Instructor from "~~/models/Instructor";
import OutgoingStudent from "~~/models/OutgoingStudent";
import User from "~~/models/User";

export function useSignup() {
    const client = useSupabaseClient();

    async function signUp(mail: string, password: string, role: string, id: number) {
        const { data, error } = await client.auth.signUp({
            email: mail,
            password: password,
            options: {
                data: {
                    role: role,
                    userId: id,
                },
            },
        });
        console.log(error);
        return data;
    }

    async function initUserAuth() {
        let roles = [
            "IncomingStudent",
            "OutgoingStudent",
            "Advisor",
            "ExchangeCoordinator",
            "DepartmentCoordinator",
            "Instructor",
        ];

        for (let role of roles) {
            const { data, error } = await client.from(role).select();

            if (data) {
                for (let user of data as any[]) {
                    if (user.authId != null) {
                        console.log(user.email, "already authenticated");
                    } else {
                        console.log("User", user.email, "-", role);
                        const data = await signUp(user.email, "1234567", role, user.bilkent_id);
                        console.log("DATA: ", data);
                        if (data && data.user) {
                            let id = data.user.id;

                            const { data: data1, error: error1 } = await client
                                .from(role)
                                .update({
                                    authId: id,
                                } as never)
                                .eq("email",user.email)
                                .select();
                            if(error1)
                                console.error("Error1: ",error1)
                            console.log("DATA1",data1)

                        }
                    }
                }
            }
        }
    }

    return { initUserAuth };
}
