import React from "react";
import { IconProps } from "./interfaces";

export default function ({ style, size = "base", className }: IconProps) {
    switch (size) {
        case "sm":
            return (
                <svg
                    style={style}
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                >
                    <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M10 12.208q-.146 0-.292-.052t-.27-.198L5.75 8.292q-.188-.209-.177-.49.01-.281.198-.469.229-.208.479-.198.25.011.458.198L10 10.646l3.312-3.292q.188-.208.438-.208t.479.208q.209.208.209.479t-.209.459l-3.667 3.666q-.124.146-.27.198-.146.052-.292.052Z"
                    />
                </svg>
            );
            break;
        case "base":
            return (
                <svg
                    style={style}
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                >
                    <path d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z" />
                </svg>
            );
        case "md":
            return (
                <svg
                    style={style}
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                    height="40"
                    width="40"
                >
                    <path d="M20 25.042q-.292 0-.521-.084-.229-.083-.437-.291l-8.084-8.084q-.375-.375-.354-.979.021-.604.396-.979.417-.417.979-.375.563.042.979.417L20 21.708l7.083-7.083q.375-.375.979-.396.605-.021.98.438.416.375.375.958-.042.583-.417 1l-8.042 8.042q-.208.208-.437.291-.229.084-.521.084Z" />
                </svg>
            );
            break;
        case "lg":
            return (
                <svg
                    style={style}
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    width="48"
                >
                    <path d="M24 30.15q-.3 0-.55-.1-.25-.1-.5-.35l-9.9-9.9q-.4-.4-.375-1.075.025-.675.425-1.075.5-.5 1.075-.425.575.075 1.025.475l8.8 8.8 8.8-8.8q.4-.4 1.075-.45.675-.05 1.075.45.5.4.425 1.05-.075.65-.475 1.1l-9.85 9.85q-.25.25-.5.35-.25.1-.55.1Z" />
                </svg>
            );
            break;
    }
}
