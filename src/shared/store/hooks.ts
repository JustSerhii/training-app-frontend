import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);
