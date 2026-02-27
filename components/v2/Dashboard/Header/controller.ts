import { useHeaderContext } from "./context";
import { useState } from "react";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function useHeaderController() {

    const { mobileSize } = useHeaderContext();

    return {
        mobileSize,
    }
}