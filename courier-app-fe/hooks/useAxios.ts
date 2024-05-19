import axios from "axios";
import { useContext } from "react";
import { UiContext } from "../providers/UiProvider";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const useAxios = () => {
  const ui = useContext(UiContext);
  const auth = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth?.token ? `Bearer ${auth.token}` : "",
    },
  });

  const get = async <T>(url: string, showLoading = false): Promise<void | T> => {
    if (showLoading) ui?.setIsLoading(true);
    return axiosInstance
      .get(url)
      .then(({ data }: { data: T }) => {
        return data;
      })
      .catch((error) => {
        toast.error(error.response.data?.message ?? "Something was not correct");
      })
      .finally(() => {
        ui?.setIsLoading(false);
      });
  };

  const post = async <T>(
    url: string,
    payload: any,
    successMessage: string = "Data was saved successfully",
    showLoading = true,
  ): Promise<void | T> => {
    if (showLoading) ui?.setIsLoading(true);
    return axiosInstance
      .post(url, payload)
      .then(({ data }: { data: T }) => {
        toast.success(successMessage);
        return data;
      })
      .catch((error) => {
        toast.error(error.response.data?.message ?? "Something was not correct");
      })
      .finally(() => {
        ui?.setIsLoading(false);
      });
  };

  const put = async <T>(
    url: string,
    payload: any,
    successMessage: string = "Data was updated successfully",
    showLoading = true,
  ): Promise<void | T> => {
    if (showLoading) ui?.setIsLoading(true);
    return axiosInstance
      .put(url, payload)
      .then(({ data }: { data: T }) => {
        toast.success(successMessage);
        return data;
      })
      .catch((error) => {
        toast.error(error.response.data?.message ?? "Something was not correct");
      })
      .finally(() => {
        ui?.setIsLoading(false);
      });
  };

  return { get, post, put };
};

export default useAxios;
