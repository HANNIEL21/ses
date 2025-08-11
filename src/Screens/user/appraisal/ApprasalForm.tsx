import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

interface Activity {
    id: string
    question: string
    options: number[]
    selectedOption?: number
}

const ApprasalForm = () => {
    const [activities, setActivities] = useState<Activity[]>([
        { id: "1", question: "Prepared lesson plan", options: [1, 2, 3, 4, 5] },
        { id: "2", question: "Class participation", options: [1, 2, 3, 4, 5] },
        { id: "3", question: "Assignment grading", options: [1, 2, 3, 4, 5] },
    ])

    const lecturer = useSelector((state: RootState) => state.lecturer.lecturer);
    console.log(lecturer);


    const handleOptionSelect = (activityId: string, value: number) => {
        setActivities((prev) =>
            prev.map((activity) =>
                activity.id === activityId
                    ? { ...activity, selectedOption: value }
                    : activity
            )
        )
    }

    const totalScore = activities.reduce(
        (sum, activity) => sum + (activity.selectedOption || 0),
        0
    )

    const handleSubmit = () => {
        console.log("Form submitted", activities)
    }


    return (
        <main className="h-full w-full py-6 px-4 md:px-16 space-y-8">
            <Card className="bg-gradient-to-r from-green-700 to-blue-700 text-white font-bold">
                <CardContent className="py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 md:w-36 h-12 md:h-36 rounded-2xl bg-gray-300 flex items-center justify-center text-lg md:text-4xl font-bold text-gray-700">
                            {lecturer?.name
                                ?.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s*/i, "")
                                .split(" ")
                                .filter(Boolean)
                                .slice(0, 2)
                                .map((n: string[]) => n[0].toUpperCase())
                                .join("")
                            }
                        </div>

                        <div>
                            <h2 className="font-bold text-lg md:text-4xl">
                                {lecturer?.name?.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s*/i, "")}
                            </h2>
                            <p className="text-sm md:text-xl">{lecturer?.department}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-2 overflow-x-auto px-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="w-full md:w-1/4">
                            <h2 className="font-extrabold text-lg md:text-xl">Criteria</h2>
                        </div>
                        <div className="w-full md:w-2/4">
                            <div className="flex justify-between font-extrabold">
                                <p>1</p>
                                <p>2</p>
                                <p>3</p>
                                <p>4</p>
                                <p>5</p>
                            </div>
                        </div>
                    </div>

                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center border-t py-2  gap-2"
                        >
                            <div className="w-full md:w-1/4">
                                <h3 className="text-base md:text-lg">{activity.question}</h3>
                            </div>
                            <div className="w-full md:w-2/4">
                                <RadioGroup
                                    value={String(activity.selectedOption ?? "")}
                                    onValueChange={(val: any) =>
                                        handleOptionSelect(activity.id, Number(val))
                                    }
                                    className="flex justify-between"
                                >
                                    {activity.options.map((option, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-center space-x-2"
                                        >
                                            <RadioGroupItem
                                                value={String(option)}
                                                id={`${activity.id}-${option}`}
                                            />
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-xl md:text-2xl font-semibold">
                    Total Score: {totalScore.toFixed(0)}
                </h1>
                <Button
                    variant="default"
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-green-700 to-blue-700 text-white font-bold w-full md:w-auto"
                >
                    Submit
                </Button>
            </div>
        </main>
    )
}

export default ApprasalForm
