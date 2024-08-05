import { AppDispatch, RootState } from "@/components/store";
import { useDispatch, useSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useTypedDispatch = useDispatch.withTypes<AppDispatch>();
export const useTypedSelector = useSelector.withTypes<RootState>();
