import { useNavigate } from "react-router";
import { Card, CardContent, Grid, Typography } from '@mui/material';
import {useEffect, useState} from 'react';
import { getActivities } from "../services/api";

function ActivityList(){

    const [activities,setActivities] = useState([]);
    const navigate = useNavigate();
    const fetchActivities = async ()=>{
         try{
            const response = await getActivities();

         }catch(error){
            console.error("Error fetching activities:", error);
         }
    }
    useEffect(()=>{
        fetchActivities();
    },[])
    return(
        <>
        <Grid container spacing={2}>
            {activities.map((activity)=>{
                return(
                    <Grid>
                        <Card>
                            <CardContent> 
                                <Typography variant="h6">
                                    {activity.type} 
                                </Typography>
                                <Typography variant="h6">
                                   Duration: {activity.duration} 
                                </Typography>
                                 <Typography variant="h6">
                                   Calories: {activity.caloriesBurned} 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}

        </Grid>
        </>
    )
}

export default ActivityList