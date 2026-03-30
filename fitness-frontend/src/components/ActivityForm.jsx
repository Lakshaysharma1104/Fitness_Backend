import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useState } from "react";
import { addActivity } from "../services/api";
function ActivityForm({onActivityAdded}) {
  const [activity, setActivity] = useState({
    type: "",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleSubmit = async (e)=>{
     e.preventDefault();
     try{
      await addActivity(activity);
      onActivityAdded();
      setActivity({
        type:" ",
        duration:" ",
        caloriesBurned:" ",
        additionalMetrics:{}
      })

     }catch(error){
      console.error("Error adding activity:", error);
     }

  }

  return (
    <>
      <div>
        <Box component="form" sx={{ mb: 2 }} onSubmit={handleSubmit}>
          <FormControl id="add-activity" variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Activity Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={activity.type}
              onChange={(e) => {
                setActivity({ ...activity, type: e.target.value });
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="RUNNING">Running</MenuItem>
              <MenuItem value="WALKING">Walking</MenuItem>
              <MenuItem value="CYCLING">Cycling</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <WhatshotIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="CaloriesBurned"
              label="Calories Burned"
              variant="standard"
              type="number"
              value={activity.caloriesBurned}
              onChange={(e) => {
                setActivity({ ...activity, caloriesBurned: e.target.value });
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccessTimeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="duration"
              label="Duration"
              variant="standard"
              type="number"
              value={activity.duration}
              onChange={(e) => {
                setActivity({ ...activity, duration: e.target.value });
              }}
            />
          </Box>
          <Button type="submit" variant="contained" sx={{ m:  1}}>
            Add Activity
          </Button>
        </Box>
      </div>
    </>
  );
}

export default ActivityForm;
