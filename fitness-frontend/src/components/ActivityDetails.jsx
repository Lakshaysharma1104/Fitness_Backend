import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getActivityDetail } from '../services/api';

function ActivityDetails(){
    const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error(error);
      }
    }

    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 rounded bg-white/10" />
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-5/6 rounded bg-white/10" />
            <div className="h-4 w-4/6 rounded bg-white/10" />
          </div>
        </div>
      </div>
    )
  }
    return(
        <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
            <div className="mx-auto max-w-4xl space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/30 backdrop-blur-md md:p-6">
                    <h2 className="mb-5 text-2xl font-semibold tracking-tight text-white">Activity Details</h2>
                    <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                            <p className="text-xs uppercase tracking-[0.16em] text-blue-300">Type</p>
                            <p className="mt-1 font-medium text-white">{activity.type}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                            <p className="text-xs uppercase tracking-[0.16em] text-blue-300">Duration</p>
                            <p className="mt-1 font-medium text-white">{activity.duration} minutes</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                            <p className="text-xs uppercase tracking-[0.16em] text-blue-300">Calories Burned</p>
                            <p className="mt-1 font-medium text-white">{activity.caloriesBurned}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                            <p className="text-xs uppercase tracking-[0.16em] text-blue-300">Date</p>
                            <p className="mt-1 font-medium text-white">{new Date(activity.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {recommendation && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/30 backdrop-blur-md md:p-6">
                        <h3 className="mb-5 text-2xl font-semibold tracking-tight text-white">AI Recommendation</h3>

                        <div className="space-y-6 text-sm text-gray-200">
                            <div>
                                <p className="mb-2 text-base font-semibold text-white">Analysis</p>
                                <p className="rounded-xl border border-white/10 bg-black/30 p-3 leading-relaxed">{activity.recommendation}</p>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            <div>
                                <p className="mb-2 text-base font-semibold text-white">Improvements</p>
                                <div className="space-y-2">
                                    {activity?.improvements?.map((improvement, index) => (
                                        <p key={index} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">• {activity.improvements}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            <div>
                                <p className="mb-2 text-base font-semibold text-white">Suggestions</p>
                                <div className="space-y-2">
                                    {activity?.suggestions?.map((suggestion, index) => (
                                        <p key={index} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">• {suggestion}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            <div>
                                <p className="mb-2 text-base font-semibold text-white">Safety Guidelines</p>
                                <div className="space-y-2">
                                    {activity?.safety?.map((safety, index) => (
                                        <p key={index} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">• {safety}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActivityDetails