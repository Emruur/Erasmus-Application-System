import Advisor from "~~/models/Advisor";
import DepartmentCoordinator from "~~/models/DepartmentCoordinator";
import ExchangeCoordinator from "~~/models/ExchangeCoordinator";
import IncomingStudent from "~~/models/IncomingStudent";
import Instructor from "~~/models/Instructor";
import OutgoingStudent from "~~/models/OutgoingStudent";
import User from "~~/models/User";

export function useProfile() {

    const client = useSupabaseClient();

    async function getProfileById(id: number, role: string): Promise<User>{
        const { data, error } = await client
            .from(role)
            .select()
            .eq("bilkent_id", id);
            
        if (error){
            console.error("Error getting profile: ", error)
        }
        
        if(data){
            if(role == "Instructor"){
                return Instructor.instantiate(data[0]);
            } else if(role == "Advisor"){
                return Advisor.instantiate(data[0]);
            }else if(role == "OutgoingStudent"){
                return OutgoingStudent.instantiate(data[0]);
            }else if(role == "IncomingStudent"){
                return IncomingStudent.instantiate(data[0]);
            }else if(role == "ExchangeCoordinator"){
                return ExchangeCoordinator.instantiate(data[0]);
            }if(role == "DepartmentCoordinator"){
                return DepartmentCoordinator.instantiate(data[0]);
            }
        }
        return data as unknown as User;
        
    }
    
     //Save Changes (Dept. Coordinator Profile):
    async function updateDeptCoordinatorProfile(id: number, name: string, surname: string, email: string, phone: number): Promise<boolean> {
        const coord = {
            name: name,
            surname: surname,
            email: email,
            phone: phone
        };
        const { error } = await client
            .from("DepartmentCoordinator")
            .update(coord as never)
            .eq("id", id);
        if(error){
            console.error("Error updating Department Coordinator Profile: ", error);
            return false;
        }
        return true;
    }

    //Save Changes (Instructor Profile):
    async function updateInstructorProfile(id: number, name: string, surname: string, email: string, phone: number): Promise<boolean> {
        const instructor = {
            name: name,
            surname: surname,
            email: email,
            phone: phone
        };
        const { error } = await client
            .from("Instructor")
            .update(instructor as never)
            .eq("id", id);
        if(error){
            console.error("Error updating Instructor Profile: ", error);
            return false;
        }
        return true;
    }

    //Get Dept. Coordinators:
    async function getDeptCoordinators(): Promise<DepartmentCoordinator[]> {
        const { data, error } = await client
            .from("DepartmentCoordinator")
            .select();
        if (error) {
            console.error("Error getting Deptartment Coordinators: ", error);
        }
        console.log("Deptartment Coordinator ID: ", data);
        return data as unknown as DepartmentCoordinator[];    
    }

    //Get Instructors:
    async function getInstructors(): Promise<Instructor[]> {
        const { data, error } = await client
            .from("Instructor")
            .select();
        if (error) {
            console.error("Error getting Instructor ID by Name and Surname: ", error);
        }
        console.log("Instructor ID: ", data);
        
        return Instructor.instantiateArray(data as unknown as any[]);    
    }

    async function getOutgoingStudentNameById(authId: string): Promise<string>{
        const { data, error } = await client
            .from("OutgoingStudent")
            .select("name,surname")
            .eq('authId', authId)
            .single();
        if (error) {
            console.error("Error getting O. Student name by ID: ", error)
        }
        console.log("O. Student name: ", data);
        
        if(data)
            return data.name +" "+ data.surname;
        return ""
    }

    async function checkRecordExistenceByMail(mail: string, from: string): Promise<number |null>{
        const { data, error } = await client
            .from(from)
            .select("id")
            .eq('email', mail)
            .single();
        if(error)
            console.error("Error checking existence",error)
        if(data)
          return data.id  
        return null 
    }

    return { getProfileById, getInstructors, getOutgoingStudentNameById,checkRecordExistenceByMail };
}