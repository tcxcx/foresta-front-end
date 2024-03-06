'use client';

import React from 'react';
import ColibriLight from "@/lib/foresta-icons/wired-outline-1135-hummingbird.json";
import CommunityLight from "@/lib/foresta-icons/wired-outline-957-team-work.json";
import ManagerLight from "@/lib/foresta-icons/wired-outline-1023-portfolio.json";
import ColibriDark from "@/lib/foresta-dark/wired-gradient-1135-hummingbird.json"
import CommunityDark from '@/lib/foresta-dark/wired-gradient-957-team-work.json'
import ManagerDark from '@/lib/foresta-dark/wired-gradient-1023-portfolio.json'
import { LordIcon } from "@/lib/lordicon/lord-icon";
import { useTheme } from "next-themes";

export default function ProjectIcons() {
    const { theme } = useTheme(); // Detect current theme

    const Colibri = theme === 'dark' ? ColibriDark : ColibriLight;
    const Community = theme === 'dark' ? CommunityDark : CommunityLight;
    const Manager = theme === 'dark' ? ManagerDark : ManagerLight;
    const birdIconDataUri = `data:application/json;base64,${Buffer.from(JSON.stringify(Colibri)).toString("base64")}`;
    const communityIconDataUri = `data:application/json;base64,${Buffer.from(JSON.stringify(Community)).toString("base64")}`;
    const managerIconDataUri = `data:application/json;base64,${Buffer.from(JSON.stringify(Manager)).toString("base64")}`;
    
    return (
        <>  
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <LordIcon
                    src={birdIconDataUri}
                    trigger="loop-on-hover"
                    colors={{ primary: "#303f9f" }}
                    size={36}
                />

                <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500 text-xs xl:text-sm">Hectares</p>
                    <p className="font-medium text-sm xl:text-base">10,000</p>
                </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <LordIcon
                    src={communityIconDataUri}
                    trigger="hover"
                    colors={{ primary: "#303f9f", secondary: "#c51162" }}
                    size={36}
                />

                <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500 text-xs xl:text-sm">Community</p>
                    <p className="font-medium text-sm xl:text-base">Waorani</p>
                </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <LordIcon
                    src={managerIconDataUri}
                    trigger="hover"
                    colors={{ primary: "#303f9f" }}
                    size={36}
                />

                <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500 text-xs xl:text-sm">Project Manager</p>
                    <p className="font-medium text-sm xl:text-base">Rainforest Ecuador</p>
                </div>
            </div>
        </>
    );
}
