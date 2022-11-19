import React from "react";
import { ImgProps } from "./utils";

export default function FormatItalic({
    className,
    style,
    size = "base",
}: ImgProps) {
    switch (size) {
        case "sm":
            return (
                <svg
                    className={className}
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                >
                    <path d="M5.458 16.667q-.541 0-.916-.375t-.375-.917q0-.542.375-.917t.916-.375h1.521l3.25-8.166H8.792q-.542 0-.917-.375T7.5 4.625q0-.542.375-.917t.917-.375h5.75q.541 0 .916.375t.375.917q0 .542-.375.917t-.916.375h-1.521l-3.25 8.166h1.437q.542 0 .917.375t.375.917q0 .542-.375.917t-.917.375Z" />
                </svg>
            );
            break;
        case "base":
            return (
                <svg
                    className={className}
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                >
                    <path d="M6.5 20q-.625 0-1.062-.438Q5 19.125 5 18.5t.438-1.062Q5.875 17 6.5 17h1.875l4-10H10.5q-.625 0-1.062-.438Q9 6.125 9 5.5t.438-1.062Q9.875 4 10.5 4h7q.625 0 1.062.438Q19 4.875 19 5.5t-.438 1.062Q18.125 7 17.5 7h-1.875l-4 10H13.5q.625 0 1.062.438.438.437.438 1.062t-.438 1.062Q14.125 20 13.5 20Z" />
                </svg>
            );
            break;
        case "md":
            return (
                <svg
                    className={className}
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    height="40"
                    width="40"
                >
                    <path d="M10.542 33.333q-.917 0-1.563-.645-.646-.646-.646-1.563 0-.958.646-1.604.646-.646 1.563-.646H14l7.167-17.75h-3.959q-.916 0-1.562-.646T15 8.875q0-.917.646-1.562.646-.646 1.562-.646h12.25q.917 0 1.563.646.646.645.646 1.562 0 .958-.646 1.604-.646.646-1.563.646H26l-7.167 17.75h3.959q.916 0 1.562.646T25 31.125q0 .917-.646 1.563-.646.645-1.562.645Z" />
                </svg>
            );
            break;
        case "lg":
            return (
                <svg
                    className={className}
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    width="48"
                >
                    <path d="M12.5 40q-1.05 0-1.775-.725Q10 38.55 10 37.5q0-1.05.725-1.775Q11.45 35 12.5 35h4.35l8.9-22H20.5q-1.05 0-1.775-.725Q18 11.55 18 10.5q0-1.05.725-1.775Q19.45 8 20.5 8h15q1.05 0 1.775.725Q38 9.45 38 10.5q0 1.05-.725 1.775Q36.55 13 35.5 13h-4.35l-8.9 22h5.25q1.05 0 1.775.725Q30 36.45 30 37.5q0 1.05-.725 1.775Q28.55 40 27.5 40Z" />
                </svg>
            );
            break;
    }
}
