import { useNavigate } from "react-router";
import {useEffect, useState} from 'react';
import { getActivities } from "../services/api";

function ActivityList(){

    const [activities,setActivities] = useState([]);
    const navigate = useNavigate();
    const fetchActivities = async ()=>{
         try{
            const response = await getActivities();
            setActivities(response.data);

         }catch(error){
            console.error("Error fetching activities:", error);
         }
    }
    useEffect(()=>{
        fetchActivities();
    },[])
    return(
        <div className="w-full">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">Recent Activities</h2>
                <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                    {activities.length} items
                </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {activities.map((activity)=>{
                    return(
                        <button
                            key={activity.id}
                            type="button"
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/10 hover:shadow-blue-900/30"
                            onClick={()=>{navigate(`/activities/${activity.id}`)}}
                        >
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative z-10 space-y-3">
                                <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-300/90">
                                    {activity.type}
                                </p>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-300">
                                        Duration: <span className="font-semibold text-white">{activity.duration}</span>
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        Calories: <span className="font-semibold text-white">{activity.caloriesBurned}</span>
                                    </p>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default ActivityList