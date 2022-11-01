import React from "react";
import { ImgProps } from "./utils";

export default function AddIcon({ className, size = "base", style }: ImgProps) {
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
                    <path d="M10 15.625q-.271 0-.469-.198-.198-.198-.198-.469v-4.291H5.042q-.271 0-.469-.198-.198-.198-.198-.469 0-.271.198-.469.198-.198.469-.198h4.291V5.042q0-.271.198-.469.198-.198.469-.198.271 0 .469.198.198.198.198.469v4.291h4.291q.271 0 .469.198.198.198.198.469 0 .271-.198.469-.198.198-.469.198h-4.291v4.291q0 .271-.198.469-.198.198-.469.198Z" />
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
                    <path d="M12 18.75q-.325 0-.537-.212-.213-.213-.213-.538v-5.25H6q-.325 0-.537-.213-.213-.212-.213-.537 0-.325.213-.538.212-.212.537-.212h5.25V6q0-.325.213-.537.212-.213.537-.213.325 0 .538.213.212.212.212.537v5.25H18q.325 0 .538.212.212.213.212.538 0 .325-.212.537-.213.213-.538.213h-5.25V18q0 .325-.212.538-.213.212-.538.212Z" />
                </svg>
            );
            break;
        case "md":
            return (
                <svg
                    style={style}
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                    height="40"
                    width="40"
                >
                    <path d="M20 31.25q-.458 0-.75-.292-.292-.291-.292-.75v-9.166H9.792q-.459 0-.75-.292-.292-.292-.292-.75t.292-.75q.291-.292.75-.292h9.166V9.792q0-.459.292-.75.292-.292.75-.292t.75.292q.292.291.292.75v9.166h9.166q.459 0 .75.292.292.292.292.75t-.292.75q-.291.292-.75.292h-9.166v9.166q0 .459-.292.75-.292.292-.75.292Z" />
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
                    <path d="M24 37.5q-.5 0-.825-.325-.325-.325-.325-.825v-11.2h-11.2q-.5 0-.825-.325Q10.5 24.5 10.5 24q0-.5.325-.825.325-.325.825-.325h11.2v-11.2q0-.5.325-.825.325-.325.825-.325.5 0 .825.325.325.325.325.825v11.2h11.2q.5 0 .825.325.325.325.325.825 0 .5-.325.825-.325.325-.825.325h-11.2v11.2q0 .5-.325.825-.325.325-.825.325Z" />
                </svg>
            );
            break;
    }
}
