import { User } from "@supabase/supabase-js";
import type { Ref } from "vue";

export function useSupaUser() {
    const user:Ref<User|undefined> = ref();
    const supabase = useSupabaseClient();
    onMounted(() => {
        supabase.auth.getSession().then(({ data }) => {
            user.value = data.session?.user;
            console.log("Session: ", data.session?.user);
        });

        supabase.auth.onAuthStateChange((_, _session) => {
            user.value = _session?.user;
            console.log("Session change: ", _session?.user);
        });
        supabase.auth.onAuthStateChange((event, session) => {
            if (event == 'TOKEN_REFRESHED') console.log('TOKEN_REFRESHED', session)
          })
    });

    return user;
}
