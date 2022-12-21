import { CourseStatusCard } from "~~/.nuxt/components";
import Course from "~~/models/Course";
export function useCourses() {
    const client = useSupabaseClient();

    //Approve course by ID:
    async function approveCourseById(id: number): Promise<boolean> {
        const approved = {
            status: "approved",
        };
        const { error } = await client
            .from("Course")
            .update(approved as never)
            .eq("id", id);
        if (error) {
            console.error("Error approving course: ", error);
            return false;
        }
        return true;
    }
    async function rejectCourseById(id: number): Promise<boolean> {
        const approved = {
            status: "rejected",
        };
        const { error } = await client
            .from("Course")
            .update(approved as never)
            .eq("id", id);
        if (error) {
            console.error("Error rejecting course: ", error);
            return false;
        }
        return true;
    }

    //Get Courses:
    async function getApprovedCourses(): Promise<Course[]> {
        const { data, error } = await client.from("Course").select().eq("isApproved", true);
        if (error) {
            console.error("Error getting Approved Courses: ", error);
        }
        console.log("Courses: ", data);
        return data as unknown as Course[];
    }

    async function getRejectedCourses(): Promise<Course[]> {
        const { data, error } = await client.from("Course").select().eq("isApproved", false);
        if (error) {
            console.error("Error getting Rejected Courses: ", error);
        }
        console.log("Courses: ", data);
        return data as unknown as Course[];
    }

    async function getCoursesByOwner(owner: string): Promise<Course[]> {
        const { data, error } = await client.from("Course").select().eq("ownerId", owner);

        if (error) console.log("Error fetching courses for owner", error);
        console.log("COURSES", data);
        return Course.instantiateArray(data as any[]);
    }

    async function getCoursesByUni(uniId:number): Promise<Course[]> {
        const { data, error } = await client
          .from('Course')
          .select()
          .in("status",["approved","rejected"])
          .eq("hostUniId",uniId)
          .eq("status","approved");

    
          if (error) {
            console.error("Error fetching courses for bilkent code ", error);
          }
          console.log("Course ID: ", data);
          
          return Course.instantiateArray(data as any[])
         
    }
    async function getCoursesByUniAndCode(uniId:number, courseCode: string): Promise<Course[]> {
        const { data, error } = await client
          .from('Course')
          .select()
          .in("status",["approved","rejected"])
          .eq("hostUniId",uniId)
          .eq("bilkentCode",courseCode );
          
          if (error) {
            console.error("Error fetching courses for bilkent code ", error);
          }
          console.log("Course ID: ", data);
          
          return Course.instantiateArray(data as any[])
         
    }

    async function insertCourse(form_input: any): Promise<number | undefined> {
        const { data, error } = await client
            .from("Course")
            .insert(form_input as never)
            .select("id")
            .single();
        if (error) console.error("Error inserting course", error);

        console.log("RESSSS: ", data);
        if (data) return data.id;
        return undefined;
    }

    async function getPendingCoursesForInstructor(id: number): Promise<Course[]> {
        const { data, error } = await client
            .from("Course")
            .select()
            .eq("status", "pending")
            .eq("instructor", id);
        if (error) console.error("Error fetching pending courses");

        return Course.instantiateArray(data as any[]);
    }

    return {
        approveCourseById,
        getApprovedCourses,
        getRejectedCourses,
        insertCourse,
        getCoursesByOwner,
        getPendingCoursesForInstructor,
        rejectCourseById,
        getCoursesByUni,
        getCoursesByUniAndCode

    };
}
