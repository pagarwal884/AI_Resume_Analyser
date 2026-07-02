import React from 'react'
import { Link } from 'react-router'
import type { Resume } from "../types";
import ScoreCircle from './ScoreCircle';

interface ResumeCardProps {
    resume: Resume;
}

const ResumeCard = ({ resume }: ResumeCardProps) => {
    return (
        <Link to={`/resume/${resume.id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="flex flex-col gap-2">
                <h2 className="text-black font-bold wrap-break-word">
                    {resume.companyName}
                </h2>
                <h3 className="text-lg wrap-break-word text-gray-500">
                    {resume.jobTitle}
                </h3>
            </div>
            <div className="flex shrink-8">
                <ScoreCircle score={resume.feedback.overallScore}/>
            </div>
        </Link>
    )
}

export default ResumeCard
